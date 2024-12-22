import React from 'react';
import { Box } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-background-secondary border-b border-background-tertiary px-4 py-2 flex items-center gap-2">
      <Box size={20} className="text-blue-500" />
      <h1 className="text-white font-medium">Fractalize <span className="text-gray-400 text-sm">v1.0</span></h1>
    </header>
  );
}