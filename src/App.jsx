import { useEffect, useState } from 'react';
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
import { supabase } from './lib/supabase';

function App() {
  const { user, setUser } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // Fetch profile to get name
        supabase.from('profiles').select('*').eq('id', session.user.id).single()
          .then(({ data }) => {
            setUser({ ...session.user, ...data });
            setLoading(false);
          });
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    // Listen for changes on auth state (sign in, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        supabase.from('profiles').select('*').eq('id', session.user.id).single()
          .then(({ data }) => {
            setUser({ ...session.user, ...data });
          });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  if (loading) {
    return (
      <div style={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--pbg)' }}>
        <div className="d-logo" style={{ fontSize: '24px', color: 'var(--ink)' }}>5 Seconds <span style={{ color: 'var(--tl)' }}>to Yourself</span></div>
      </div>
    );
  }

  return (
    <Router>
      <MobileLayout>
        <Routes>
          <Route path="/onboarding" element={!user ? <Onboarding /> : <Navigate to="/" />} />
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

