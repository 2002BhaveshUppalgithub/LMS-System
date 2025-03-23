import React from "react";
import { Mail, Phone, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-auto p-4 text-center w-full md:ml-60 transition-all duration-300">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6 text-sm md:text-base">
        
        {/* Contact Info */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold">Contact</h2>
          <p className="flex items-center gap-2 mt-2"><Mail size={18} /> bhaveshuppal2002@gmail.com</p>
          <p className="flex items-center gap-2 mt-1"><Phone size={18} /> +91 8968064213</p>
        </div>

        {/* Quick Links */}
        <div className="mt-4 md:mt-0">
          <h2 className="text-lg font-semibold">Quick Links</h2>
          <ul className="mt-2 space-y-1">
            <li><a href="#" className="hover:text-yellow-400">Home</a></li>
            <li><a href="#" className="hover:text-yellow-400">Courses</a></li>
            <li><a href="#" className="hover:text-yellow-400">About</a></li>
            <li><a href="#" className="hover:text-yellow-400">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="mt-4 md:mt-0 flex gap-4">
          <a href="https://linkedin.com/in/BhaveshUppal" target="_blank" rel="noopener noreferrer">
            <Linkedin size={24} className="hover:text-yellow-400 transition" />
          </a>
          <a href="https://github.com/BhaveshUppal" target="_blank" rel="noopener noreferrer">
            <Github size={24} className="hover:text-yellow-400 transition" />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-400 mt-6">
        © {new Date().getFullYear()} Bhavesh Uppal | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
