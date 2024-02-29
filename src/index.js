import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// <!-- Core CSS -->
import './Component/assets/vendor/css/core.css'
import './Component/assets/vendor/css/theme-default.css'
import './Component/assets/css/demo.css'
// <!-- Vendors CSS -->
import './Component/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css'
// <!-- Helpers -->
import './Component/assets/vendor/js/helpers.js'
import './Component/assets/vendor/js/bootstrap.js'
// import './Component/assets/js/dashboards-analytics.js'
// import './Component/assets/js/config.js'



import './Component/assets/vendor/libs/jquery/jquery.js'






const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
