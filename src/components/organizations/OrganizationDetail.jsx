import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrganizationById, updateOrganization } from '../../features/organizations/organizationsSlice';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';

const OrganizationDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentOrganization, loading, error } = useSelector((state) => state.organizations);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    email: ''
  });

  useEffect(() => {
    dispatch(fetchOrganizationById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentOrganization) {
      setFormData({
        name: currentOrganization.name,
        description: currentOrganization.description,
        email: currentOrganization.email
      });
    }
  }, [currentOrganization]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateOrganization({ id, ...formData })).unwrap();
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update organization:', err);
    }
  };

  if (loading) return <div className="p-4">Loading organization details...</div>;
  if (error) return <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>;
  if (!currentOrganization) return <div className="p-4">Organization not found</div>;

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            {!isEditing ? (
              <>
                <h2>{currentOrganization.name}</h2>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
              </>
            ) : (
              <h2>Edit Organization</h2>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!isEditing ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Description</h3>
                <p className="text-gray-600">{currentOrganization.description}</p>
              </div>
              <div>
                <h3 className="font-medium">Contact Email</h3>
                <p className="text-gray-600">{currentOrganization.email}</p>
              </div>
              <div>
                <h3 className="font-medium">Members</h3>
                <p className="text-gray-600">{currentOrganization.memberCount} members</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Organization Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  rows="4"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizationDetail;