import React from "react";
import { useLocation } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import FloatingButtons from "./FloatingButtons";

export default function AppLayout({ children }) {
  const location = useLocation();
  const hidePaths = ["/login", "/signup"];
  const shouldHideNav = hidePaths.includes(location.pathname);

  return (
    <>
      {!shouldHideNav && <Nav />}
      <FloatingButtons />
      <main className="pt-16">{children}</main>
      {!shouldHideNav && <Footer />}
    </>
  );
}
