
import { Link } from "react-router-dom";
import { Twitter } from "lucide-react";
import logoIcon from '../assets/icon.png';

const Footer = () => {
    return (
        <footer className="py-12 bg-black border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 flex items-center">
              <img
                src={logoIcon}
                alt="Logo"
                className="w-12 h-12 opacity-80"
                style={{ zIndex: 0 }}
              />
              <h3 className="text-xl font-black font-mono py-1 rounded text-cyan-600 text-white relative z-10 shadow-md">
                JournalToTweet
              </h3>
            </div>
            {/* Right side links */}
            <div className="flex items-center space-x-6 text-gray-400 text-sm">
              <Link to="/legals?ref=privacy-policy" className="hover:text-cyan-400 transition-colors">
                Privacy Policy
              </Link>
              <span className="text-gray-600">|</span>
              <Link to="/legals?ref=terms-of-service" className="hover:text-pink-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    )
}

export default Footer;