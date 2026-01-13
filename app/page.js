export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navbar */}
      {/* <header className="w-full py-4 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold text-blue-600">QR Maker</h1>

          <div className="flex items-center gap-4">
            <a href="/auth/login" className="text-gray-700 hover:text-blue-600">
              Login
            </a>
            <a
              href="/auth/signup"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Sign Up
            </a>
          </div>
        </div>
      </header> */}

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto flex flex-col md:flex-row items-center px-4 py-16">
        {/* Left Content */}
        <div className="flex-1">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
            Create Your UPI <span className="text-blue-600">QR Codes</span>
            Instantly!
          </h2>

          <p className="text-gray-600 mt-4 text-lg">
            Enter any amount, generate a secure UPI QR code, download, share and
            even track transactions.
          </p>

          <a
            href="/generate"
            className="inline-block px-6 py-3 mt-6 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700"
          >
            Generate QR
          </a>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center mt-10 md:mt-0">
          <img
            src="/qr-placeholder.png"
            alt="QR Code"
            className="w-72 h-72 shadow-lg rounded-xl border"
          />
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16 mt-10 border-t">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-10 text-gray-900">Why QR Maker?</h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-xl shadow-sm bg-gray-50">
              <h4 className="text-xl font-semibold mb-3">⚡ Fast QR Generator</h4>
              <p className="text-gray-600">
                Just enter an amount — your UPI QR is generated instantly.
              </p>
            </div>

            <div className="p-6 border rounded-xl shadow-sm bg-gray-50">
              <h4 className="text-xl font-semibold mb-3">🔐 Secure Payments</h4>
              <p className="text-gray-600">
                Razorpay-based verification ensures your payments are safe.
              </p>
            </div>

            <div className="p-6 border rounded-xl shadow-sm bg-gray-50">
              <h4 className="text-xl font-semibold mb-3">📊 Transaction History</h4>
              <p className="text-gray-600">
                Track every QR generated and every payment verified.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="text-center py-6 text-gray-600 border-t mt-16">
        © {new Date().getFullYear()} QR Maker. All rights reserved.
      </footer> */}
    </main>
  );
}
