import React from 'react';
import { createRoot } from 'react-dom/client';
import Modal from '../component/Modal';

let aiInteractChromeRoot = document.getElementById('ai-interact-chrome-root');

if (!aiInteractChromeRoot) {
  aiInteractChromeRoot = document.createElement('div');
  aiInteractChromeRoot.id = 'ai-interact-chrome-root';
  document.body.appendChild(aiInteractChromeRoot);
}

const root = createRoot(aiInteractChromeRoot);

root.render(
  <React.StrictMode>
    <Modal selectedText={''}/>
  </React.StrictMode>
  );
