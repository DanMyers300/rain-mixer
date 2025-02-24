import React from 'react';
import { Main } from './components/main.tsx';
import { createRoot } from 'react-dom/client';

const App: React.FC = () => {
  return (
    <div>
      <h1> Hello world! </h1>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
