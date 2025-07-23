import { MoreVertical, Trash2 } from 'lucide-react';
import { LogOut } from 'lucide-react';
import icon from '../assets/icon.png';

import { 
  Settings, 
  Calendar as CalendarIcon, 
  MessageSquare, 
  TrendingUp,
  Copy,
  Edit3,
  ExternalLink,
  RefreshCw,
  Clock,
  ChevronDown,
  Twitter,
  Hash,
  TreePineIcon,
  Check,
  Bot,
  Send,
  X
} from 'lucide-react';

import useTweetSuggestions from '../hooks/useTweetSuggestions';

interface TweetEntry {
  _id: string;
  time: string;
  content: string;
  starred?: boolean;
  liked?: boolean;
  date: String;
}

interface TweetsByTime {
  [key: string]: TweetEntry[];
}

function TweetSuggestions() {

  const {
    navigate,
      handleSaveEdit,
      handleCancelEdit,
      handleLoadPrevious,
      formatTimeSlot,
      previousTweetsByTime,
      currentTotalTweets,
      todayJournalTotal,
      todayTrendingTotal,
      handleDeleteTweet,
      setActiveTab,
      showPreviousDays,
      editingContent,
      editingTweetId,
      aiEditingTweetId,
      menuOpenId,
      setMenuOpenId,
      userTimeSlots,
      handleCopyTweet,
      handleEditTweet,
      handleAiEdit,
      handleAiEditSubmit,
      handleCancelAiEdit,
      setEditingContent,
      aiEditPrompt,
      activeTab,
      setAiEditPrompt,
      currentTweetsByTime,
      loadingPrevious
  } = useTweetSuggestions();

  const renderTweetsByTimeSlot = (tweetsByTime: TweetsByTime, isToday: boolean = true, dateLabel?: string) => {
    const timeSlots = Object.keys(tweetsByTime).sort();
    
    return timeSlots.map((timeSlot, idx) => {
      const tweets = tweetsByTime[timeSlot];
      if (!tweets || tweets.length === 0) return null;

      // For previous days, show date + time in the first separator
      let separatorLabel = '';
      if (!isToday && idx === 0 && dateLabel) {
        separatorLabel = `${dateLabel} • ${formatTimeSlot(timeSlot)}`;
      } else {
        separatorLabel = formatTimeSlot(timeSlot);
      }

      return (
        <div key={timeSlot} className="mb-12">
          {/* Time Slot Separator */}
          <div className="flex items-center mb-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-gray-600"></div>
            <div className="px-6 py-2 bg-gray-800 border border-gray-600 rounded-full">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-400 font-mono font-medium">
                  {separatorLabel}
                </span>
              </div>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-600 via-gray-600 to-transparent"></div>
          </div>

          {/* Tweets for this time slot */}
          <div className="space-y-6">
            {tweets.map((tweet: TweetEntry) => (
              <div key={tweet._id} className="bg-gray-900 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      {/* <span className="text-xs text-gray-400">Journal Entry</span>
                      {'date' in tweet && (
                        <>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500">{tweet.date}</span>
                        </>
                      )} */}
                    </div>
                    {/* Three-dot menu */}
                    {editingTweetId !== tweet._id && (
                      <div className="relative z-20">
                        <button
                          type="button"
                          className="p-1 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                          onClick={() => setMenuOpenId(menuOpenId === tweet._id ? null : tweet._id)}
                        >
                          <MoreVertical className="w-5 h-5 text-gray-400" />
                        </button>
                        {menuOpenId === tweet._id && (
                          <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-30">
                            <button
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 rounded-t-lg"
                              onClick={() => { handleEditTweet(tweet._id, tweet.content); setMenuOpenId(null); }}
                            >
                              <Edit3 className="w-4 h-4 mr-2" /> Edit
                            </button>
                            <button
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                              onClick={() => { handleCopyTweet(tweet.content, tweet._id); setMenuOpenId(null); }}
                            >
                              <Copy className="w-4 h-4 mr-2" /> Copy
                            </button>
                            <button
                              className="flex items-center w-full px-4 py-2 text-sm text-purple-400 hover:bg-gray-700 rounded-b-lg"
                              onClick={() => { handleAiEdit(tweet._id); setMenuOpenId(null); }}
                            >
                              <Bot className="w-4 h-4 mr-2" /> Edit with AI
                            </button>
                            <button
                              className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-700 rounded-b-lg"
                              onClick={() => handleDeleteTweet(tweet._id)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Tweet Content */}
                  <div className="mb-6">
                    <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
                      {editingTweetId === tweet._id ? (
                        <div className="space-y-4">
                          <textarea
                            value={editingContent}
                            onChange={(e) => setEditingContent(e.target.value)}
                            className="w-full h-32 p-3 bg-gray-700 border border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400 leading-relaxed"
                            placeholder="Edit your tweet..."
                          />
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={handleCancelEdit}
                              className="px-4 py-2 text-sm bg-gray-600 text-gray-300 rounded-md hover:bg-gray-500 transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSaveEdit(tweet._id)}
                              className="px-4 py-2 text-sm bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-colors"
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-white leading-relaxed whitespace-pre-line">
                          {tweet.content}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* AI Edit Section */}
                  {aiEditingTweetId === tweet._id && (
                    <div className="mb-6 bg-gray-800 border border-purple-500/30 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <Bot className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-medium text-purple-400">Edit with AI</span>
                      </div>
                      <div className="space-y-3">
                        <textarea
                          value={aiEditPrompt}
                          onChange={(e) => setAiEditPrompt(e.target.value)}
                          placeholder="Tell AI how to modify this tweet... (e.g., 'Make it more casual', 'Add more technical details', 'Shorten it')"
                          className="w-full h-20 p-3 bg-gray-700 border border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 text-sm"
                        />
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={handleCancelAiEdit}
                            className="px-3 py-1.5 text-sm bg-gray-600 text-gray-300 rounded-md hover:bg-gray-500 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleAiEditSubmit(tweet._id)}
                            disabled={!aiEditPrompt.trim()}
                            className="px-3 py-1.5 text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center space-x-1"
                          >
                            <Send className="w-3 h-3" />
                            <span>Apply AI Edit</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex justify-between items-center">
                    {editingTweetId !== tweet._id && (
                      <div>
                        <a
                          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet.content)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1.5 text-sm bg-cyan-600 rounded hover:scale-105 transition-transform"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          <span>Post to X</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    });
  };

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
            
            <div className="flex items-center space-x-3 px-3 py-2.5 rounded-lg bg-pink-500/20 text-pink-400 border border-pink-500/30">
              <Twitter className="w-5 h-5" />
              <span className="font-medium">Tweet Suggestions</span>
            </div>
            
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

      {/* Main Content with left margin to account for fixed sidebar */}
      <div className="flex-1 ml-64 h-screen overflow-y-auto">
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Tweet Suggestions</h1>
              <p className="text-gray-400">
                AI-generated content based on your journal entries and trending topics
              </p>
            </div>

            {/* Tabs */}
            <div className="mb-8">
              <div className="border-b border-gray-700">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab('journal')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === 'journal'
                        ? 'border-cyan-500 text-cyan-400'
                        : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="w-4 h-4" />
                      <span>From My Journal</span>
                      <span className="bg-cyan-500/20 text-cyan-400 py-0.5 px-2 rounded-full text-xs border border-cyan-500/30">
                        {todayJournalTotal}
                      </span>
                    </div>
                  </button>
                </nav>
              </div>
            </div>

            {/* Time Slots Info */}
            <div className="mb-8 bg-gray-900 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-purple-400" />
                  <div>
                    <h3 className="text-sm font-medium text-white">Today's Schedule</h3>
                    <p className="text-xs text-gray-400">Tweets generated at your preferred times</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {userTimeSlots.map((time) => (
                    <span
                      key={time}
                      className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-mono border border-purple-500/30"
                    >
                      {time}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Today's Tweets by Time Slot */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                <span>Today's Suggestions</span>
                <span className="text-sm text-gray-400 font-normal">
                  ({currentTotalTweets} tweets)
                </span>
              </h2>
              {renderTweetsByTimeSlot(currentTweetsByTime, true)}
            </div>

            {/* Load Previous Days Button */}
            {!showPreviousDays && (
              <div className="text-center py-8 mb-8">
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-2">Load Previous Days</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    View tweet suggestions from previous days
                  </p>
                  <button
                    onClick={handleLoadPrevious}
                    className="flex items-center space-x-2 px-6 py-3 bg-gray-800 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors mx-auto"
                    disabled={loadingPrevious}
                  >
                    <ChevronDown className="w-4 h-4" />
                    <span>{loadingPrevious ? 'Loading...' : 'Load Previous Suggestions'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Previous Days Tweets */}
            {showPreviousDays && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                  <span>Previous Days</span>
                  <span className="text-sm text-gray-400 font-normal">
                    (Historical suggestions)
                  </span>
                </h2>
                {loadingPrevious && (
                  <div className="text-center text-gray-400 mb-4">Loading...</div>
                )}
                {(!previousTweetsByTime || previousTweetsByTime.length === 0) && !loadingPrevious ? (
                  <div className="text-center text-gray-500">No previous tweets loaded yet.</div>
                ) : (
                  <>
                    {Array.isArray(previousTweetsByTime) ? previousTweetsByTime.map((day: { date: string, tweetsByTime: any }) => (
                      <div key={day.date} className="mb-12">
                        {/* Date label removed, handled in separator */}
                        {renderTweetsByTimeSlot(day.tweetsByTime, false, day.date)}
                      </div>
                    )) : null}
                    {/* Button to load more previous days */}
                    <div className="text-center mt-6">
                      <button
                        onClick={handleLoadPrevious}
                        className="flex items-center space-x-2 px-6 py-3 bg-gray-800 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors mx-auto"
                        disabled={loadingPrevious}
                      >
                        <ChevronDown className="w-4 h-4" />
                        <span>{loadingPrevious ? 'Loading...' : 'Load More Previous Suggestions'}</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Refresh Button */}
            {/* <div className="text-center py-4">
              <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:scale-105 transition-transform mx-auto">
                <RefreshCw className="w-4 h-4" />
                <span>Generate New Suggestions</span>
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TweetSuggestions;