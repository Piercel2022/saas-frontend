import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Activity, CreditCard, TrendingUp } from 'lucide-react';

const DashboardStats = ({ stats }) => {
  const {
    totalUsers,
    activeUsers,
    monthlyRevenue,
    growthRate,
    userActivityData
  } = stats;

  const StatCard = ({ title, value, icon: Icon, description }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-gray-500">{description}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={totalUsers}
          icon={Users}
          description="All registered users"
        />
        <StatCard
          title="Active Users"
          value={activeUsers}
          icon={Activity}
          description="Users active this month"
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${monthlyRevenue}`}
          icon={CreditCard}
          description="Revenue this month"
        />
        <StatCard
          title="Growth Rate"
          value={`${growthRate}%`}
          icon={TrendingUp}
          description="User growth this month"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="activeUsers" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;