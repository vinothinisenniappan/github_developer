import React, { useState } from 'react';
import { Star, GitFork, Calendar, ExternalLink } from 'lucide-react';

export default function RepositoriesTable({ repositories }) {
  const [sortBy, setSortBy] = useState('updated');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const reposPerPage = 10;

  const filteredRepos = repositories
    .filter(repo => repo.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'stars') {
        return b.stargazers_count - a.stargazers_count;
      } else if (sortBy === 'updated') {
        return new Date(b.updated_at) - new Date(a.updated_at);
      }
      return 0;
    });

  const totalPages = Math.ceil(filteredRepos.length / reposPerPage);
  const startIndex = (currentPage - 1) * reposPerPage;
  const paginatedRepos = filteredRepos.slice(startIndex, startIndex + reposPerPage);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-6">All Repositories</h3>

      {/* Search and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search repositories..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="input flex-1"
        />
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setCurrentPage(1);
          }}
          className="input"
        >
          <option value="updated">Sort by: Recently Updated</option>
          <option value="stars">Sort by: Most Stars</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-text-secondary">Repository</th>
              <th className="text-left py-3 px-4 font-semibold text-text-secondary">Language</th>
              <th className="text-right py-3 px-4 font-semibold text-text-secondary">Stars</th>
              <th className="text-right py-3 px-4 font-semibold text-text-secondary">Forks</th>
              <th className="text-left py-3 px-4 font-semibold text-text-secondary">Updated</th>
              <th className="text-center py-3 px-4 font-semibold text-text-secondary">Link</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRepos.length > 0 ? (
              paginatedRepos.map((repo) => (
                <tr key={repo.id} className="border-b border-border hover:bg-surface transition-colors">
                  <td className="py-3 px-4">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-medium hover:underline"
                    >
                      {repo.name}
                    </a>
                  </td>
                  <td className="py-3 px-4">
                    {repo.language ? (
                      <span className="inline-block px-2 py-1 bg-surface rounded text-xs font-medium">
                        {repo.language}
                      </span>
                    ) : (
                      <span className="text-text-secondary">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Star size={16} className="text-yellow-600" />
                      {repo.stargazers_count}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <GitFork size={16} />
                      {repo.forks_count}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 text-text-secondary">
                      <Calendar size={16} />
                      {formatDate(repo.updated_at)}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-blue-700 inline-block"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-8 text-center text-text-secondary">
                  No repositories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
          <p className="text-sm text-text-secondary">
            Showing {startIndex + 1}–{Math.min(startIndex + reposPerPage, filteredRepos.length)} of {filteredRepos.length} repositories
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let page;
                if (totalPages <= 5) {
                  page = i + 1;
                } else if (currentPage <= 3) {
                  page = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  page = totalPages - 4 + i;
                } else {
                  page = currentPage - 2 + i;
                }
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded transition-colors ${
                      currentPage === page
                        ? 'bg-primary text-white'
                        : 'border border-border hover:bg-surface'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
