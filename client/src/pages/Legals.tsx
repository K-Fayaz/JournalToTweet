import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoIcon from '../assets/icon.png';

const TABS = [
  { label: 'Terms of Service', key: 'terms', ref: 'terms-of-service' },
  { label: 'Privacy Policy', key: 'privacy', ref: 'privacy-policy' },
];

function getTabKeyFromQuery(search: string) {
  const params = new URLSearchParams(search);
  const ref = params.get('ref');
  if (ref === 'privacy-policy') return 'privacy';
  if (ref === 'terms-of-service') return 'terms';
  return 'terms';
}

function Legals() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('terms');

  useEffect(() => {
    setActiveTab(getTabKeyFromQuery(location.search));
  }, [location.search]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start py-0 px-4">
      {/* Header */}
      <header className="w-full flex items-center justify-between py-6 px-2 max-w-3xl mx-auto">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="relative w-9 h-9 flex items-center justify-center">
            <img
              src={logoIcon}
              alt="Logo"
              className="absolute w-10 h-10 left-1 top-1/2 -translate-y-1/2 opacity-80 pointer-events-none"
              style={{ zIndex: 0 }}
            />
          </div>
          <span className="text-lg font-black font-mono py-1 rounded text-cyan-600 text-white relative z-10 shadow-md">
            JournalToTweet
          </span>
        </Link>
        <Link to="/" className="text-cyan-400 hover:text-cyan-200 font-mono font-medium text-base transition-colors duration-200">
          Back to home
        </Link>
      </header>
      {/* Main Content */}
      <main className="flex flex-col items-center w-full flex-1">
        <h1 className="text-3xl font-bold mb-8 text-center tracking-tight">Legal Information</h1>
        <div className="flex border-b border-gray-700 mb-8 w-full max-w-3xl">
          {TABS.map(tab => (
            <button
              key={tab.key}
              className={`flex-1 px-4 py-2 text-lg font-medium transition-colors duration-200 focus:outline-none border-b-2 ${activeTab === tab.key ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-gray-400 hover:text-cyan-300'}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="w-full max-w-3xl bg-gray-900 rounded-lg shadow p-6 min-h-[200px]">
          {activeTab === 'terms' && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Terms of Service</h2>
              <p className="text-gray-300 mb-2 text-sm">Effective Date: 2023-07-23</p>
              <p className="mb-4">Welcome to JournalToTweet — a tool designed to help users turn daily journaling into tweet-worthy ideas. These Terms govern your access to and use of our platform. By using JournalToTweet, you agree to the following:</p>
              <ol className="list-decimal list-inside space-y-3 mb-4">
                <li>
                  <strong>What We Offer</strong>
                  <ul className="list-disc list-inside ml-5 mt-1 text-gray-300">
                    <li>Write journal entries.</li>
                    <li>Get AI-generated tweet suggestions based on those entries.</li>
                    <li>Organize and review past thoughts.</li>
                  </ul>
                </li>
                <li>
                  <strong>Your Content</strong>
                  <p className="mt-1 text-gray-300">You retain full ownership of the journals you write. We process them to generate tweet drafts but do not use them for any other purpose without your consent.</p>
                </li>
                <li>
                  <strong>Your Responsibilities</strong>
                  <ul className="list-disc list-inside ml-5 mt-1 text-gray-300">
                    <li>Abuse or exploit the service.</li>
                    <li>Post unlawful, offensive, or harmful content.</li>
                  </ul>
                </li>
                <li>
                  <strong>Intellectual Property</strong>
                  <p className="mt-1 text-gray-300">The JournalToTweet branding, platform UI, and underlying systems are owned by us. You may not reuse or redistribute without permission.</p>
                </li>
                <li>
                  <strong>Account Termination</strong>
                  <p className="mt-1 text-gray-300">You can stop using the service at any time. We reserve the right to suspend accounts that violate our terms.</p>
                </li>
                <li>
                  <strong>Disclaimers</strong>
                  <p className="mt-1 text-gray-300">This is an experimental tool. We don’t guarantee that the tweet suggestions will gain traction or engagement. Use at your own discretion.</p>
                </li>
                <li>
                  <strong>Future Features</strong>
                  <p className="mt-1 text-gray-300">We may add features like Twitter/X analytics, gamification, and growth tracking. When we do, these terms will be updated accordingly.</p>
                </li>
              </ol>
            </div>
          )}
          {activeTab === 'privacy' && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Privacy Policy</h2>
              <p className="text-gray-300 mb-2 text-sm">Effective Date: 2023-07-23</p>
              <p className="mb-4">We respect your privacy and are committed to keeping your data safe.</p>
              <ol className="list-decimal list-inside space-y-3 mb-4">
                <li>
                  <strong>What We Collect</strong>
                  <ul className="list-disc list-inside ml-5 mt-1 text-gray-300">
                    <li>Journal Entries: Only stored and processed to generate tweet suggestions.</li>
                    <li>Email Address: Collected for account management and communication.</li>
                    <li>Minimal Metadata: For performance and debugging (e.g., timestamps, session info).</li>
                    <li>No Twitter/X Data: We do not pull any social media data at this time.</li>
                  </ul>
                </li>
                <li>
                  <strong>What We Don’t Do</strong>
                  <ul className="list-disc list-inside ml-5 mt-1 text-gray-300">
                    <li>We do not track users across sites.</li>
                    <li>We do not use third-party ad networks or analytics tools.</li>
                    <li>We do not sell or share your data.</li>
                  </ul>
                </li>
                <li>
                  <strong>Your Rights</strong>
                  <ul className="list-disc list-inside ml-5 mt-1 text-gray-300">
                    <li>You can delete your data at any time.</li>
                    <li>You can request a copy of your journal content.</li>
                  </ul>
                </li>
                <li>
                  <strong>Future Considerations</strong>
                  <p className="mt-1 text-gray-300">We may integrate Twitter/X features, gamification, or analytics in the future. These will be opt-in and clearly documented before launch.</p>
                </li>
                {/* <li>
                  <strong>Data Security</strong>
                  <p className="mt-1 text-gray-300">We use encryption and standard security practices to keep your content safe.</p>
                </li> */}
              </ol>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Legals;