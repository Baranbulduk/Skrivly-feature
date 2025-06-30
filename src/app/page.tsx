'use client'

import { FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feature: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/submit-feature', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', feature: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-1 w-full px-4 pt-12 pb-8">
        {/* Logo */}
        <div className="w-full max-w-7xl flex items-start">
          <div className="relative w-40 h-12">
            <Image src="/assets/skrivly-logo.svg" alt="Skrivly logo" width={140} height={48} />
          </div>
        </div>
        <div className="w-full max-w-7xl flex items-start">
          <div className="text-black mt-6 text-base sm:text-lg md:text-xl font-regular">
            <p>
              Skrivly is a platform that allows you to create, sign, and manage your documents with ease.
            </p>
          </div>
        </div>
        {/* Form Card */}
        <div className="w-full max-w-7xl mt-8 bg-[#fafafd] rounded-lg shadow-sm border border-[#f0f0f0]">
          {/* Form Header */}
          <div className="bg-[#6C5CE7] rounded-t-lg px-4 sm:px-6 py-3 sm:py-4">
            <h2 className="text-white text-lg sm:text-xl md:text-2xl font-bold text-center">Suggest a new feature</h2>
          </div>
          {/* Form Body */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-4 sm:px-6 py-6 sm:py-8">
            <label className="text-black text-base sm:text-lg md:text-xl font-semibold" htmlFor="name">What would you like to be added?</label>
            <div className="flex flex-col">
              <label htmlFor="name" className="text-black text-sm sm:text-base md:text-lg font-medium">Name <span className="text-[#d30000]">*</span></label>
              <input 
                id="name" 
                type="text" 
                placeholder="Enter Your Name" 
                className="rounded bg-white border border-[#f0f0f0] px-3 sm:px-4 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#6C5CE7] placeholder:text-[#888] text-black"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-black text-sm sm:text-base md:text-lg font-medium">Email <span className="text-[#d30000]">*</span></label>
              <input 
                id="email" 
                type="email" 
                placeholder="Enter Your Email" 
                className="rounded bg-white border border-[#f0f0f0] px-3 sm:px-4 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#6C5CE7] placeholder:text-[#888] text-black"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="feature" className="text-black text-sm sm:text-base md:text-lg font-medium">Feature <span className="text-[#d30000]">*</span></label>
              <textarea 
                id="feature" 
                placeholder="Write Your Feature" 
                maxLength={500}
                className="rounded bg-white border border-[#f0f0f0] px-3 sm:px-4 py-2 min-h-[80px] sm:min-h-[96px] text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#6C5CE7] resize-none placeholder:text-[#888] text-black"
                value={formData.feature}
                onChange={handleChange}
                required
              />
              {formData.feature.length === 500 && (
                <div className="text-xs sm:text-sm text-red-500 mt-1 text-right">
                  {formData.feature.length}/500 characters
                </div>
              )}
              {formData.feature.length < 500 && (
                <div className="text-xs sm:text-sm text-gray-500 mt-1 text-right">
                  {formData.feature.length}/500 characters
                </div>
              )}
            </div>
            {submitStatus === 'success' && (
              <div className="text-sm sm:text-base text-green-600 text-center">
                Feature suggestion submitted successfully!
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="text-sm sm:text-base text-red-600 text-center">
                Failed to submit feature suggestion. Please try again.
              </div>
            )}
            <div className="flex justify-center mt-2">
              <button 
                type="submit" 
                className="bg-[#6C5CE7] text-white px-6 sm:px-8 py-2 rounded font-medium text-sm sm:text-base md:text-lg hover:bg-[#5a4bcf] transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Send feature'}
              </button>
            </div>
          </form>
        </div>
      </main>
      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-200 mt-8 sm:mt-12 pt-8 sm:pt-12 pb-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-6 sm:gap-8 px-4">
          {/* Left: Logo & Contact */}
          <div className="flex-1 min-w-[260px] flex flex-col gap-2">
            <div className="w-22 sm:w-28 h-8 sm:h-12 relative">
              <Image src="/assets/skrivly-logo.svg" alt="Skrivly logo" fill className="object-contain" />
            </div>
            <div className="mt-2 font-semibold text-sm sm:text-base md:text-lg text-[#000000]">Simple and Secure Electronic Signatures.</div>
            <div className="flex items-center gap-2 text-[#000000]">
              <FaEnvelope className="text-lg sm:text-xl" />
              <a href="mailto:support@skrivly.com" className="text-sm sm:text-base hover:underline">support@skrivly.com</a>
            </div>
            <div className="flex items-center gap-2 text-[#000000]">
              <FaPhone className="text-lg sm:text-xl" />
              <a href="tel:+46700084502" className="text-sm sm:text-base hover:underline">+46700084502</a>
            </div>
            <div className="text-[#000000] text-xs sm:text-sm">© All right reserved to Skrivly</div>
            <a href="https://www.linkedin.com/company/skrivly/" target="_blank" rel="noopener noreferrer" className="inline-block mt-2">
              <FaLinkedin className="text-2xl sm:text-3xl text-[#0a66c2] bg-white rounded" />
            </a>
          </div>
          {/* Right: Links */}
          <div className="flex-[2] grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            <div>
              <h4 className="font-bold mb-2 text-sm sm:text-base md:text-lg text-[#000000]">Features</h4>
              <ul className="space-y-1 text-xs sm:text-sm md:text-base text-[#000000]">
                <li>Simple Electronic Signature</li>
                <li>Advanced Electronic Signature</li>
                <li>Contract Management</li>
                <li>AI-powered Contracts</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2 text-sm sm:text-base md:text-lg text-[#000000]">Legal</h4>
              <ul className="space-y-1 text-xs sm:text-sm md:text-base text-[#000000]">
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
                <li>Advanced Security</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2 text-sm sm:text-base md:text-lg text-[#000000]">Products</h4>
              <ul className="space-y-1 text-xs sm:text-sm md:text-base text-[#000000]">
                <li>Electronic Signature</li>
                <li>Skrivly API</li>
                <li>Skrivly One — Coming Soon</li>
                <li>Skrivly QES — Coming Soon</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2 text-sm sm:text-base md:text-lg text-[#000000]">Company</h4>
              <ul className="space-y-1 text-xs sm:text-sm md:text-base text-[#000000]">
                <li>Contact Us</li>
                <li>About Us</li>
                <li>Skrivly learning-hub</li>
                <li>Career</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border border-gray-300 mt-6 sm:mt-8 py-3 text-center text-xs sm:text-sm md:text-base text-[#000000]">
          Powered by <span className="font-bold">Rexett AB</span>
        </div>
      </footer>
    </div>
  );
}
