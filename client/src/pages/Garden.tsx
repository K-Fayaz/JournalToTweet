import { 
  Settings, 
  Calendar as CalendarIcon, 
  MessageSquare, 
  Twitter, 
  LogOut, 
  TreePineIcon 
} from 'lucide-react';
import icon from '../assets/icon.png';
import { useNavigate } from 'react-router-dom';

function Garden() {
  const navigate = useNavigate ? useNavigate() : (() => {});

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Fixed Sidebar */}
      <div className="w-64 bg-gray-900 border-r border-gray-700 fixed left-0 top-0 h-full flex flex-col">
        <div className="p-6 flex-1">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center">
              <img src={icon} alt="Logo" className="w-12 h-12" />
            </div>
            <span className="text-xl font-black text-cyan-600 font-mono">
              JournalToTweet
            </span>
          </div>
          
          <nav className="space-y-2">
            <button
              onClick={() => navigate('/journal')}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
            >
              <CalendarIcon className="w-5 h-5" />
              <span className="font-medium">Journals</span>
            </button>
            <button
              onClick={() => navigate('/tweet-suggestions')}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
            >
              <Twitter className="w-5 h-5" />
              <span className="font-medium">Tweet Suggestions</span>
            </button>
            <button
              onClick={() => navigate('/preferences')}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Preferences</span>
            </button>

            <div
              className="flex items-center space-x-3 px-3 py-2.5 rounded-lg bg-green-500/20 text-green-400 border border-green-500/30"
            >
              <TreePineIcon className="w-5 h-5" />
              <span className="font-medium">Tweet Garden</span>
            </div>

          </nav>
        </div>
        <div className="flex justify-start items-center mb-6 pl-6">
          <button
            onClick={() => { localStorage.removeItem('token'); navigate('/login'); }}
            className="p-0 bg-transparent border-none hover:bg-transparent hover:text-red-600 transition-colors"
            style={{ boxShadow: 'none' }}
            aria-label="Logout"
          >
            <LogOut className="w-6 h-6 text-gray-400 hover:text-red-600 transition-colors" />
          </button>
        </div>
      </div>

      {/* Main Content with left margin to account for fixed sidebar */}
      <div className="flex-1 ml-64 h-screen overflow-y-auto">
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-green-400 mb-2">Tweet Garden</h1>
              <p className="text-gray-400">
                Welcome to your Tweet Garden! (Page under construction)
              </p>
            </div>
            {/* Add more content here as needed */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Garden; 