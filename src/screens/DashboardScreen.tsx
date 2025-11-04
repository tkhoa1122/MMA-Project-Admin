import React from 'react';
import { Card } from '@/components/common';

export const DashboardScreen: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total Users" className="border-l-4 border-blue-500">
          <p className="text-3xl font-bold text-gray-900">1,234</p>
          <p className="text-sm text-gray-600 mt-2">+12% from last month</p>
        </Card>
        
        <Card title="Revenue" className="border-l-4 border-green-500">
          <p className="text-3xl font-bold text-gray-900">$45,678</p>
          <p className="text-sm text-gray-600 mt-2">+8% from last month</p>
        </Card>
        
        <Card title="Orders" className="border-l-4 border-yellow-500">
          <p className="text-3xl font-bold text-gray-900">567</p>
          <p className="text-sm text-gray-600 mt-2">+15% from last month</p>
        </Card>
        
        <Card title="Products" className="border-l-4 border-purple-500">
          <p className="text-3xl font-bold text-gray-900">89</p>
          <p className="text-sm text-gray-600 mt-2">+3 new products</p>
        </Card>
      </div>
    </div>
  );
};
