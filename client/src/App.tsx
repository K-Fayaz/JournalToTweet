import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import JournalView from './pages/JournalView';
import Preferences from './pages/Preferences';
import TweetSuggestions from './pages/TweetSuggestions';
import PricingPage from './pages/PricingPage';
import NotFound from './pages/NotFound';
import EmailVerification from './pages/EmailVerification';
import Legals from './pages/Legals';
// import Garden from './pages/Garden';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/journal" element={<Dashboard />} />
        <Route path="/journal/calendar/:date" element={<JournalView />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/tweet-suggestions" element={<TweetSuggestions />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/legals" element={<Legals />} />
        {/* <Route path="/garden" element={<Garden />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;