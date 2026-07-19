import React, { useState, useEffect } from 'react';
import { ArrowLeft, Loader } from 'lucide-react';
import ProfileCard from '../components/ProfileCard';
import StatsCards from '../components/StatsCards';
import RepositoriesTable from '../components/RepositoriesTable';
import LanguageChart from '../components/LanguageChart';
import TopRepositories from '../components/TopRepositories';
import ActivityChart from '../components/ActivityChart';
import ErrorState from '../components/ErrorState';

// const GITHUB_API_URL = 'https://api.github.com';

// async function fetchJson(url) {
//   const response = await fetch(url, {
//     headers: {
//       Accept: 'application/vnd.github.v3+json'
//     }
//   });

//   if (!response.ok) {
//     let message = `Request failed (${response.status})`;

//     try {
//       const payload = await response.json();
//       if (payload?.message) {
//         message = payload.message;
//       } else if (payload?.error) {
//         message = payload.error;
//       }
//     } catch {
//       // Use the generic status-based message when the body is not JSON.
//     }

//     const error = new Error(message);
//     error.status = response.status;
//     throw error;
//   }

//   return response.json();
// }

// async function fetchGitHubRepos(username, page = 1, perPage = 100) {
//   const url = new URL(`${GITHUB_API_URL}/users/${encodeURIComponent(username)}/repos`);
//   url.searchParams.set('sort', 'updated');
//   url.searchParams.set('direction', 'desc');
//   url.searchParams.set('per_page', String(perPage));
//   url.searchParams.set('page', String(page));

//   return fetchJson(url.toString());
// }

// function calculateStats(repos) {
//   const stats = {
//     totalRepos: repos.length,
//     totalStars: 0,
//     totalForks: 0,
//     languages: {},
//     topLanguages: [],
//     createdByYear: {},
//     averageStars: 0,
//     averageForks: 0
//   };

//   repos.forEach((repo) => {
//     stats.totalStars += repo.stargazers_count || 0;
//     stats.totalForks += repo.forks_count || 0;

//     if (repo.language) {
//       stats.languages[repo.language] = (stats.languages[repo.language] || 0) + 1;
//     }

//     const year = new Date(repo.created_at).getFullYear();
//     stats.createdByYear[year] = (stats.createdByYear[year] || 0) + 1;
//   });

//   stats.averageStars = repos.length > 0 ? Math.round(stats.totalStars / repos.length) : 0;
//   stats.averageForks = repos.length > 0 ? Math.round(stats.totalForks / repos.length) : 0;

//   stats.topLanguages = Object.entries(stats.languages)
//     .map(([language, count]) => ({
//       name: language,
//       count,
//       percentage: repos.length > 0 ? ((count / repos.length) * 100).toFixed(1) : 0
//     }))
//     .sort((a, b) => b.count - a.count)
//     .slice(0, 10);

//   stats.totalLanguages = Object.keys(stats.languages).length;

//   return stats;
// }

export default function DashboardPage({ username, onBack }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '');
useEffect(() => {
  const fetchDeveloperData = async () => {
    try {
      setLoading(true);
      setError("");

      const API_URL =
        import.meta.env.VITE_API_URL || "https://github-developer.onrender.com";

      const response = await fetch(
        `${API_URL}/api/developer/${encodeURIComponent(username)}`
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
          errorData?.error || "Failed to fetch developer data"
        );
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message || "Failed to fetch developer data");
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
