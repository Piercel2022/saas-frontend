
// src/components/organizations/OrganizationList.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrganizations } from '../../features/organizations/organizationsSlice';
 // eslint-disable-next-line
import { Plus, Users, Building } from 'lucide-react';

export default function OrganizationList() {
const dispatch = useDispatch();
const { items: organizations, loading } = useSelector((state) => state.organizations);

useEffect(() => {
dispatch(fetchOrganizations());
}, [dispatch]);

if (loading) {
return (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>
);
}

return (
    <div>
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Organizations
        </h2>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <Link
            to="/organizations/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            New Organization
          </Link>
        </div>
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {organizations.map((org) => (
          <Link
            key={org.id}
            to={`/organizations/${org.id}`}
            className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
          >
            <div className="flex-shrink-0">
              <Building className="h-10 w-10 text-gray-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="focus:outline-none">
                <p className="text-sm font-medium text-gray-900">{org.name}</p>
                <p className="text-sm text-gray-500 truncate">{org.members_count} members</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
