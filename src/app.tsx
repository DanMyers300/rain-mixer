import React from 'react';
import { createRoot } from 'react-dom/client';

const App: React.FC = () => {
  return (
    <div>
      <h1>Hello World from React!</h1>
    </div>
  );
};

// Use createRoot instead of ReactDOM.render
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
