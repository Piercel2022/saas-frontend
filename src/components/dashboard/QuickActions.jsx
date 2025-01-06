import React from 'react';
import { PlusCircle, Users, Settings, FileText, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const QuickActions = () => {
  const actions = [
    {
      title: 'New Project',
      icon: <PlusCircle className="h-6 w-6" />,
      description: 'Create a new project workspace',
      href: '/projects/new'
    },
    {
      title: 'Team Members',
      icon: <Users className="h-6 w-6" />,
      description: 'Manage your team and permissions',
      href: '/team'
    },
    {
      title: 'Documents',
      icon: <FileText className="h-6 w-6" />,
      description: 'Access your files and documents',
      href: '/documents'
    },
    {
      title: 'Settings',
      icon: <Settings className="h-6 w-6" />,
      description: 'Configure your account settings',
      href: '/settings'
    },
    {
      title: 'Help & Support',
      icon: <HelpCircle className="h-6 w-6" />,
      description: 'Get help and view documentation',
      href: '/support'
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {actions.map((action) => (
        <Card 
          key={action.title}
          className="hover:bg-slate-50 transition-colors cursor-pointer"
          onClick={() => window.location.href = action.href}
        >
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg p-2 bg-primary/10">
              {action.icon}
            </div>
            <div>
              <h3 className="font-medium">{action.title}</h3>
              <p className="text-sm text-slate-500">{action.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuickActions;