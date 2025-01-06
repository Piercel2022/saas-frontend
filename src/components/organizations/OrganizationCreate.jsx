import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrganization } from '../../features/organizations/organizationsSlice';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {Alert, AlertDescription} from "../ui/alert";

const OrganizationCreate = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    email: '',
    industry: '',
    size: 'small',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const industries = [
    'Technology',
    'Healthcare',
    'Education',
    'Financial Services',
    'Manufacturing',
    'Retail',
    'Other'
  ];

  const organizationSizes = [
    { value: 'small', label: '1-50 employees' },
    { value: 'medium', label: '51-200 employees' },
    { value: 'large', label: '201-1000 employees' },
    { value: 'enterprise', label: '1000+ employees' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Organization name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!formData.description.trim()) return 'Description is required';
    if (!formData.industry) return 'Industry is required';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await dispatch(createOrganization(formData)).unwrap();
      navigate('/organizations');
    } catch (err) {
      setError(err.message || 'Failed to create organization');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Create New Organization</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Organization Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter organization name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                rows="4"
                placeholder="Describe your organization"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Contact Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="contact@organization.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Industry *
              </label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select an industry</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Organization Size
              </label>
              <select
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                {organizationSizes.map(size => (
                  <option key={size.value} value={size.value}>
                    {size.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <button
                type="button"
                onClick={() => navigate('/organizations')}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Organization'}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizationCreate;