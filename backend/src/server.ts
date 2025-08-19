import express from "express"
import http from "http"
import {ApolloServer} from "@apollo/server"
import  {ApolloServerPluginDrainHttpServer} from "@apollo/server/plugin/drainHttpServer"
import cors from "cors"
import {expressMiddleware} from "@as-integrations/express5"

const app = express()
const httpServer = http.createServer(app)
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})]
});

app.use(cors({
    origin: "*",
    credentials: true,
    methods: ["POST", "GET"]
}));

app.use(express.json());

async function startServer() {
    await server.start();
    app.use("/graphql", 
        expressMiddleware(server, {
            context: async ({req, res}) => await createContext({req, res}) 
        })
    );

    httpServer.listen({port: process.env.PORT || 4000}, () => {
        console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 4000}/graphql`)
    });
}

const SHUTDOWN_TIMEOUT_MS = 10000;
let isShuttingDown = false;

const shutdown = async (signal: string, isFatal: boolean) => {
    if(isShuttingDown) return
    isShuttingDown = true

    console.log(`Received ${signal} signal. Starting graceful shutdown...`);

    const shutdownTimeout = setTimeout(() => {
        console.log("Shutdown timeout reached. Forcing exit.");
        process.exit(1)
    }, SHUTDOWN_TIMEOUT_MS);

    try {
        console.log("Stopping Apollo Server...");
        await server.stop();
        console.log("Apollo Server stopped.");

        console.log("Closing HTTP server...")
        await new Promise<void>((resolve) => {
            if(httpServer.listening) {
                httpServer.close((err) => {
                    if(err && (err as NodeJS.ErrnoException).code !== "ERR_SERVER_NOT_RUNNING") {
                        console.log("Http server close error:", err.message)
                    };
                    console.log("Manually closed http server.")
                    resolve()
                });
            } else {
                console.log("Http server already closed by Apollo Server plugin.");
                resolve()
            }
        });
        
        clearTimeout(shutdownTimeout);
        if(isFatal) {
            console.log("Server terminated due to error.")
            process.exit(1)
        } else {
            console.log("Server shutdown gracefully.")
            process.exit(0)
        }
    } catch (err) {
        clearTimeout(shutdownTimeout);
        console.log("Server terminated due to error.", err)
        process.exit(1)
    }
}

process.once("SIGINT", (sig) => shutdown(sig, false));
process.once("SIGTERM", (sig) => shutdown(sig, false));

process.on("uncaughtException", (err) => {
    shutdown("UNCAUGHT_EXCEPTION", true);
});

process.on("unhandledRejection", (err) => {
    shutdown("UNHANDLED_REJECTION", true)
});

startServer().catch((err) => {
    console.log("Failed to start server, err:", err);
    process.exit(1)
})