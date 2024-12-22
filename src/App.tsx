import React from 'react';
import { Header } from './components/Header';
import FractalExplorer from './components/FractalExplorer';

function App() {
  return (
    <div className="min-h-screen bg-background-primary flex flex-col">
      <Header />
      <FractalExplorer />
    </div>
  );
}

export default App;