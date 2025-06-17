import { FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-1 w-full px-4 pt-12 pb-8">
        {/* Logo */}
        <div className="w-full max-w-4xl flex items-start">
          <div className="w-40 h-12 relative">
            <Image src="/assets/skrivly-logo.png" alt="Skrivly logo" width={160} height={48} />
          </div>
        </div>
        {/* Form Card */}
        <div className="w-full max-w-4xl mt-8 bg-[#fafafd] rounded-lg shadow-sm border border-[#f0f0f0]">
          {/* Form Header */}
          <div className="bg-[#6C5CE7] rounded-t-lg px-6 py-4">
            <h2 className="text-white text-lg font-semibold text-center">Suggest a new feature</h2>
          </div>
          {/* Form Body */}
          <form className="flex flex-col gap-4 px-6 py-8">
            <label className="text-black text-base font-medium" htmlFor="name">What would you like to be added?</label>
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-black text-sm font-medium">Name <span className="text-[#6C5CE7]">*</span></label>
              <input id="name" type="text" placeholder="Enter Your Name" className="rounded bg-white border border-[#f0f0f0] px-4 py-2 outline-none focus:ring-2 focus:ring-[#6C5CE7] placeholder:text-[#888]" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-black text-sm font-medium">Email <span className="text-[#6C5CE7]">*</span></label>
              <input id="email" type="email" placeholder="Enter Your Email" className="rounded bg-white border border-[#f0f0f0] px-4 py-2 outline-none focus:ring-2 focus:ring-[#6C5CE7] placeholder:text-[#888]" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="feature" className="text-black text-sm font-medium">Feature <span className="text-[#6C5CE7]">*</span></label>
              <textarea id="feature" placeholder="Write Your Feature" className="rounded bg-white border border-[#f0f0f0] px-4 py-2 min-h-[96px] outline-none focus:ring-2 focus:ring-[#6C5CE7] resize-none placeholder:text-[#888]" />
            </div>
            <div className="flex justify-center mt-2">
              <button type="submit" className="bg-[#6C5CE7] text-white px-8 py-2 rounded font-medium shadow-sm hover:bg-[#5a4bcf] transition">Send feature</button>
            </div>
          </form>
        </div>
      </main>
      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-200 mt-12 pt-12 pb-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-8 px-4">
          {/* Left: Logo & Contact */}
          <div className="flex-1 min-w-[260px] flex flex-col gap-4">
            <div className="w-56 h-20 relative">
              <Image src="/assets/skrivly-logo.png" alt="Skrivly logo" fill className="object-contain" />
            </div>
            <div className="mt-2 font-semibold text-lg text-[#15313b]">Simple and Secure Electronic Signatures.</div>
            <div className="flex items-center gap-2 text-[#15313b]">
              <FaEnvelope className="text-xl" />
              <a href="mailto:support@skrivly.com" className="hover:underline">support@skrivly.com</a>
            </div>
            <div className="flex items-center gap-2 text-[#15313b]">
              <FaPhone className="text-xl" />
              <a href="tel:+46700084502" className="hover:underline">+46700084502</a>
            </div>
            <div className="text-[#15313b] text-sm">© All right reserved to Skrivly</div>
            <a href="https://www.linkedin.com/company/skrivly/" target="_blank" rel="noopener noreferrer" className="inline-block mt-2">
              <FaLinkedin className="text-3xl text-[#0a66c2] bg-white rounded" />
            </a>
          </div>
          {/* Right: Links */}
          <div className="flex-[2] grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold mb-2 text-lg text-[#19123b]">Features</h4>
              <ul className="space-y-1 text-base text-[#19123b]">
                <li>Simple Electronic Signature</li>
                <li>Advanced Electronic Signature</li>
                <li>Contract Management</li>
                <li>AI-powered Contracts</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2 text-lg text-[#19123b]">Legal</h4>
              <ul className="space-y-1 text-base text-[#19123b]">
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
                <li>Advanced Security</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2 text-lg text-[#19123b]">Products</h4>
              <ul className="space-y-1 text-base text-[#19123b]">
                <li>Electronic Signature</li>
                <li>Skrivly API</li>
                <li>Skrivly One — Coming Soon</li>
                <li>Skrivly QES — Coming Soon</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2 text-lg text-[#19123b]">Company</h4>
              <ul className="space-y-1 text-base text-[#19123b]">
                <li>Contact Us</li>
                <li>About Us</li>
                <li>Skrivly learning-hub</li>
                <li>Career</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border border-gray-300 mt-8 py-3 text-center text-base text-[#19123b]">
          Powered by <span className="font-bold">Rexett AB</span>
        </div>
      </footer>
    </div>
  );
}
