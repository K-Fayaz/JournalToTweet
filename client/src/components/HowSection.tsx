
import { Clock,PenTool,Mail } from "lucide-react";

{/* Simple Visual How It Works - Instant Understanding */}
const HowSection = () => {
    return (
      <section id="how-it-works" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-4">
                <span className="text-white">How It </span>
                <span className="text-cyan-400">Actually</span>
                <span className="text-white"> Works</span>
            </h2>
            <p className="text-xl text-gray-400 font-mono">
                Simple as 1, 2, 3... (seriously)
            </p>
            </div>

            {/* Visual Flow - Clean & Instant */}
            <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                
                {/* Step 1 - Pick Times */}
                <div className="text-center group">
                <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-cyan-400 text-black px-2 py-1 rounded-full text-xs font-bold">
                    1
                    </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Pick Your Times</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Choose when you want tweet suggestions: 10am, 1:30pm, 5pm, 8pm. Whatever fits your flow.
                </p>
                
                {/* Visual Example */}
                <div className="mt-4 bg-gray-900 rounded-lg p-3 border border-gray-700">
                    <div className="flex justify-center space-x-2 text-xs">
                    <span className="bg-cyan-500 text-white px-2 py-1 rounded">10:00</span>
                    <span className="bg-cyan-500 text-white px-2 py-1 rounded">13:30</span>
                    <span className="bg-cyan-500 text-white px-2 py-1 rounded">17:00</span>
                    <span className="bg-cyan-500 text-white px-2 py-1 rounded">20:00</span>
                    </div>
                </div>
                </div>

                {/* Step 2 - Journal */}
                <div className="text-center group">
                <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <PenTool className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-pink-400 text-black px-2 py-1 rounded-full text-xs font-bold">
                    2
                    </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Journal Your Day</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Write about bugs you fixed, features you shipped, lessons learned. Just brain dump - no need to be perfect.
                </p>
                
                {/* Visual Example */}
                <div className="mt-4 bg-gray-900 rounded-lg p-3 border border-gray-700 text-left">
                    <div className="text-xs text-gray-400 font-mono">
                    <span className="text-pink-400"># Today</span><br />
                    Fixed the auth bug...<br />
                    Learned about JWT...<br />
                    <span className="text-gray-600">...</span>
                    </div>
                </div>
                </div>

                {/* Step 3 - Get Tweets */}
                <div className="text-center group">
                <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold">
                    3
                    </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Get Tweet Drafts</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                    AI turns your journal into tweet drafts, delivered to your inbox. Edit, copy, post. Done.
                </p>
                
                {/* Visual Example */}
                <div className="mt-4 bg-gray-900 rounded-lg p-3 border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                    <Mail className="w-4 h-4 text-yellow-400" />
                    <span className="text-xs text-green-400">✓ 3 drafts</span>
                    </div>
                    <div className="text-xs text-gray-400 text-left">
                    "3 days debugging auth...<br />
                    turns out it was a typo 🤦‍♂️"
                    </div>
                </div>
                </div>
            </div>

            {/* CTA */}
            {/* <div className="text-center mt-16">
                <Link 
                to="/login"
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 via-pink-500 to-yellow-500 rounded-lg font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg inline-flex items-center space-x-2"
                >
                <span className="relative z-10 flex items-center space-x-2">
                    <span>Start Journaling Free</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                </Link>
                <p className="text-sm text-gray-500 mt-3 font-mono">
                // Takes 30 seconds to set up
                </p>
            </div> */}
            </div>
        </div>
    </section>
    )
}

export default HowSection;