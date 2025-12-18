import React from "react";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  const isActive = (href: string) => {
    if (href === "/" && currentPath === "/") return true;
    if (href === "/html-css" && currentPath === "/html-css") return true;
    if (href === "/js" && currentPath === "/js") return true;
    if (href === "/components" && currentPath === "/components") return true;
    return false;
  };

  return (
    <header className="site-header">
      <div className="main-container nav-row">
        <a className="brand" href="/">
          Yudhono
        </a>
        <nav className="site-nav">
          <a href="/js" className={isActive("/js") ? "active" : ""}>
            JavaScript
          </a>
          <a href="/html-css" className={isActive("/html-css") ? "active" : ""}>
            HTML &amp; CSS
          </a>
          <a
            href="/components"
            className={isActive("/components") ? "active" : ""}
          >
            Components
          </a>
          <a href="#courses">Courses</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
