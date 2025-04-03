
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import CrisisButton from '../shared/CrisisButton';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check user's preferred color scheme on initial render
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Close sidebar on mobile when clicking outside
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      const menuButton = document.getElementById('menu-button');
      
      if (
        sidebar && 
        !sidebar.contains(event.target as Node) && 
        menuButton && 
        !menuButton.contains(event.target as Node) &&
        window.innerWidth < 768 && 
        sidebarOpen
      ) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-300">
      <Header 
        toggleSidebar={toggleSidebar} 
        toggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
      />
      <div className="flex flex-1">
        <Sidebar id="sidebar" isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <main 
          className={`flex-1 transition-all duration-300 p-3 md:p-4 ${
            sidebarOpen ? 'md:ml-64' : 'md:ml-16'
          }`}
        >
          <Outlet />
        </main>
      </div>
      <CrisisButton />
    </div>
  );
};

export default Layout;
