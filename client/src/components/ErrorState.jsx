import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function ErrorState({ message }) {
  return (
    <div className="card bg-red-50 border border-red-200 text-center py-12">
      <AlertCircle size={48} className="mx-auto mb-4 text-red-600" />
      <h3 className="text-xl font-semibold text-red-900 mb-2">Error Loading Data</h3>
      <p className="text-red-700 mb-6">{message}</p>
      <p className="text-sm text-red-600">
        Please check the username and try again, or visit GitHub directly to verify the profile exists.
      </p>
    </div>
  );
}
