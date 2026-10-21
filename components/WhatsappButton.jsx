"use client";

import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";

export default function WhatsappButton() {
  const phoneNumber = "+923457707337";
  const message = "Hello! I'd like to inquire about your services.";

  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
    
      <span
        className={`bg-gray-800 text-white text-sm font-medium px-3 py-1.5 rounded-md shadow-md transition-all duration-300 ease-in-out ${
          hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
        }`}
      >
        Contact Us on WhatsApp
      </span>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${phoneNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us via WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Subtle ripple effect */}
        <span className="absolute inset-0 bg-green-400 rounded-full opacity-0 animate-ripple hover:opacity-20"></span>
        <FaWhatsapp className="relative text-3xl" />
      </a>
    </div>
  );
}
