import React, { useState, useEffect } from 'react';
import { Plus, Filter } from 'lucide-react';
import IssueList from './IssueList';
import DepartmentList from './DepartmentList';
import NewIssueModal from './NewIssueModal';
import NewDepartmentModal from './NewDepartmentModal';
import { Issue, Department } from '../types';

interface DashboardProps {
  activeTab: 'issues' | 'departments';
  token: string;
}

function Dashboard({ activeTab, token }: DashboardProps) {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [showNewIssueModal, setShowNewIssueModal] = useState(false);
  const [showNewDepartmentModal, setShowNewDepartmentModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/issues${statusFilter !== 'all' ? `?status=${statusFilter}` : ''}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setIssues(data.issues);
        }
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/departments', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setDepartments(data.departments);
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    if (activeTab === 'issues') {
      fetchIssues();
    } else {
      fetchDepartments();
    }
  }, [activeTab, token, statusFilter]);

  const handleNewIssue = async (issue: Omit<Issue, 'id'>) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/issues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(issue),
      });

      if (response.ok) {
        const data = await response.json();
        setIssues([...issues, data.issue]);
        setShowNewIssueModal(false);
      }
    } catch (error) {
      console.error('Error creating issue:', error);
    }
  };

  const handleNewDepartment = async (department: Omit<Department, 'id'>) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/departments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(department),
      });

      if (response.ok) {
        const data = await response.json();
        setDepartments([...departments, data.department]);
        setShowNewDepartmentModal(false);
      }
    } catch (error) {
      console.error('Error creating department:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          {activeTab === 'issues' ? 'Issues' : 'Departments'}
        </h1>
        <div className="flex space-x-4">
          {activeTab === 'issues' && (
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 mr-2" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          )}
          <button
            onClick={() => activeTab === 'issues' ? setShowNewIssueModal(true) : setShowNewDepartmentModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-5 w-5 mr-2" />
            {activeTab === 'issues' ? 'New Issue' : 'New Department'}
          </button>
        </div>
      </div>

      {activeTab === 'issues' ? (
        <IssueList issues={issues} />
      ) : (
        <DepartmentList departments={departments} />
      )}

      {showNewIssueModal && (
        <NewIssueModal
          onClose={() => setShowNewIssueModal(false)}
          onSubmit={handleNewIssue}
          departments={departments}
        />
      )}

      {showNewDepartmentModal && (
        <NewDepartmentModal
          onClose={() => setShowNewDepartmentModal(false)}
          onSubmit={handleNewDepartment}
        />
      )}
    </div>
  );
}

export default Dashboard;