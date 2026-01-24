import { useState } from "react";
import { Sun, Moon } from "lucide-react";

const styles = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.99);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export default function Landing() {
  const [name, setName] = useState("");
  const [upiId, setUpiId] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [error, setError] = useState("");
  const [isDark, setIsDark] = useState(false);

  const generateQR = async () => {
    setError("");
    setQrCode("");

    try {
      const response = await fetch("http://localhost:3000/api/generate-qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          upiId: upiId.trim(),
          name: name.trim(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setQrCode(data.qrCode);
      } else {
        setError(data.error || "Failed to generate QR code");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <>
      <style>{styles}</style>
      <div className={`min-h-screen px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDark ? "bg-zinc-900" : "bg-white"
      }`}>
        <nav className="flex justify-around items-center pt-10 animate-[slideDown_0.6s_ease-out] max-w-6xl mx-auto">
          <button className={`font-bold text-xl sm:text-2xl hover:cursor-pointer transition-colors ${
            isDark ? "text-white" : "text-zinc-800"
          }`}>
            QuickUPI
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-2 p-2 rounded-lg transition-all  ${
                isDark
                  ? "bg-zinc-800 text-indigo-400 hover:bg-zinc-700"
                  : "bg-zinc-100 text-yellow-400 hover:bg-zinc-200"
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        </nav>
        <div className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-center mt-12 sm:mt-16 md:mt-22 px-4 animate-[slideDown_0.8s_ease-out] transition-colors ${
          isDark ? "text-white" : "text-zinc-800"
        }`}>
          Transform your UPI-ID <br className="hidden sm:block" />
          <span className="sm:hidden">to a QR code with ease.</span>
          <span className="hidden sm:inline">to a QR code with ease.</span>
        </div>
        <div className="mt-5 flex justify-center px-4 animate-[slideDown_1s_ease-out]">
          <div className={`max-w-xl text-center text-sm sm:text-base transition-colors ${
            isDark ? "text-zinc-400" : "text-zinc-600"
          }`}>
            Convert any UPI ID into a QR code instantly. Fast, secure, and
            hassle-free payments. Just scan and pay. No sign-up, no setup, works
            with all UPI apps.
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 mt-10 sm:mt-12 md:mt-10 max-w-4xl mx-auto animate-[slideDown_1.2s_ease-out]">
          <div className="w-full max-w-md pl-5">
            <label className={`block text-sm font-bold mb-1 transition-colors ${
              isDark ? "text-white" : "text-zinc-800"
            }`}>
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
              className={`w-50 p-2 border rounded-md text-sm outline-none transition-colors ${
                isDark
                  ? "bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500"
                  : "bg-white border-gray-400 text-zinc-800 placeholder-gray-400"
              }`}
              placeholder="Aditya Patil"
            />
            <label className={`block text-sm font-bold mb-1 mt-3 transition-colors ${
              isDark ? "text-white" : "text-zinc-800"
            }`}>
              Upi-Id / VPA
            </label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              autoComplete="off"
              className={`w-70 p-2 border rounded-md text-sm outline-none transition-colors ${
                isDark
                  ? "bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500"
                  : "bg-white border-gray-400 text-zinc-800 placeholder-gray-400"
              }`}
              placeholder="adityapatil@bank_name"
            />
            <button
              onClick={generateQR}
              className={`text-sm text-white hover:cursor-pointer p-2 rounded-md mt-3 md:ml-3 transition-colors ${
                isDark
                  ? "bg-zinc-700 hover:bg-zinc-600"
                  : "bg-zinc-800 hover:bg-zinc-700"
              }`}
            >
              Generate code
            </button>

            {error && <div className="mt-4 text-sm text-red-500">{error}</div>}
          </div>
          {qrCode && (
            <div className="flex flex-col items-center animate-[fadeIn_0.5s_ease-out]">
              <label className={`block text-sm font-bold transition-colors ${
                isDark ? "text-white" : "text-zinc-800"
              }`}>
                QR-code (Scan and Pay)
              </label>
              <img src={qrCode} alt="UPI QR Code" className="w-48 h-48 mt-2" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}