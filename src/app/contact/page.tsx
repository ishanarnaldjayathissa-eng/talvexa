export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        
        {/* Contact Info (Left Side) */}
        <div className="bg-navy text-white p-10 md:w-1/3 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gold mb-6">Get in Touch</h2>
            <p className="text-gray-300 mb-8">
              We are always ready to assist you with your export inquiries. Reach out to us via email, phone, or visit our office.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="text-2xl">📍</span> 
                <div>
                  <h4 className="font-bold">Head Office</h4>
                  {/* 👇 මෙතන ඔයාගේ ලිපිනය දාන්න 👇 */}
                  <p className="text-sm text-gray-300">
                    No 31, Balaweena,<br/>
                    Pallegedara,<br/>
                    Sri Lanka
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl">📞</span>
                <div>
                  <h4 className="font-bold">Phone / WhatsApp</h4>
                  <p className="text-sm text-gray-300">+94 76 153 6680</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl">✉️</span>
                <div>
                  <h4 className="font-bold">Email</h4>
                  {/* 👇 මෙතන ඔයාගේ ඊමේල් එක දාන්න 👇 */}
                  <p className="text-sm text-gray-300">ishanarnaldjayathissa@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <p className="text-sm text-gray-400 border-t border-gray-700 pt-4">
              Working Hours: Mon - Fri, 9:00 AM - 6:00 PM (GMT+5:30)
            </p>
          </div>
        </div>

        {/* Contact Form (Right Side) */}
        <div className="p-10 md:w-2/3">
          <h2 className="text-2xl font-bold text-navy mb-6">Send us a Message</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">First Name</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold outline-none" placeholder="John" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Last Name</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold outline-none" placeholder="Doe" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
              <input type="email" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold outline-none" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Subject</label>
              <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold outline-none" placeholder="Export Inquiry" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Message</label>
              <textarea rows={4} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold outline-none" placeholder="How can we help you?"></textarea>
            </div>
            <button type="button" className="w-full bg-gold text-navy font-bold py-3 rounded-lg hover:bg-gold-light transition">
              Send Message
            </button>
            <p className="text-xs text-gray-500 text-center mt-2">
              *(Note: For bulk orders, please use the "Request Bulk Quote" button on the product page).*
            </p>
          </form>
        </div>

      </div>
    </div>
  )
}