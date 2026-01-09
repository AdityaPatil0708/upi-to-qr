

export default function Landing() {
  return (
    <div>
        <nav className="flex justify-center items-center mt-5 ml-25 mr-30">
        <button className="font-bold text-2xl hover:cursor-pointer text-zinc-800">
          QuickUPI.
        </button>
      </nav>
      <div className="text-zinc-800 text-6xl font-semibold text-center mt-20">
        Transform your UPI-ID <br /> to a QR code with ease.
      </div>
      <div className="mt-5 flex justify-center">
        <div className="max-w-xl text-center text-zinc-600">
          Convert any UPI ID into a QR code instantly. Fast, secure, and
          hassle-free payments—just scan and pay. No sign-up, no setup, works
          with all UPI apps.
        </div>
      </div>
      <div className="flex justify-around mt-10">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 text-zinc-800">Name</label>
          <input
            id="upi-id"
            type="text"
            autoComplete="off"
            className="w-40 p-2 border border-gray-400 rounded-md text-sm outline-none"
            placeholder="Aditya Patil"
          />
          <label className="block text-sm font-bold mb-2 text-zinc-800 mt-4">Upi-Id / VPA</label>
          <input
            id="upi-id"
            type="text"
            autoComplete="off"
            className="w-70 p-2 border border-gray-400 rounded-md text-sm outline-none"
            placeholder="adityapatil@bank_name"
          />
          <button className="text-sm text-white bg-zinc-800 hover:bg-zinc-700 hover:cursor-pointer p-2 rounded-md ml-3">
            Generate code 
          </button>
        </div>
      </div>
    </div>
  );
}