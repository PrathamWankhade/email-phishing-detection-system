import React from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Analytics from './pages/Analytics.jsx';
import About from './pages/About.jsx';

const sections = [
  { id: 'scan', Component: Home },
  { id: 'dashboard', Component: Dashboard },
  { id: 'analytics', Component: Analytics },
  { id: 'about', Component: About },
];

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main>
        {sections.map(({ id, Component }) => (
          <section key={id} id={id}>
            <Component />
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
}
