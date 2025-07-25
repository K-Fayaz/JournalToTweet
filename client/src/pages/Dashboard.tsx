import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Settings, Twitter, LogOut, TreePineIcon } from 'lucide-react';
import useDashboard from '../hooks/useDashboard';
import icon from '../assets/icon.png';

function Dashboard() {
  const navigate = useNavigate();

  const {
    days,
    months,
    daysOfWeek,
    currentDate,
    getActivityLevel,
    navigateMonth,
    isToday,
    isCurrentMonth,
    isFutureDate,
    getActivityColor,
    handleDateClick,
  } = useDashboard();

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
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
            <div className="flex items-center space-x-3 px-3 py-2.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <CalendarIcon className="w-5 h-5" />
              <span className="font-medium">Journals</span>
            </div>
            
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

            {/* <button
              onClick={() => navigate('/garden')}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
            >
              <TreePineIcon className="w-5 h-5" />
              <span className="font-medium">Tweet Garden</span>
            </button> */}
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

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h1>
            <div className="flex space-x-2">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-600"
              >
                <ChevronLeft className="w-5 h-5 text-gray-300" />
              </button>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-600"
              >
                <ChevronRight className="w-5 h-5 text-gray-300" />
              </button>
            </div>
          </div>

          {/* Calendar */}
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
            {/* Days of week */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {daysOfWeek.map(day => (
                <div key={day} className="p-3 text-center text-sm font-medium text-gray-400">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-2">
              {days.map((day, index) => {
                const isCurrentMonthDay = isCurrentMonth(day);
                const isTodayDay = isToday(day);
                const isFuture = isFutureDate(day);
                const activityLevel = isCurrentMonthDay ? getActivityLevel(day) : 0;
                const isZero = isCurrentMonthDay && !isFuture && activityLevel === 0;

                return (
                  <div
                    key={index}
                    onClick={() => handleDateClick(day)}
                    className={`
                      relative p-4 rounded-lg transition-all h-16 flex items-center justify-center
                      ${isCurrentMonthDay && !isFuture
                        ? `${getActivityColor(activityLevel, isZero)} hover:ring-2 hover:ring-gray-400 cursor-pointer` 
                        : 'bg-gray-800 opacity-30'
                      }
                      ${isTodayDay && !isZero
                        ? 'border-2 border-green-400' 
                        : ''
                      }
                      ${isFuture && isCurrentMonthDay
                        ? 'cursor-not-allowed opacity-50'
                        : ''
                      }
                    `}
                  >
                    <span className={`text-sm font-medium ${
                      isCurrentMonthDay 
                        ? 'text-white'
                        : 'text-gray-600'
                    }`}>
                      {day.getDate()}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-700">
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <span>Less</span>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-sm bg-[#0d1117]" />
                  <div className="w-3 h-3 rounded-sm bg-[#1e3a5f]" />
                  <div className="w-3 h-3 rounded-sm bg-[#2563eb]" />
                  <div className="w-3 h-3 rounded-sm bg-[#3b82f6]" />
                  <div className="w-3 h-3 rounded-sm bg-[#60a5fa]" />
                </div>
                <span>More</span>
              </div>
              
              <div className="text-xs text-gray-400">
                Journaling activity
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Click on any past or present date to view or add journal entries
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;