import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import JournalView from './pages/JournalView';
import Preferences from './pages/Preferences';
import TweetSuggestions from './pages/TweetSuggestions';
import PricingPage from './pages/PricingPage';
import NotFound from './pages/NotFound';
import EmailVerification from './pages/EmailVerification';
import Legals from './pages/Legals';
import ProtectedLanding from './components/ProtectedLanding';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedLanding />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/journal" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/journal/calendar/:date" element={
          <ProtectedRoute>
            <JournalView />
          </ProtectedRoute>
        } />
        <Route path="/preferences" element={
          <ProtectedRoute>
            <Preferences />
          </ProtectedRoute>
        } />
        <Route path="/tweet-suggestions" element={
          <ProtectedRoute>
            <TweetSuggestions />
          </ProtectedRoute>
        } />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/legals" element={<Legals />} />
        {/* <Route path="/garden" element={<Garden />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;