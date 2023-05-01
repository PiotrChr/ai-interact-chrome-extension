import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../pages/Main';

const aiInteractChromeRoot = document.createElement('div');
aiInteractChromeRoot.id = 'ai-interact-chrome-root';
document.body.appendChild(aiInteractChromeRoot);

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('ai-interact-chrome-root')
);
