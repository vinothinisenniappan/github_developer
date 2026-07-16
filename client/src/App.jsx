import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedUsername, setSelectedUsername] = useState('');

  const handleSearch = (username) => {
    setSelectedUsername(username);
    setCurrentPage('dashboard');
  };

  const handleBackToHome = () => {
    setCurrentPage('landing');
    setSelectedUsername('');
  };

  return (
    <div className="min-h-screen bg-background">
      {currentPage === 'landing' ? (
        <LandingPage onSearch={handleSearch} />
      ) : (
        <DashboardPage
          username={selectedUsername}
          onBack={handleBackToHome}
        />
      )}
    </div>
  );
}
