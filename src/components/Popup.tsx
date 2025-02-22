"use client";

import { useState, useEffect } from "react";
import { Copy, X } from "lucide-react";
import Share from "../../public/svg/Share";
import Done from "../../public/svg/Done";

export default function PopupComponent() {
  const [showPopup, setShowPopup] = useState(false);
  const [copied, setCopied] = useState(false);
  const [link, setLink] = useState<string>("");
  const [shortUrl, setShortUrl] = useState("");

  useEffect(() => {
    setLink(
      window.location.href.includes("/payments")
        ? window.location.href.replace("/payments", "")
        : window.location.href
    );
  }, []);
  const handleSubmit = async () => {
    const response = await fetch(
      `https://tinyurl.com/api-create.php?url=${encodeURIComponent(link)}`
    );

    if (response.ok) {
      const shortUrl = await response.text();

      setShortUrl(`${shortUrl}/payments`);
    } else {
      alert("Error creating short URL");
    }
    setShowPopup(true);
  };

  const copyToClipboard = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard
        .writeText(shortUrl)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => fallbackCopyToClipboard(shortUrl));
    } else {
      fallbackCopyToClipboard(shortUrl);
    }
  };

  const fallbackCopyToClipboard = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Fallback: Copying text failed", err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <div className="p-2 cursor-pointer rounded-lg hover:bg-gray-200 z-40">
      <div className="relative group">
        <button onClick={handleSubmit}>
          <Share />
        </button>
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 transition-all rounded bg-gray-800 text-white text-xs px-2 py-1 group-hover:scale-100">
          გააზიარე
        </span>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div
            className={`p-[2px] rounded-2xl bg-gradient-to-r from-[#00adee] to-[#0077b6] ${
              copied && "from-green-600 to-[#00FF00]"
            } `}
          >
            <div className="bg-white p-6 rounded-2xl shadow-lg w-80 text-center relative">
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                onClick={() => setShowPopup(false)}
              >
                <X size={20} />
              </button>

              <h2
                className={`text-xl font-semibold mb-4 bg-[#00adee]  bg-clip-text text-transparent ${
                  copied && "bg-green-600"
                }`}
              >
                {copied ? (
                  <div className="flex gap-2 text-center items-center justify-center">
                    <Done /> Copied!
                  </div>
                ) : (
                  "Copy Link"
                )}
              </h2>

              <div className="relative flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md">
                <span
                  className={`text-sm text-gray-700 truncate ${
                    copied && "text-green-600"
                  }`}
                >
                  {shortUrl}
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
