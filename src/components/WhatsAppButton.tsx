'use client'

export default function WhatsAppButton() {
  // ඔයාගේ WhatsApp නම්බර් එක මෙතනට දාන්න (උදා: 94771234567)
  const phoneNumber = "94761536680" 
  const message = "Hello TALVEXA, I have a question."
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <a 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 z-50 flex items-center justify-center"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 48 48" 
        width="30px" 
        height="30px" 
        fill="currentColor"
      >
        <path d="M24,4C12.954,4,4,12.954,4,24c0,3.56,0.928,6.91,2.556,9.814L4.13,43.433l9.882-2.36C16.866,42.654,20.31,44,24,44c11.046,0,20-8.954,20-20S35.046,4,24,4z M33.31,32.62c-0.415,1.164-2.396,2.22-3.348,2.303c-0.953,0.083-1.84,0.436-6.197-1.262c-5.22-2.034-8.497-7.275-8.755-7.614c-0.258-0.339-2.093-2.787-2.093-5.314c0-2.527,1.32-3.766,1.79-4.286c0.47-0.52,1.027-0.648,1.367-0.648c0.34,0,0.682,0.003,0.978,0.018c0.312,0.015,0.73-0.12,1.142,0.872c0.424,1.02,1.443,3.52,1.57,3.774c0.127,0.254,0.212,0.55,0.042,0.89c-0.17,0.34-0.255,0.55-0.508,0.848c-0.253,0.298-0.533,0.666-0.762,0.895c-0.255,0.253-0.52,0.528-0.225,1.038c0.295,0.51,1.31,2.163,2.816,3.504c1.933,1.72,3.565,2.253,4.07,2.507c0.505,0.254,0.802,0.212,1.097-0.127c0.295-0.34,1.27-1.48,1.607-1.99c0.338-0.51,0.676-0.424,1.14-0.254c0.465,0.17,2.954,1.393,3.46,1.646c0.506,0.254,0.845,0.382,0.972,0.593C33.734,31.23,33.725,31.456,33.31,32.62z"/>
      </svg>
    </a>
  )
}