import MainHeader from "@/components/main-header/main-header";
import CheckAuth from "@/components/check-auth";
import * as React from "react";

export default function RootLayout({ children }) {
  return (
    <>
      <MainHeader />
      <CheckAuth />
      {children}
    </>
  );
}
