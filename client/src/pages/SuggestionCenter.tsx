import React, { useState } from 'react';
import { 
  BookOpen, 
  TrendingUp, 
  Copy, 
  Edit3, 
  ExternalLink,
  RefreshCw,
  Filter
} from 'lucide-react';

function SuggestionCenter() {
  const [activeTab, setActiveTab] = useState<'journal' | 'trends'>('journal');

  const journalSuggestions = [
    {
      id: 1,
      content: "🚀 Just made a breakthrough on our user authentication system! Sometimes the best solutions come from stepping back and approaching the problem differently. What's your go-to strategy when you're stuck? #webdev #problemsolving",
      source: "Journal entry from Jan 15",
      engagement: "High",
      tags: ["webdev", "problemsolving"]
    },
    {
      id: 2,
      content: "Authentication flows: harder to get right than they should be, but so satisfying when they finally click ⚡ Spent the morning debugging OAuth and learned 3 new things about security in the process. #coding #learning",
      source: "Journal entry from Jan 15",
      engagement: "Medium",
      tags: ["coding", "learning"]
    },
    {
      id: 3,
      content: "That feeling when your code finally works after hours of debugging 🎯 Today's win: seamless user auth flow. Tomorrow's challenge: making it even better. The grind never stops! #developer #startup",
      source: "Journal entry from Jan 15",
      engagement: "High",
      tags: ["developer", "startup"]
    }
  ];

  const trendSuggestions = [
    {
      id: 4,
      content: "GitHub Copilot just announced new features for 2024 🤖 The AI coding revolution is accelerating faster than we imagined. Are you using AI tools in your development workflow? What's been your experience? #AI #coding #github",
      source: "GitHub trending",
      engagement: "Very High",
      tags: ["AI", "coding", "github"]
    },
    {
      id: 5,
      content: "Interesting discussion on Hacker News about the future of web frameworks 🌐 React, Vue, Svelte - the landscape keeps evolving. What matters most: developer experience or performance? Thoughts? #webdev #frameworks",
      source: "Hacker News trending",
      engagement: "High",
      tags: ["webdev", "frameworks"]
    },
    {
      id: 6,
      content: "Product Hunt's top launch today is an AI-powered design tool 🎨 It's fascinating how AI is transforming every aspect of product development. Are we heading towards a future where everyone can be a designer? #ProductHunt #AI #design",
      source: "Product Hunt trending",
      engagement: "Medium",
      tags: ["ProductHunt", "AI", "design"]
    }
  ];

  const currentSuggestions = activeTab === 'journal' ? journalSuggestions : trendSuggestions;

  const getEngagementColor = (engagement: string) => {
    switch (engagement) {
      case 'Very High':
        return 'bg-green-100 text-green-800';
      case 'High':
        return 'bg-blue-100 text-blue-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Suggestion Center</h1>
        <p className="text-gray-600">
          AI-generated content ideas from your journal entries and trending topics.
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('journal')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'journal'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>From My Journal</span>
                <span className="bg-blue-100 text-blue-800 py-0.5 px-2 rounded-full text-xs">
                  {journalSuggestions.length}
                </span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('trends')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'trends'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>From Tech Trends</span>
                <span className="bg-green-100 text-green-800 py-0.5 px-2 rounded-full text-xs">
                  {trendSuggestions.length}
                </span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2 text-sm">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>All engagement levels</option>
            <option>Very High</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 text-sm">
          <RefreshCw className="w-4 h-4" />
          <span>Refresh Suggestions</span>
        </button>
      </div>

      {/* Suggestions Grid */}
      <div className="space-y-4">
        {currentSuggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="bg-white rounded-lg border border-gray-200 hover:border-blue-200 transition-colors"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-xs text-gray-500">{suggestion.source}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEngagementColor(suggestion.engagement)}`}>
                    {suggestion.engagement} engagement
                  </span>
                </div>
                <div className="flex space-x-2">
                  {suggestion.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <p className="text-gray-800 leading-relaxed mb-6">
                {suggestion.content}
              </p>

              {/* Actions */}
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <button className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center space-x-1">
                    <Edit3 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                  <button className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center space-x-1">
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                    Schedule
                  </button>
                  <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-1">
                    <ExternalLink className="w-3 h-3" />
                    <span>Post to X</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (if no suggestions) */}
      {currentSuggestions.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {activeTab === 'journal' ? (
              <BookOpen className="w-8 h-8 text-gray-400" />
            ) : (
              <TrendingUp className="w-8 h-8 text-gray-400" />
            )}
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No suggestions available
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            {activeTab === 'journal' 
              ? "Write your first journal entry to get AI-generated tweet suggestions based on your thoughts and experiences."
              : "We're currently fetching the latest tech trends. Check back in a few minutes for fresh content ideas."
            }
          </p>
        </div>
      )}
    </div>
  );
}

export default SuggestionCenter;