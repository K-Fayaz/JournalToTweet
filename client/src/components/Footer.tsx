
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
            
            <div className="flex items-center space-x-6 text-gray-500 text-sm">
              {/* <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a> */}
              {/* <a href="#" className="hover:text-pink-400 transition-colors">Terms</a> */}
              {/* <Link to="/pricing" className="hover:text-yellow-400 transition-colors">Pricing</Link> */}
              {/* <a href="#" className="hover:text-yellow-400 transition-colors flex items-center space-x-1">
                <Twitter className="w-4 h-4" />
                <span>@journaltotweet</span>
              </a> */}
            </div>
          </div>
        </div>
      </footer>
    )
}

export default Footer;