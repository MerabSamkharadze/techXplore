"use client";

import { useState } from "react";
import { Copy, X } from "lucide-react";
import Share from "../../public/svg/Share";

export default function PopupComponent() {
  const [showPopup, setShowPopup] = useState(false);
  const [copied, setCopied] = useState(false);
  const link =
    "https://example.com/serghsfdgsrfgsfs/sfs/fdbsfg/bsfgn/bdsfgns/fdgbdfgnS?fgnbdfgbd";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="p-2 rounded-lg hover:bg-gray-200 z-50">
      <div className="relative group">
        <button onClick={() => setShowPopup(true)}>
          <Share />
        </button>
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 transition-all rounded bg-gray-800 text-white text-xs px-2 py-1 group-hover:scale-100">
          გააზიარე
        </span>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="p-[2px] rounded-2xl bg-gradient-to-r from-[#00adee] to-[#0077b6]">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-80 text-center relative">
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                onClick={() => setShowPopup(false)}
              >
                <X size={20} />
              </button>

              <h2
                className={`text-xl font-semibold mb-4 bg-gradient-to-r from-[#00adee] to-[#0077b6] bg-clip-text text-transparent ${
                  copied && "text-green-600"
                }`}
              >
                {copied ? "Copied!" : "Copy Link"}
              </h2>

              <div className="relative flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md">
                <span
                  className={`text-sm text-gray-700 truncate ${
                    copied && "text-green-600"
                  }`}
                >
                  {link}
                </span>
                <button onClick={copyToClipboard}>
                  <Copy
                    size={18}
                    className="text-gray-600 hover:text-gray-900"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
