import React, { useState } from 'react';
import { Award, CheckCircle, MessageCircle, X } from 'lucide-react';
import certificate from "../../assets/images/certificate.jpg"
import verified from "../../assets/images/verified.png"
import badge from "../../assets/images/badge.png"

export default function Certificate() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* WhatsApp Button */}
      {/* 
        href="https://wa.me/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 transition-colors rounded-full p-4 shadow-lg z-50"
      >
        <MessageCircle className="w-8 h-8 text-white" />
      </a> */}

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-4 py-8 md:py-16 lg:py-20">
        {/* Award Icon */}
        <img
          src={badge}
          alt="Award"
          className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain mb-4 md:mb-6"
        />

        {/* Main Heading */}
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-semibold text-center mb-3 md:mb-5 leading-tight 
  bg-gradient-to-r from-[#EDCC5B] to-[#F1b223] text-transparent bg-clip-text 
  max-w-6xl mx-auto px-2">
          Recognized by the Government of India under DPIIT
        </h1>

        {/* Subheading */}
        <p className="text-sm md:text-lg lg:text-xl text-gray-300 text-center mb-4 md:mb-6 max-w-2xl px-4">
          Officially recognized by Startup India - Department for Promotion of Industry and Internal Trade
        </p>

        {/* Verified Badge */}
        <div className="flex items-center gap-2 text-[#EBD36B] mb-6 md:mb-8">
          <img
            src={verified}
            alt="check"
            className="w-6 h-6 md:w-8 md:h-8 object-contain"
          />
          <span className="text-base md:text-lg font-semibold">Verified & Active</span>
        </div>
      </div>

      {/* Certificate Section */}
      <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 py-4 md:py-6 lg:py-8 px-4 md:px-8 w-[95%] mx-auto rounded-3xl border-2 border-[#585741] mb-8 md:mb-12">
        <div className="max-w-7xl mx-auto">
          {/* Certificate Container */}
          <div className="bg-[#17202E] p-2 md:p-8 lg:p-12 border-2 border-dashed border-[#585741] shadow-2xl rounded-2xl">
            <div
              className="rounded-xl overflow-hidden shadow-2xl md:cursor-default cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <img
                src={certificate}
                alt="DPIIT Certificate of Recognition for DOTS&DECIMALS INFOTECH LLP"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Mobile */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="fixed top-4 right-4 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors z-[101]"
          >
            <X className="w-8 h-8 text-white" />
          </button>

          {/* Certificate Image in Modal */}
          <div
            className="relative max-w-4xl w-full my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={certificate}
              alt="DPIIT Certificate of Recognition for DOTS&DECIMALS INFOTECH LLP"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}