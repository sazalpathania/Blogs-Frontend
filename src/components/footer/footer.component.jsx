import "./footer.style.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-brand">
          <h2>
            <span className="logo-icon">B</span>Blogs
          </h2>
          <p>
            Most developer friendly & highly customisable Admin Dashboard
            Template.
          </p>

          <div className="social-icons">
            <span>f</span>
            <span>📷</span>
            <span>𝕏</span>
            <span>in</span>
          </div>
        </div>

        {/* Company */}
        <div className="footer-col">
          <h4>Company</h4>
          <p>About us</p>
          <p>Blogs</p>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <p>Terms of service</p>
          <p>Policy Privacy</p>
          <p>Get in touch</p>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4>Contact Us</h4>
          <p>info@companyname.com</p>
          <p>(123) 456-789</p>
          <p>1234 Street Name, State, Zip Code</p>
        </div>
      </div>

      <div className="footer-bottom">© 2025 Blogs, All rights reserved</div>
    </footer>
  );
};

export default Footer;
