import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-navy text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            About <span className="text-gold">TALVEXA</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Bridging the gap between Sri Lankan excellence and the global market. We bring the finest authentic products from the pearl of the Indian Ocean to your doorstep.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="max-w-4xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-navy mb-6 border-b pb-2 border-gray-200">Our Story</h2>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            TALVEXA Global Exports was founded with a simple mission: to share the rich heritage, exquisite flavors, and unparalleled craftsmanship of Sri Lanka with the world. Sri Lanka has been a trading hub for centuries, renowned for its spices, tea, gems, and textiles.
          </p>
          <p>
            We work directly with local farmers, artisans, and manufacturers to ensure that every product we export meets the highest international standards of quality and sustainability. By cutting out the middlemen, we not only provide premium products to our global buyers but also ensure fair trade practices for our local suppliers.
          </p>
          <p>
            Whether you are looking for bulk Ceylon cinnamon, authentic handloom textiles, or precious gemstones, TALVEXA is your trusted partner in international sourcing.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-slate-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-navy text-center mb-10">Why Choose TALVEXA?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold text-navy mb-2">Global Reach</h3>
              <p className="text-gray-600 text-sm">We handle logistics and shipping to ensure your products arrive safely anywhere in the world.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-bold text-navy mb-2">Premium Quality</h3>
              <p className="text-gray-600 text-sm">Every item is strictly inspected and verified for authenticity and superior quality before export.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-navy mb-2">Direct Sourcing</h3>
              <p className="text-gray-600 text-sm">We source directly from local communities, ensuring fair prices for them and the best rates for you.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-4 text-center">
        <h2 className="text-3xl font-bold text-navy mb-4">Ready to do business with us?</h2>
        <p className="text-gray-600 mb-8">Explore our catalogue or get in touch for custom export inquiries.</p>
        <div className="flex justify-center gap-4">
          <Link href="/products" className="bg-navy text-gold px-8 py-3 rounded-md font-bold hover:bg-navy-light transition">
            View Products
          </Link>
          <Link href="/contact" className="bg-gold text-navy px-8 py-3 rounded-md font-bold hover:bg-gold-light transition">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}