import { Link } from "react-router-dom";

const Testimonials = () => {
    return (
        <section id="testimonials" className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-12 text-white">
            What Our Users Say
          </h2>
          
          <div className="relative">
            <div className="bg-gray-900 border-2 border-dashed border-gray-700 rounded-lg p-12 min-h-[200px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">👻</span>
                </div>
                <p className="text-gray-500 text-lg mb-4">This space intentionally left blank</p>
                <div className="transform -rotate-2 bg-yellow-400 text-black px-4 py-2 rounded font-bold inline-block">
                  You'll be here soon ✨
                </div>
              </div>
            </div>
            {/* Scribbled note */}
            <div className="absolute -bottom-4 -right-4 transform rotate-12 bg-pink-400 text-black px-3 py-2 rounded font-mono text-sm">
              // keeping it real
            </div>
          </div>

          <div className="mt-12">
            <div className="flex justify-center">
              <Link
                to="/login"
                className="bg-pink-600 hover:bg-pink-500 text-white px-8 py-3 rounded font-bold text-lg hover:scale-105 transition-transform"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
}

export default Testimonials;