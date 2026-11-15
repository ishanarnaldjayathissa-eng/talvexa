"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="bg-[#D4AF37] hover:bg-yellow-600 text-[#0A192F] font-bold py-2 px-6 rounded-md shadow-md transition duration-300 print:hidden"
    >
      Download / Print PDF
    </button>
  );
}