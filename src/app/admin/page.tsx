'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import { FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";

interface Submission {
  name: string;
  email: string;
  feature: string;
  timestamp: string;
  index: number;
}

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/admin/submissions');
      if (!response.ok) {
        throw new Error('Failed to fetch submissions');
      }
      const data = await response.json();
      setSubmissions(data.submissions);
    } catch (err) {
      setError('Failed to load submissions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (index: number) => {
    if (!confirm('Are you sure you want to delete this submission?')) {
      return;
    }

    setDeleteLoading(index);
    try {
      const response = await fetch('/api/admin/delete-submission', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ index }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete submission');
      }

      // Remove the deleted submission from the list
      setSubmissions(prev => prev.filter((_, i) => i !== index));
    } catch (err) {
      setError('Failed to delete submission');
      console.error(err);
    } finally {
      setDeleteLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl text-black">Loading submissions...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      {/* Main Content */}
      <main className="flex flex-col items-center justify-start flex-1 w-full px-4 pb-8">
        
        {/* Admin Card */}
        <div className="w-full max-w-7xl mt-8 bg-[#fafafd] rounded-lg shadow-sm border border-[#f0f0f0]">
          {/* Admin Header */}
          <div className="bg-[#6C5CE7] rounded-t-lg px-6 py-4">
            <h2 className="text-white text-2xl font-bold text-center">Admin Dashboard</h2>
          </div>
          
          {/* Admin Body */}
          <div className="px-6 py-8">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {submissions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No submissions found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-[#f0f0f0]">
                  <thead className="bg-[#fafafd]">
                    <tr>
                      <th className="px-6 py-3 text-left text-md font-medium text-black uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-md font-medium text-black uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-md font-medium text-black uppercase tracking-wider">
                        Feature
                      </th>
                      <th className="px-6 py-3 text-left text-md font-medium text-black uppercase tracking-wider">
                        Timestamp
                      </th>
                      <th className="px-6 py-3 text-left text-md font-medium text-black uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-[#f0f0f0]">
                    {submissions.map((submission, index) => (
                      <tr key={index} className="hover:bg-[#fafafd]">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                          {submission.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                          {submission.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-black max-w-xs truncate">
                          {submission.feature}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                          {new Date(submission.timestamp).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleDelete(index)}
                            disabled={deleteLoading === index}
                            className="text-[#d30000] hover:text-[#b30000] disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                          >
                            {deleteLoading === index ? 'Deleting...' : 'Delete'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 