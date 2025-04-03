
/**
 * CerebroSync - Main entry point
 * Using direct DOM manipulation with minimal React
 */

// Import React but don't rely on it for initial rendering
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// First, render a loading message using pure DOM
document.addEventListener('DOMContentLoaded', function() {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error('Root element not found');
    return;
  }
  
  // First show a loading message using DOM manipulation
  rootElement.innerHTML = `
    <div style="text-align: center; padding: 2rem; font-family: system-ui, sans-serif;">
      <h1 style="color: #88B7A8; margin-bottom: 1rem;">CerebroSync</h1>
      <p>Mental Health Support for Students</p>
      <div id="app-content">
        <p>Application is initializing...</p>
      </div>
    </div>
  `;
  
  // Then try to initialize React with a delay
  setTimeout(() => {
    try {
      initializeReact();
    } catch (error) {
      console.error('Failed to initialize React:', error);
      document.getElementById('app-content').innerHTML = `
        <div style="color: #d32f2f; margin-top: 1rem;">
          <p>There was a problem loading the application.</p>
          <p>Please try refreshing the page.</p>
        </div>
      `;
    }
  }, 100);
});

// Separate function to initialize React
function initializeReact() {
  const appContent = document.getElementById('app-content');
  
  if (!appContent) {
    console.error('App content element not found');
    return;
  }
  
  // Basic React component
  const App = () => {
    return (
      <div style={{ padding: '1rem', textAlign: 'left' }}>
        <h2 style={{ color: '#A78BC1', marginBottom: '1rem' }}>Welcome to CerebroSync</h2>
        <p>A mental health support app for students</p>
        <div style={{ marginTop: '1rem' }}>
          <button 
            style={{ 
              backgroundColor: '#FFC8A8', 
              border: 'none', 
              padding: '0.5rem 1rem',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
            onClick={() => alert('Feature coming soon!')}
          >
            Explore Features
          </button>
        </div>
      </div>
    );
  };
  
  try {
    // Use React's createRoot API with error handling
    const root = createRoot(appContent);
    root.render(<App />);
    console.log('React successfully initialized');
  } catch (error) {
    console.error('Error rendering React component:', error);
    appContent.innerHTML = '<p>Error loading React components. Please try again later.</p>';
  }
}
