import React from 'react';
import { Star, GitFork, Code2, Zap } from 'lucide-react';

export default function StatsCards({ stats }) {
  const cards = [
    {
      title: 'Public Repositories',
      value: stats.totalRepos.toLocaleString(),
      icon: Code2,
      color: 'bg-blue-50 text-primary'
    },
    {
      title: 'Total Stars',
      value: stats.totalStars.toLocaleString(),
      icon: Star,
      color: 'bg-yellow-50 text-yellow-600'
    },
    {
      title: 'Total Forks',
      value: stats.totalForks.toLocaleString(),
      icon: GitFork,
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Languages Used',
      value: stats.totalLanguages.toLocaleString(),
      icon: Zap,
      color: 'bg-purple-50 text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="card hover:shadow-lg transition-shadow"
          >
            <div className={`inline-flex p-3 rounded-lg mb-4 ${card.color}`}>
              <Icon size={24} />
            </div>
            <p className="text-text-secondary text-sm font-medium mb-1">
              {card.title}
            </p>
            <p className="text-4xl font-bold">{card.value}</p>
          </div>
        );
      })}
    </div>
  );
}
