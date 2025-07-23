import React, { useState } from 'react';
import { 
  Clock, 
  Mail, 
  Twitter, 
  Bell, 
  User, 
  Shield, 
  Palette,
  Trash2,
  ExternalLink,
  Check
} from 'lucide-react';

function Settings() {
  const [selectedTimes, setSelectedTimes] = useState(['10:00', '17:00']);
  const [emailFrequency, setEmailFrequency] = useState('daily');
  const [twitterConnected, setTwitterConnected] = useState(false);
  const [theme, setTheme] = useState('light');

  const timeSlots = [
    '08:00', '10:00', '13:30', '15:00', '17:00', '19:00', '20:00', '22:00'
  ];

  const toggleTimeSlot = (time: string) => {
    setSelectedTimes(prev => 
      prev.includes(time) 
        ? prev.filter(t => t !== time)
        : [...prev, time]
    );
  };

  const handleConnectTwitter = () => {
    // Simulate Twitter OAuth flow
    setTwitterConnected(true);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">
          Customize your JournalFlow experience and manage your preferences.
        </p>
      </div>

      <div className="space-y-8">
        {/* Notification Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Clock className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Daily Send Times</h2>
          </div>
          
          <p className="text-gray-600 mb-4">
            Choose when you'd like to receive your AI-generated tweet suggestions via email.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => toggleTimeSlot(time)}
                className={`p-3 rounded-lg border text-center transition-colors ${
                  selectedTimes.includes(time)
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {time}
                {selectedTimes.includes(time) && (
                  <Check className="w-4 h-4 mx-auto mt-1" />
                )}
              </button>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              Selected times: {selectedTimes.join(', ')} 
              {selectedTimes.length === 0 && 'None selected'}
            </p>
          </div>
        </div>

        {/* Email Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Mail className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Email Preferences</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Frequency
              </label>
              <select
                value={emailFrequency}
                onChange={(e) => setEmailFrequency(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="daily">Daily</option>
                <option value="weekdays">Weekdays only</option>
                <option value="weekly">Weekly summary</option>
                <option value="never">Never</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Newsletter</h3>
                <p className="text-sm text-gray-600">Receive weekly tips and product updates</p>
              </div>
              <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-blue-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Twitter Integration */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Twitter className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">X (Twitter) Integration</h2>
          </div>
          
          {twitterConnected ? (
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Connected to @yourusername</p>
                  <p className="text-xs text-gray-600">You can now post directly to X from JournalFlow</p>
                </div>
              </div>
              <button className="px-3 py-1 text-sm text-red-600 border border-red-300 rounded-md hover:bg-red-50 transition-colors">
                Disconnect
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Connect your X account</p>
                <p className="text-xs text-gray-600">Enable direct posting and better content suggestions</p>
              </div>
              <button
                onClick={handleConnectTwitter}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Twitter className="w-4 h-4" />
                <span>Connect</span>
              </button>
            </div>
          )}
        </div>

        {/* Appearance */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Palette className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Appearance</h2>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Theme</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setTheme('light')}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  theme === 'light'
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="font-medium">Light</div>
                <div className="text-xs text-gray-600">Default light theme</div>
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  theme === 'dark'
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="font-medium">Dark</div>
                <div className="text-xs text-gray-600">Dark theme (coming soon)</div>
              </button>
            </div>
          </div>
        </div>

        {/* Account */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <User className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Account</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value="user@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                disabled
              />
            </div>
            
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Change Password
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Export Data
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white border border-red-200 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Trash2 className="w-5 h-5 text-red-600" />
            <h2 className="text-lg font-semibold text-red-900">Danger Zone</h2>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="text-sm font-medium text-red-900 mb-1">Delete Account</h3>
              <p className="text-sm text-red-700 mb-3">
                This will permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;