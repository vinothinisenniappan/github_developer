import React from 'react';
import { Star, GitFork, ExternalLink } from 'lucide-react';

export default function TopRepositories({ repositories }) {
  if (!repositories || repositories.length === 0) {
    return null;
  }

  const topRepos = repositories.slice(0, 5).sort((a, b) => b.stargazers_count - a.stargazers_count);

  return (
    <div className="card mb-8">
      <h3 className="text-xl font-semibold mb-6">Top Repositories</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topRepos.map((repo) => (
          <div
            key={repo.id}
            className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-2">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 font-semibold text-primary hover:underline truncate"
              >
                {repo.name}
              </a>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-primary ml-2 flex-shrink-0"
              >
                <ExternalLink size={16} />
              </a>
            </div>

            {repo.description && (
              <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                {repo.description}
              </p>
            )}

            <div className="flex items-center justify-between text-xs text-text-secondary">
              <div className="flex items-center gap-4">
                {repo.language && (
                  <span className="inline-block px-2 py-1 bg-surface rounded">
                    {repo.language}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border text-sm">
              <div className="flex items-center gap-1">
                <Star size={16} className="text-yellow-600" />
                <span>{repo.stargazers_count}</span>
              </div>
              <div className="flex items-center gap-1">
                <GitFork size={16} className="text-text-secondary" />
                <span>{repo.forks_count}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
