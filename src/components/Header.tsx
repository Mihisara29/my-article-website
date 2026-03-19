import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`site-header${scrolled ? " scrolled" : ""}`}
    >
      <div className="site-header-inner">
        <Link to="/" className="site-logo">
          <span className="site-logo-mark">A</span>
          <span className="site-logo-name">Articulate</span>
        </Link>
        <nav className="site-nav">
          <Link to="/">Articles</Link>
          <Link to="/about">About</Link>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;