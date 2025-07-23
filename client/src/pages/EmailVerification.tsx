import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import icon from '../assets/icon.png';
import useEmailVerification from '../hooks/useEmailVerification';

function EmailVerification() {
  const {
    code,
    setCode,
    handleSubmit,
    handleResend,
    error,
    success,
    loading,
    email,
    canResend,
    resendLoading,
    countdown
  } = useEmailVerification();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="px-6 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Link 
            to="/" 
            className="flex items-center space-x-2 group hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center">
                <img src={icon} alt="Logo" className="w-12 h-12" />
              </div>
              <span className="text-xl font-black text-cyan-600 font-mono">
                JournalToTweet
              </span>
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)] px-6">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-cyan-400 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-black" />
              </div>
            </div>
            <h1 className="text-2xl font-black mb-2 text-cyan-400">Verify Your Email</h1>
            <p className="text-gray-400 font-mono mb-6">
              We sent a verification code to your email address.<br />
              {/* Please enter the code below to verify your account. */}
            </p>
            {error && (
              <div className="mb-4 text-red-400 bg-red-900 bg-opacity-30 border border-red-700 rounded-lg px-4 py-2 text-center font-mono text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 text-green-400 bg-green-900 bg-opacity-30 border border-green-700 rounded-lg px-4 py-2 text-center font-mono text-sm">
                {success}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4 mb-4">
              <input
                type="email"
                name="email"
                value={email}
                disabled
                className="w-full pl-4 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed font-mono text-center text-base mb-2"
                placeholder="Email Address"
              />
              <input
                type="text"
                name="code"
                value={code}
                onChange={e => setCode(e.target.value)}
                placeholder="Enter verification code"
                className="w-full pl-4 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors placeholder-gray-400 text-white text-center text-lg tracking-widest font-mono"
                required
                maxLength={8}
                autoFocus
              />
              <button
                type="submit"
                className="w-full py-3 bg-cyan-600 rounded font-bold text-lg hover:scale-105 transition-transform duration-300"
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify Code'}
              </button>
            </form>
            {/* <button
              className="w-full py-3 bg-gray-700 rounded font-bold text-lg hover:scale-105 transition-transform duration-300 mb-4"
              onClick={handleResend}
              disabled={loading}
            >
              {loading ? 'Resending...' : 'Resend Verification Email'}
            </button> */}
            <div className="text-gray-500 text-sm mt-2">
              Didn&apos;t receive the email? Check your spam folder or{' '}
              <span
                className={`text-cyan-400 cursor-pointer ${!canResend || resendLoading ? 'opacity-50 pointer-events-none' : ''}`}
                onClick={canResend && !resendLoading ? handleResend : undefined}
              >
                {resendLoading
                  ? 'Resending...'
                  : canResend
                    ? 'resend'
                    : `resend (${countdown}s)`}
              </span>.
            </div>
            <div className="mt-6">
              <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors">
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailVerification; 