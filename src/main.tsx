import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style/index.scss';
sessionStorage.setItem('theme', String(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches));
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
