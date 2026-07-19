import React, { useState, useEffect } from 'react';
import { ArrowLeft, Loader } from 'lucide-react';
import ProfileCard from '../components/ProfileCard';
import StatsCards from '../components/StatsCards';
import RepositoriesTable from '../components/RepositoriesTable';
import LanguageChart from '../components/LanguageChart';
import TopRepositories from '../components/TopRepositories';
import ActivityChart from '../components/ActivityChart';
import ErrorState from '../components/ErrorState';

export default function DashboardPage({ username, onBack }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchDeveloperData = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await fetch(`${API_URL}/api/developer/${username}`);
        
        if (!response.ok) {
          throw new Error('Developer not found');
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message || 'Failed to fetch developer data');
      } finally {
        setLoading(false);
      }
    };

    fetchDeveloperData();
  }, [username]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-surface rounded-lg transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold">GitHub Developer Insights</h1>
            <p className="text-sm text-text-secondary">@{username}</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader size={48} className="text-primary animate-spin mb-4" />
            <p className="text-text-secondary">Loading developer data...</p>
          </div>
        )}

        {error && <ErrorState message={error} />}

        {data && !error && (
          <>
            {/* Profile Card */}
            <ProfileCard profile={data.profile} />

            {/* Stats Cards */}
            <StatsCards stats={data.stats} />

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <LanguageChart languages={data.stats.topLanguages} />
              <ActivityChart reposByYear={data.stats.createdByYear} />
            </div>

            {/* Top Repositories */}
            <TopRepositories repositories={data.repos.slice(0, 5)} />

            {/* Repositories Table */}
            <RepositoriesTable repositories={data.repos} />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-text-secondary text-sm">
        <p>Data from GitHub REST API • Last updated: {new Date().toLocaleString()}</p>
      </footer>
    </div>
  );
}
