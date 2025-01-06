import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { UserPlus, FileEdit, Settings, Tag } from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'new_member',
      user: 'Sarah Chen',
      action: 'joined the organization',
      timestamp: '2 minutes ago',
      icon: UserPlus,
    },
    {
      id: 2,
      type: 'document_edit',
      user: 'John Miller',
      action: 'updated the project documentation',
      timestamp: '1 hour ago',
      icon: FileEdit,
    },
    {
      id: 3,
      type: 'settings_change',
      user: 'Emily Watson',
      action: 'changed team permissions',
      timestamp: '3 hours ago',
      icon: Settings,
    },
    {
      id: 4,
      type: 'subscription_update',
      user: 'Michael Brown',
      action: 'upgraded to Premium plan',
      timestamp: '5 hours ago',
      icon: Tag,
    },
  ];

  const getActivityColor = (type) => {
    const colors = {
      new_member: 'text-green-500',
      document_edit: 'text-blue-500',
      settings_change: 'text-orange-500',
      subscription_update: 'text-purple-500',
    };
    return colors[type] || 'text-gray-500';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div
                key={activity.id}
                className="flex items-start space-x-4 p-2 hover:bg-gray-50 rounded-md transition-colors"
              >
                <div className={`${getActivityColor(activity.type)} p-2 rounded-full bg-gray-100`}>
                  <Icon size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span>{' '}
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">{activity.timestamp}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;