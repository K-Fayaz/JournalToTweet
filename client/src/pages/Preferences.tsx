
import { 
  Settings, 
  Calendar as CalendarIcon, 
  MessageSquare, 
  Clock, 
  Palette,
  Save,
  RotateCcw,
  Twitter,
  Lock,
  LogOut,
  TreePineIcon,
  Menu,
  X
} from 'lucide-react';
import usePreference from '../hooks/usePreference';
import icon from '../assets/icon.png';
import { useState } from 'react';


function Preferences() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    navigate,
    isTimeSlotInPast,
    handleReset,
    handleSave,
    handleTimeSlotToggle,
    handleToneToggle,
    availableTones,
    selectedTimeSlots,
    selectedTones,
    lockedTimeSlots,
    isSaving,
  } = usePreference();

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar Toggle Button - Only visible on mobile */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 left-4 z-50 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-600 lg:hidden"
        aria-label="Open sidebar"
      >
        <Menu className="w-5 h-5 text-gray-400" />
      </button>

      {/* Desktop Sidebar - Always visible on lg screens and above */}
      <div className="hidden lg:flex lg:w-70 lg:flex-col lg:fixed lg:inset-y-0 lg:z-50">
        <div className="flex-1 flex flex-col min-h-0 bg-gray-900 border-r border-gray-700">
          <div className="p-6 flex-1">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center">
                  <img src={icon} alt="Logo" className="w-12 h-12" />
                </div>
                <span className="text-xl font-black text-cyan-600 font-mono ml-3">
                  JournalToTweet
                </span>
              </div>
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
              
              <div className="flex items-center space-x-3 px-3 py-2.5 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
                <Settings className="w-5 h-5" />
                <span className="font-medium">Preferences</span>
              </div>

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
      </div>

      {/* Mobile Overlay Sidebar */}
      {sidebarOpen && (
        <>
          {/* Sidebar */}
          <div className="fixed left-0 top-0 h-full w-70 bg-gray-900 border-r border-gray-700 z-50 flex flex-col lg:hidden">
            <div className="p-6 flex-1">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center">
                    <img src={icon} alt="Logo" className="w-12 h-12" />
                  </div>
                  <span className="text-xl font-black text-cyan-600 font-mono ml-3">
                    JournalToTweet
                  </span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  aria-label="Close sidebar"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
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
                
                <div className="flex items-center space-x-3 px-3 py-2.5 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  <Settings className="w-5 h-5" />
                  <span className="font-medium">Preferences</span>
                </div>

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
        </>
      )}

      {/* Main Content - Full width on mobile, offset on desktop */}
      <div className="flex-1 h-screen overflow-y-auto lg:ml-70">
        <div className="p-4 lg:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mt-5 lg:mt-0 text-center lg:text-start mb-6 lg:mb-8">
              <h1 className="text-lg lg:text-3xl font-bold text-white mb-2">Preferences</h1>
              <p className="text-xs lg:text-base text-gray-400">
                Customize how AI generates tweets from your journal entries
              </p>
            </div>

            <div className="space-y-6 lg:space-y-8">
              {/* Custom Prompt Section */}
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 lg:p-8">
                {/* Tone Selection */}
                <div className="mb-4 lg:mb-6">
                  <h3 className="text-base lg:text-lg font-semibold text-white mb-3 lg:mb-4">Select Your Tone</h3>
                  <p className="text-xs lg:text-sm text-gray-400 mb-3 lg:mb-4">Choose multiple tones that reflect your personality</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-3">
                    {availableTones.map((tone) => (
                      <button
                        key={tone.id}
                        onClick={() => handleToneToggle(tone.id)}
                        className={`
                          relative px-3 lg:px-4 py-2 lg:py-3 rounded-lg border-2 transition-all duration-200 font-medium text-xs lg:text-sm
                          ${selectedTones.includes(tone.id)
                            ? `${tone.color} border-white text-white shadow-lg scale-105`
                            : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-750'
                          }
                        `}
                      >
                        <span className="relative z-10">{tone.label}</span>
                        {selectedTones.includes(tone.id) && (
                          <div className="absolute inset-0 bg-white/20 rounded-lg"></div>
                        )}
                      </button>
                    ))}
                  </div>
                  
                  <div className="mt-2 lg:mt-3 text-xs text-gray-500">
                    Selected: {selectedTones.length > 0 ? selectedTones.join(', ') : 'None'}
                  </div>
                </div>

                {/* Custom Prompt Textarea */}
                {/* <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Custom Instructions</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Provide detailed instructions on how you want the AI to generate tweets from your journal entries
                  </p>
                  
                  <textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="Describe your preferred writing style, tone, and any specific requirements..."
                    className="w-full h-40 p-4 bg-gray-800 border border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400 leading-relaxed"
                  />
                  
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-gray-500 font-mono">
                      {customPrompt.length} characters
                    </span>
                    <div className="text-xs text-gray-500">
                      💡 Tip: Be specific about your style, audience, and preferred hashtags
                    </div>
                  </div>
                </div> */}
              </div>

              {/* Time Slots Section */}
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 lg:p-8">
                <div className="flex items-center space-x-3 mb-4 lg:mb-6">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-cyan-600 rounded flex items-center justify-center">
                    <Clock className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg lg:text-xl font-bold text-white">Tweet Generation Schedule</h2>
                    <p className="text-xs lg:text-sm text-gray-400">Choose when to automatically generate tweets from your journal</p>
                  </div>
                </div>

                <div className="mb-4 lg:mb-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-3 lg:mb-4 space-y-2 lg:space-y-0">
                    <h3 className="text-base lg:text-lg font-semibold text-white">Select Time Slots</h3>
                    <div className="text-xs lg:text-sm text-gray-400">
                      {selectedTimeSlots.length}/5 selected
                    </div>
                  </div>
                  
                  <p className="text-xs lg:text-sm text-gray-400 mb-4 lg:mb-6">
                    Choose up to 5 times per day when the AI will analyze your journal entries and generate tweet suggestions.
                    Time slots that have already passed today are locked and cannot be modified.
                  </p>

                  {lockedTimeSlots.length > 0 && (
                    <div className="mb-3 lg:mb-4 p-3 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Lock className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-400" />
                        <span className="text-yellow-400 text-xs lg:text-sm font-medium">
                          Locked time slots for today: {lockedTimeSlots.join(', ')}
                        </span>
                      </div>
                      <p className="text-yellow-300 text-xs mt-1">
                        These slots have already passed and cannot be modified until tomorrow. But you can modify remaining slots.
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2 lg:gap-3">
                    {[
                      '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
                      '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
                      '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
                    ].map((timeSlot) => {
                      const isSelected = selectedTimeSlots.includes(timeSlot);
                      const isLocked = lockedTimeSlots.includes(timeSlot);
                      // Disable if: (not selected) and (locked or in the past or already at max)
                      const isPast = isTimeSlotInPast(timeSlot);
                      const isDisabled = (
                        (!isSelected && (selectedTimeSlots.length >= 5 || isLocked || isPast)) ||
                        isLocked
                      );
                      
                      return (
                        <button
                          key={timeSlot}
                          onClick={() => handleTimeSlotToggle(timeSlot)}
                          disabled={isDisabled}
                          className={`
                            relative px-2 lg:px-4 py-2 lg:py-3 rounded-lg border-2 transition-all duration-200 font-mono text-xs lg:text-sm font-medium
                            ${
                              isSelected && isLocked
                                ? 'bg-gradient-to-r from-cyan-500/40 to-pink-500/40 border-white text-white cursor-not-allowed opacity-80'
                                : isSelected
                                  ? 'bg-gradient-to-r from-cyan-500 to-pink-500 border-white text-white shadow-lg scale-105'
                                  : isLocked
                                    ? 'bg-gray-900 border-gray-700 text-gray-500 cursor-not-allowed opacity-60'
                                    : isDisabled
                                      ? 'bg-gray-800 border-gray-700 text-gray-600 cursor-not-allowed opacity-50'
                                      : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-750 hover:scale-105'
                            }
                          `}
                        >
                          {timeSlot}
                          {isLocked && (
                            <Lock className="absolute top-0.5 right-0.5 lg:top-1 lg:right-1 w-2 h-2 lg:w-3 lg:h-3 text-pink-500/40" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {selectedTimeSlots.length > 0 && (
                    <div className="mt-4 lg:mt-6 p-3 lg:p-4 bg-gray-800 border border-gray-600 rounded-lg">
                      <h4 className="text-xs lg:text-sm font-medium text-white mb-2">Your Schedule:</h4>
                      <div className="flex flex-wrap gap-1 lg:gap-2">
                        {selectedTimeSlots.map((time) => {
                          const isLocked = lockedTimeSlots.includes(time);
                          return (
                            <span
                              key={time}
                              className={`px-2 lg:px-3 py-1 rounded-full text-xs font-mono flex items-center space-x-1 ${
                                isLocked 
                                  ? 'bg-gray-600 text-gray-300' 
                                  : 'bg-gradient-to-r from-cyan-500 to-pink-500 text-white'
                              }`}
                            >
                              <span>{time}</span>
                              {isLocked && <Lock className="w-2 h-2 lg:w-3 lg:h-3" />}
                            </span>
                          );
                        })}
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        AI will generate tweet suggestions at these times based on your journal entries from that day
                      </p>
                      {lockedTimeSlots.length > 0 && (
                        <p className="text-xs text-yellow-400 mt-2">
                          ⚠️ Locked slots (with 🔒) cannot be modified until tomorrow
                        </p>
                      )}
                    </div>
                  )}

                  {selectedTimeSlots.length === 0 && (
                    <div className="mt-4 lg:mt-6 p-3 lg:p-4 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
                      <p className="text-yellow-400 text-xs lg:text-sm">
                        ⚠️ No time slots selected. Choose at least one time to enable automatic tweet generation.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-3 lg:space-y-0">
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center lg:justify-start space-x-2 px-4 lg:px-6 py-2 lg:py-3 bg-gray-800 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm lg:text-base"
                >
                  <RotateCcw className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span>Reset to Defaults</span>
                </button>

                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center justify-center space-x-2 px-6 lg:px-8 py-2 lg:py-3 bg-cyan-600 text-white rounded font-medium hover:scale-105 transition-transform shadow-lg text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSaving ? (
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <Save className="w-3 h-3 lg:w-4 lg:h-4" />
                  )}
                  <span>{isSaving ? 'Saving...' : 'Save Preferences'}</span>
                </button>
              </div>

              {/* Preview Section */}
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 lg:p-6">
                <h3 className="text-base lg:text-lg font-semibold text-white mb-3 lg:mb-4 flex items-center space-x-2">
                  <Palette className="w-4 h-4 lg:w-5 lg:h-5 text-purple-400" />
                  <span>Preview</span>
                </h3>
                
                <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 lg:p-4">
                  <p className="text-gray-300 text-xs lg:text-sm leading-relaxed">
                    <span className="text-cyan-400 font-medium">Selected Tones:</span> {selectedTones.join(', ') || 'None'}<br />
                    <span className="text-pink-400 font-medium">Schedule:</span> {selectedTimeSlots.length > 0 ? `${selectedTimeSlots.length} times daily (${selectedTimeSlots.join(', ')})` : 'Not configured'}<br />
                    {/* <span className="text-purple-400 font-medium">Custom Instructions:</span> {customPrompt.length > 0 ? `${customPrompt.length} characters` : 'None'} */}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preferences;