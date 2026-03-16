import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="site-footer">
    <div className="site-footer-bar" />
    <div className="site-footer-inner">
      <div className="site-footer-top">
        <div>
          <Link to="/" className="site-footer-brand">
            <span className="site-footer-brand-mark">A</span>
            <span className="site-footer-brand-name">Articulate - Induwara</span>
          </Link>
          <p className="site-footer-tagline">
            Written for software engineers who want to understand, not just memorise.
          </p>
        </div>
        <nav className="site-footer-nav">
          <p className="site-footer-nav-label">Navigation</p>
          <Link to="/">Articles</Link>
          <Link to="/about">About</Link>
        </nav>
      </div>
      <div className="site-footer-bottom">
        <span>© {new Date().getFullYear()} Articulate · All rights reserved</span>
        <span>Deep dives into software engineering</span>
      </div>
    </div>
  </footer>
);

export default Footer;