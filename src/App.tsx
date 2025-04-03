
import React from 'react';

console.log('App.tsx loaded');

// The simplest possible component
const App = () => {
  console.log('App component rendering');
  
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#4a9', marginBottom: '10px' }}>CerebroSync</h1>
      <p>Initializing application...</p>
    </div>
  );
};

// Export as both default and named export
export { App };
export default App;
