import React from 'react';
import { createRoot } from 'react-dom/client';
import Settings from '../pages/Settings';

const root = createRoot(document.getElementById('ai-interact-chrome-root-settings'));

root.render(
  <React.StrictMode>
    <Settings />
  </React.StrictMode>
);
