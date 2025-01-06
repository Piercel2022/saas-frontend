import React from 'react';
import DashboardStats from '../components/dashboard/DashboardStats';
import RecentActivity from '../components/dashboard/RecentActivity';
import QuickActions from '../components/dashboard/QuickActions';

const DashboardHome = () => {
  // Sample stats data - replace with actual data from your Redux store
  const sampleStats = {
    totalUsers: 1234,
    activeUsers: 892,
    monthlyRevenue: 45600,
    growthRate: 12.5,
    userActivityData: [
      { date: '2024-01', activeUsers: 750 },
      { date: '2024-02', activeUsers: 820 },
      { date: '2024-03', activeUsers: 892 }
    ]
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <DashboardStats stats={sampleStats} />
      <div className="grid gap-6 md:grid-cols-2">
        <QuickActions />
        <RecentActivity />
      </div>
    </div>
  );
};

export default DashboardHome;