
import React from 'react';
import { Outlet } from 'react-router-dom';

// Minimal layout to test if the issue is in the Layout component
const MinimalLayout: React.FC = () => {
  return (
    <div className="min-h-screen">
      <header className="bg-white p-4 shadow-sm">
        <h1 className="text-xl font-semibold">CerebroSync</h1>
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MinimalLayout;
