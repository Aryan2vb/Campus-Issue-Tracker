import React from 'react';
import { Building2, Mail } from 'lucide-react';
import { Department } from '../types';

interface DepartmentListProps {
  departments: Department[];
}

function DepartmentList({ departments }: DepartmentListProps) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {departments.map((department) => (
          <li key={department.id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Building2 className="h-5 w-5 text-gray-400" />
                  <p className="ml-2 text-sm font-medium text-gray-900">{department.department_name}</p>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Mail className="h-5 w-5 text-gray-400 mr-1" />
                  <a href={`mailto:${department.contact_email}`} className="hover:text-indigo-600">
                    {department.contact_email}
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
        {departments.length === 0 && (
          <li className="px-4 py-8">
            <div className="text-center">
              <p className="text-sm text-gray-500">No departments found</p>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}

export default DepartmentList;