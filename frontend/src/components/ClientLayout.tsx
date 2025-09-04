"use client";

import { usePathname } from "next/navigation";
import SideNav from "./SideNav";
import Header from "./Header";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideSideNav = pathname === "/";
  const hideHeader = pathname === "/";

  return (
    <>
      <div className="w-full">{!hideHeader && <Header />}</div>

      <div className="grid grid-cols-12">
        <div className="col-span-3 flex items-center">
          {!hideSideNav && <SideNav />}
        </div>
        <div className="col-span-9">
          <div className="mt-5 flex">{children}</div>
        </div>
      </div>
    </>
  );
}
