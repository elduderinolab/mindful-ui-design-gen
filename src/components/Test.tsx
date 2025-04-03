
import React, { useState, useEffect } from 'react';

// A simple component to test if React hooks are working
const Test = () => {
  console.log('Test component rendering');
  console.log('useState available:', !!useState);
  console.log('useEffect available:', !!useEffect);
  
  // Try using both hooks
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log('useEffect running in Test component');
    // Do nothing, just testing if it runs
  }, []);
  
  return (
    <div style={{ padding: '10px', border: '1px solid #ddd', margin: '10px 0' }}>
      <h2>React Test Component</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default Test;
