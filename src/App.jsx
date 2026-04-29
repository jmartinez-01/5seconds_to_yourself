import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MobileLayout from './components/layout/MobileLayout';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import Mentors from './pages/Mentors';
import Chat from './pages/Chat';
import Progress from './pages/Progress';
import Profile from './pages/Profile';
import SessionPlayer from './pages/SessionPlayer';
import useAppStore from './store/useAppStore';

function App() {
  const { user } = useAppStore();

  return (
    <Router>
      <MobileLayout>
        <Routes>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/" element={user ? <Home /> : <Navigate to="/onboarding" />} />
          <Route path="/mentors" element={user ? <Mentors /> : <Navigate to="/onboarding" />} />
          <Route path="/chat" element={user ? <Chat /> : <Navigate to="/onboarding" />} />
          <Route path="/progress" element={user ? <Progress /> : <Navigate to="/onboarding" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/onboarding" />} />
          <Route path="/session" element={user ? <SessionPlayer /> : <Navigate to="/onboarding" />} />
        </Routes>
      </MobileLayout>
    </Router>
  );
}

export default App;
