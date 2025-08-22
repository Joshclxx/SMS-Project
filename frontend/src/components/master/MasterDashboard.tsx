"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserSession } from "@/hooks/useUserSession";
import { Toaster } from "react-hot-toast";

const StudentAccount = () => {
  const router = useRouter();

  const loggedIn = useUserSession((s) => s.loggedIn);
  const userRole = useUserSession((s) => s.userRole);
  const userEmail = useUserSession((s) => s.userEmail);
  const logout = useUserSession((s) => s.logout);

  useEffect(() => {
    if (!loggedIn) router.replace("/");
    else if (userRole !== "masterAdmin") router.replace("/studentAccount");
  }, [loggedIn, userRole, router]);

  const onLogout = () => {
    logout();
    router.replace("/");
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="max-w-3xl mx-auto p-6">
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">ADMIN ACCOUNT</p>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-blue-600 text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default StudentAccount;
