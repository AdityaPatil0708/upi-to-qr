import { useState } from 'react';

export default function Landing() {
  const [name, setName] = useState('');
  const [upiId, setUpiId] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [error, setError] = useState('');

  const generateQR = async () => {
    setError('');
    setQrCode('');

    try {
      const response = await fetch('http://localhost:3000/api/generate-qr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
        setError(data.error || 'Failed to generate QR code');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8">
      <nav className="flex justify-center items-center mt-5">
        <button className="font-bold text-xl sm:text-2xl hover:cursor-pointer text-zinc-800">
          QuickUPI.
        </button>
      </nav>
      <div className="text-zinc-800 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-center mt-12 sm:mt-16 md:mt-20 px-4">
        Transform your UPI-ID <br className="hidden sm:block" /> 
        <span className="sm:hidden">to a QR code with ease.</span>
        <span className="hidden sm:inline">to a QR code with ease.</span>
      </div>
      <div className="mt-5 flex justify-center px-4">
        <div className="max-w-xl text-center text-sm sm:text-base text-zinc-600">
          Convert any UPI ID into a QR code instantly. Fast, secure, and
          hassle-free payments—just scan and pay. No sign-up, no setup, works
          with all UPI apps.
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 mt-10 sm:mt-12 md:mt-10 max-w-4xl mx-auto">
        <div className="w-full max-w-md">
          <label className="block text-sm font-bold mb-1 text-zinc-800">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
            className="w-50 p-2 border border-gray-400 rounded-md text-sm outline-none"
            placeholder="Aditya Patil"
          />
          <label className="block text-sm font-bold mb-1 text-zinc-800 mt-3">Upi-Id / VPA</label>
          <input
            type="text"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            autoComplete="off"
            className="w-70 p-2 border border-gray-400 rounded-md text-sm outline-none"
            placeholder="adityapatil@bank_name"
          />
          <button 
            onClick={generateQR}
            className="text-sm text-white bg-zinc-800 hover:bg-zinc-700  hover:cursor-pointer p-2 rounded-md mt-3 md:ml-3"
          >
            Generate code
          </button>

          {error && (
            <div className="mt-4 text-sm text-red-600">
              {error}
            </div>
          )}
          
        </div>
        {qrCode && (
          <div className="flex flex-col items-center">
            <label className="block text-sm font-bold text-zinc-800">QR-code (Scan and Pay)</label>
            <img src={qrCode} alt="UPI QR Code" className='w-48 h-48' />
          </div>
        )}
      </div>
    </div>
  );
}