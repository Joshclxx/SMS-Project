"use client";

import SectionContainer from "@/components/SectionContainer";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useUserSession } from "@/hooks/useUserSession";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { loggedIn, userRole, setUser, logout } = useUserSession();

  useEffect(() => {
    if (loggedIn) {
      if (userRole === "masterAdmin")
        router.replace("/masterDashboard/adminDashboard");
      else router.replace("/studentAccount");
    }
  }, [loggedIn, userRole, router]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const role = email.endsWith("@iihc.edu") ? "masterAdmin" : "student";

    setUser(email, role, email, Date.now());

    if (role === "masterAdmin")
      router.replace("/masterDashboard/adminDashboard");
    else router.replace("/studentAccount");
  };

  return (
    <SectionContainer background="mt-1 h-auto">
      <div className="flex items-center justify-center">
        <img
          src="/icons/iihc-logo.svg"
          alt="IIH College Logo"
          className="w-[240px] h-[240px]"
        />
      </div>

      <div className="flex items-center justify-center">
        <form
          onSubmit={onSubmit}
          className="w-[710px] h-[519px] bg-background rounded-lg shadow-2xl"
        >
          <p className="heading text-center mt-4">Login</p>

          <div className="flex flex-col items-center justify-center mt-12">
            <label className="flex flex-col justify-end caption gap-2">
              <p className="font-bold">Email:</p>
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="p-2 border rounded-lg w-[460px]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </label>

            <label className="flex flex-col justify-end caption gap-2 mt-6">
              <p className="font-bold">Password:</p>
              <input
                type="password"
                placeholder="Enter your password"
                required
                className="p-2 border rounded-lg w-[460px]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={logout}
                className="caption underline text-left"
              >
                Forget Password?
              </button>
            </label>

            <button
              onClick={() => toast.success("Login Successful!")}
              type="submit"
              className="w-[224px] p-2 bg-button text-white button-text rounded-xl mt-12 hover:bg-button/85"
            >
              Login
            </button>

            <div className="flex flex-col items-center justify-center">
              <div className="mt-5">
                <div className="flex items-center gap-2">
                  <div className="flex-1 w-14 h-[1px] bg-black"></div>
                  <p className="caption">or continue with</p>
                  <div className="flex-1 w-14 h-[1px] bg-black"></div>
                </div>
              </div>
              <div className="container w-[224px] p-1 bg-background border-1 rounded-lg flex items-center justify-center gap-4 mt-5">
                <img
                  src="/icons/google-login.svg"
                  alt="Google Login Icon"
                  className="w-[20px] h-[20px]"
                />
                <button className="button-text text-foreground">
                  Sign in with Email
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </SectionContainer>
  );
}
