import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    
<footer className="bg-[#0f1014] text-gray-300 py-10 px-8 mt-0">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
    
    {/* Logo and Company Info */}
    <div>
      <img src={assets.logo_dark} alt="Logo" className="w-24 h-auto mb-4" />
      <p className="text-sm">Empowering learners worldwide with quality education.</p>
    </div>

    {/* Contact Information */}
    <div>
      <h3 className="text-lg font-semibold mb-3 text-white">Contact Us</h3>
      <p className="text-sm">📞 Phone: +1 234 567 890</p>
      <p className="text-sm">📧 Email: support@yourcompany.com</p>
      <p className="text-sm">📍 Address: 123 Main St, City, Country</p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-lg font-semibold mb-3 text-white">Quick Links</h3>
      <ul className="text-sm space-y-2">
        <li><a href="#" className="hover:text-white transition">About Us</a></li>
        <li><a href="#" className="hover:text-white transition">Courses</a></li>
        <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
        <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
      </ul>
    </div>
  </div>

  {/* Bottom Section */}
  <div className="mt-8 text-center border-t border-gray-700 pt-4">
    <p className="text-sm">© 2025 YourCompany. All rights reserved.</p>
  </div>
</footer>

   
  )
}

export default Footer
