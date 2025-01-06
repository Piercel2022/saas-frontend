import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrganizations } from '../../features/organizations/organizationsSlice';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { items: organizations, loading } = useSelector((state) => state.organizations);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchOrganizations());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8">
        <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
            Welcome, {user?.name}
          </h2>
        </div>
        
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {organizations.map((org) => (
            <div
              key={org.id}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300"
            >
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">{org.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{org.description}</p>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <a
                    href={`/organizations/${org.id}`}
                    className="font-medium text-primary-600 hover:text-primary-500"
                  >
                    View details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}