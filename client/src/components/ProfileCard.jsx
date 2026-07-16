import React from 'react';
import { MapPin, Building, Mail, Github, Link } from 'lucide-react';

export default function ProfileCard({ profile }) {
  if (!profile) return null;

  return (
    <div className="card mb-8 overflow-hidden">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={profile.avatar_url}
            alt={profile.name || profile.login}
            className="w-24 h-24 md:w-32 md:h-32 rounded-lg border-4 border-border object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <div className="mb-4">
            <h2 className="text-3xl font-bold mb-1">
              {profile.name || profile.login}
            </h2>
            <p className="text-lg text-primary font-mono">@{profile.login}</p>
            {profile.bio && (
              <p className="text-text-secondary mt-2">{profile.bio}</p>
            )}
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <p className="text-text-secondary text-sm">Followers</p>
              <p className="text-2xl font-bold text-primary">
                {profile.followers.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-text-secondary text-sm">Following</p>
              <p className="text-2xl font-bold text-primary">
                {profile.following.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-text-secondary text-sm">Repos</p>
              <p className="text-2xl font-bold text-primary">
                {profile.public_repos.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-text-secondary text-sm">Gists</p>
              <p className="text-2xl font-bold text-primary">
                {profile.public_gists.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
            {profile.location && (
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                {profile.location}
              </div>
            )}
            {profile.company && (
              <div className="flex items-center gap-1">
                <Building size={16} />
                {profile.company}
              </div>
            )}
            {profile.email && (
              <div className="flex items-center gap-1">
                <Mail size={16} />
                {profile.email}
              </div>
            )}
            {profile.blog && (
              <a
                href={profile.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-primary hover:underline"
              >
                <Link size={16} />
                Website
              </a>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex-shrink-0 flex items-start">
          <a
            href={profile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center gap-2"
          >
            <Github size={18} />
            Visit Profile
          </a>
        </div>
      </div>
    </div>
  );
}
