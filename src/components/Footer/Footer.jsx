import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaFacebook />, url: "https://facebook.com", label: "Facebook" },
    { icon: <FaXTwitter />, url: "https://x.com", label: "Twitter" },
    { icon: <FaInstagram />, url: "https://instagram.com", label: "Instagram" },
    { icon: <FaLinkedin />, url: "https://linkedin.com", label: "LinkedIn" },
    { icon: <FaYoutube />, url: "https://youtube.com", label: "YouTube" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-white">S</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Scholar<spam className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Stream</spam>
                </h2>
                <p className="text-gray-400 text-sm">Connecting Students to Opportunities</p>
              </div>
            </div>
          </div>

          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-4 text-center md:text-left">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors duration-300 transform hover:scale-110"
                >
                  <span className="text-xl">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to={"/privacy"} className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to={"/blogs"} href="#" className="text-gray-400 hover:text-white transition-colors">
                  Blogs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 my-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            <p>&copy; {currentYear} ScholarLink. All rights reserved.</p>
            <p className="mt-1">Empowering students through education and opportunity.</p>
          </div>

          <div className="text-gray-400 text-sm">
            <p>123 Education Ave, New York, NY 10001</p>
            <p className="mt-1">contact@scholarlink.org | (555) 123-4567</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
