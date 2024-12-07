import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom"; // For internal navigation links
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-3">
      <div className="container">
        <div className="row">
          {/* Company Info */}
          <div className="col-md-4 mb-3">
            <h5 className="text-uppercase">Company Name</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
            </p>
            <p>&copy; 2024 Company Name. All Rights Reserved.</p>
          </div>

          {/* Navigation Links */}
          <div className="col-md-4 mb-3">
            <h5 className="text-uppercase">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/about" className="text-white text-decoration-none">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="text-white text-decoration-none">Services</Link>
              </li>
              <li>
                <Link to="/contact" className="text-white text-decoration-none">Contact</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-white text-decoration-none">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="col-md-4 mb-3 text-center">
            <h5 className="text-uppercase">Connect with Us</h5>
            <div className="d-flex justify-content-center gap-4">
              <a href="#" className="social-link" aria-label="Facebook">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-4">
          <p className="small">
            Designed by Team Name | Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
