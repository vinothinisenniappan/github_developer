import React, { useState } from 'react';
import { Github, ArrowRight } from 'lucide-react';

export default function LandingPage({ onSearch }) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Please enter a GitHub username');
      return;
    }
    setError('');
    setLoading(true);
    // Simulate API check
    setTimeout(() => {
      setLoading(false);
      onSearch(username);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-surface flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3">
          <Github size={32} className="text-primary" />
          <h1 className="text-2xl font-bold">GitHub Developer Insights</h1>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-2xl">
          {/* Hero Content */}
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4">
              Analyze GitHub Developers
            </h2>
            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
              Get detailed insights into public GitHub profiles including repository statistics, language distribution, and contribution patterns.
            </p>
          </div>

          {/* Search Box */}
          <form onSubmit={handleSubmit} className="mb-12">
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter GitHub username"
                className="input flex-1"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {loading ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Searching...
                  </>
                ) : (
                  <>
                    Search
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
            {error && (
              <p className="text-red-600 text-sm font-medium">{error}</p>
            )}
          </form>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="card text-center">
              <div className="text-3xl font-bold text-primary mb-2">📊</div>
              <h3 className="font-semibold mb-1">Repository Stats</h3>
              <p className="text-sm text-text-secondary">
                Stars, forks, and activity metrics
              </p>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-primary mb-2">🗣️</div>
              <h3 className="font-semibold mb-1">Languages</h3>
              <p className="text-sm text-text-secondary">
                Programming language distribution
              </p>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-primary mb-2">📈</div>
              <h3 className="font-semibold mb-1">Trends</h3>
              <p className="text-sm text-text-secondary">
                Creation timeline and insights
              </p>
            </div>
          </div>

          {/* Recent Searches Placeholder */}
          <div className="mt-12 pt-12 border-t border-border">
            <p className="text-center text-text-secondary text-sm">
              Try searching for: <span className="font-mono font-medium text-primary">torvalds</span>, <span className="font-mono font-medium text-primary">gvanrossum</span>, or your favorite developer
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-text-secondary text-sm">
        <p>Using GitHub REST API • Data is real-time from public repositories</p>
      </footer>
    </div>
  );
}
