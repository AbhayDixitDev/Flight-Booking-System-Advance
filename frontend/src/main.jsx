// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './assets/css/index.css'; // Global CSS (custom styles, Tailwind/Bootstrap overrides)
import 'bootstrap/dist/css/bootstrap.min.css';
// src/main.jsx
// import 'src/assets/preline-pro/js/preline-pro.js';


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
