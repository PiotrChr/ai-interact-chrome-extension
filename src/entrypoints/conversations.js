import React from 'react';
import { createRoot } from 'react-dom/client';
import Conversations from '../pages/Conversations';

const root = createRoot(document.getElementById('ai-interact-chrome-root-conversations'));

root.render(
  <React.StrictMode>
    <Conversations />
  </React.StrictMode>
);
