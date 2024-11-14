import React from 'react';
import { AlertCircle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Issue } from '../types';

interface IssueListProps {
  issues: Issue[];
}

function IssueList({ issues }: IssueListProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'resolved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'closed':
        return <XCircle className="h-5 w-5 text-gray-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {issues.map((issue) => (
          <li key={issue.id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {getStatusIcon(issue.status)}
                  <p className="ml-2 text-sm font-medium text-gray-900">{issue.title}</p>
                </div>
                <div className="ml-2 flex-shrink-0">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(issue.status)}`}>
                    {issue.status}
                  </span>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="text-sm text-gray-500">{issue.description}</p>
                </div>
                {issue.created_at && (
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>Created {new Date(issue.created_at).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
        {issues.length === 0 && (
          <li className="px-4 py-8">
            <div className="text-center">
              <p className="text-sm text-gray-500">No issues found</p>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}

export default IssueList;