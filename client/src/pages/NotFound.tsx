import { Link } from 'react-router-dom';
import logoIcon from '../assets/icon.png';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-x-hidden">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500`}>
            <div className="max-w-6xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <div 
                  className="flex items-center space-x-2 cursor-pointer group"
                  onClick={() => navigate('')}
                >
                  <div className="relative w-10 h-10 flex items-center justify-center">
                    <img
                      src={logoIcon}
                      alt="Logo"
                      className="absolute w-12 h-12 left-2 top-1/2 -translate-y-1/2 opacity-80 pointer-events-none"
                      style={{ zIndex: 0 }}
                    />
                  </div>
                  <span className="text-xl font-black font-mono py-1 rounded-md text-cyan-600 text-white relative z-10 shadow-md">
                    JournalToTweet
                  </span>
                </div>
            </div>
        </div>
    </nav>
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-pink-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
        <div className="absolute top-60 left-1/3 w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
      </div>
      <main className="z-10 flex flex-col items-center justify-center flex-1 w-full px-4">
        <h1 className="text-7xl md:text-9xl font-black bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent mb-6 drop-shadow-lg">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Page Not Found</h2>
        <p className="text-lg md:text-xl text-gray-400 mb-8 text-center max-w-xl">
          Oops! The page you are looking for does not exist.<br />
          Maybe you took a wrong turn in your journaling journey.
        </p>
        <Link to="/" className="px-6 py-3 rounded-sm bg-cyan-500 hover:bg-cyan-600 text-white text-md transition-colors shadow-lg">
          Go Home
        </Link>
      </main>
    </div>
  );
}

export default NotFound; 