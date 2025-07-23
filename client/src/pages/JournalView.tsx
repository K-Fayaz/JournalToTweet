import { 
  ArrowLeft, 
  Calendar as CalendarIcon, 
  Clock, 
  Plus,
  Send,
  Settings,
  Twitter,
  MoreVertical,
  Edit2,
  Trash2,
  TreePineIcon,
  X,
  Check,
} from 'lucide-react';
import useJournal from '../hooks/useJournal';
import icon from '../assets/icon.png';
import { LogOut } from 'lucide-react';

function JournalView() {
  
  const {
    navigate,
    selectedDate,
    setMenuOpenId,
    setJournalEntry,
    setEditContent,
    journalEntry,
    menuOpenId,
    editId,
    editContent,
    isToday,
    handleJournalSubmit,
    journals,
    handleEdit,
    handleEditSave,
    handleEditCancel,
    handleDelete
  } = useJournal();

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
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors"
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
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate('/journal')}
                  className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-600 group"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-300 group-hover:-translate-x-1 transition-transform" />
                </button>
                
                <div>
                  <h1 className="text-3xl font-bold text-white">
                    {selectedDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </h1>
                  <p className="text-gray-400 text-sm mt-1">
                    {isToday() ? 'Today' : `${journals.length} journal ${journals.length === 1 ? 'entry' : 'entries'}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Journal Timeline */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-8">
              <div className="max-w-3xl">
                {/* Journal Entries */}
                {journals.length > 0 && (
                  <div className="space-y-8 mb-8">
                    {journals.map((journal, index, array) => (
                      <div key={journal._id} className="relative group">
                        {/* Timeline dot and connecting line */}
                        <div className="absolute left-0 top-0 flex flex-col items-center">
                          <div className="w-4 h-4 bg-cyan-400 rounded-full border-4 border-gray-900 shadow-lg z-10"></div>
                          {index < array.length - 1 && (
                            <div className="w-0.5 h-24 bg-gradient-to-b from-cyan-400 to-gray-600 mt-2"></div>
                          )}
                        </div>

                        {/* Journal content */}
                        <div className="ml-8">
                          <div className="flex items-center space-x-2 mb-3">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-400 font-mono">{journal.time}</span>
                          </div>
                          <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 hover:border-gray-500 transition-colors shadow-lg relative">
                            {/* Three dots menu inside card */}
                            <div className="absolute top-3 right-3 z-20">
                              <button
                                type="button"
                                className="p-1 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                onClick={() => setMenuOpenId(menuOpenId === journal._id ? null : journal._id)}
                              >
                                <MoreVertical className="w-5 h-5 text-gray-400" />
                              </button>
                              {menuOpenId === journal._id && (
                                <div className="absolute right-0 mt-2 w-32 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-30">
                                  <button
                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 rounded-t-lg"
                                    onClick={() => handleEdit(journal)}
                                  >
                                    <Edit2 className="w-4 h-4 mr-2" /> Edit
                                  </button>
                                  <button
                                    className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-700 rounded-b-lg"
                                    onClick={() => handleDelete(journal)}
                                  >
                                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                                  </button>
                                </div>
                              )}
                            </div>
                            {editId === journal._id ? (
                              <div>
                                <textarea
                                  className="w-full h-24 p-3 bg-gray-900 border border-gray-700 rounded-lg text-white mb-2 focus:ring-2 focus:ring-cyan-400"
                                  value={editContent}
                                  onChange={e => setEditContent(e.target.value)}
                                  autoFocus
                                />
                                <div className="flex justify-end space-x-2">
                                  <button
                                    className="flex items-center px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                                    onClick={() => handleEditSave(journal)}
                                    disabled={!editContent.trim()}
                                  >
                                    <Check className="w-4 h-4 mr-1" /> Save
                                  </button>
                                  <button
                                    className="flex items-center px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                                    onClick={handleEditCancel}
                                  >
                                    <X className="w-4 h-4 mr-1" /> Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <p className="text-gray-200 leading-relaxed">
                                {journal.content}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Empty state for today with no entries */}
                {journals.length === 0 && (
                  <div className="text-center py-8 mb-8">
                    {
                      isToday() ? <div>
                        <h3 className="text-lg font-medium text-white mb-2">Start your journal for today</h3>
                        <p className="text-gray-400 text-sm">
                          Document your thoughts, progress, and insights.
                        </p>
                      </div> : <div>
                        <h3 className="text-lg font-medium text-white mb-2">No journal entries</h3>
                        <p className="text-gray-400 text-sm">
                          You didn't write any journal entries on this date.
                        </p>
                      </div>
                    }
                  </div>
                )}

                

                {/* Add new entry for today - ALWAYS SHOW THIS FOR TODAY */}
                {isToday() && (
                  <div className="relative">
                    {/* Timeline dot with connecting line from previous entry */}
                    <div className="absolute left-0 top-0 flex flex-col items-center">
                      {journals.length > 0 && (
                        <div className="w-0.5 h-8 bg-gradient-to-b from-gray-600 to-pink-400 -mt-8"></div>
                      )}
                      <div className="w-4 h-4 bg-pink-400 rounded-full border-4 border-gray-900 shadow-lg z-10"></div>
                    </div>
                    
                    <div className="ml-8">
                      <div className="flex items-center space-x-2 mb-4">
                        <Plus className="w-4 h-4 text-pink-400" />
                        <span className="text-sm text-pink-400 font-medium">Add new entry</span>
                        <span className="text-xs text-gray-500 font-mono">
                          {new Date().toLocaleTimeString('en-US', { 
                            hour: '2-digit', 
                            minute: '2-digit',
                            hour12: true 
                          })}
                        </span>
                      </div>
                      
                      <form onSubmit={handleJournalSubmit} className="space-y-4">
                        <textarea
                          value={journalEntry}
                          onChange={(e) => setJournalEntry(e.target.value)}
                          placeholder="What's on your mind? Share your thoughts, progress, challenges, or insights from today..."
                          className="w-full h-40 p-6 bg-gray-800 border border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white placeholder-gray-400 leading-relaxed"
                        />
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500 font-mono">
                            {journalEntry.length} characters
                          </span>
                          <button
                            type="submit"
                            disabled={!journalEntry.trim()}
                            className="flex items-center space-x-2 px-6 py-3 bg-cyan-600 rounded font-medium hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                          >
                            <Send className="w-4 h-4" />
                            <span>Save Entry</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JournalView;