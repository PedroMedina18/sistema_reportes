import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import { AuthContextProvider } from './context/AuthContext.jsx';
import  'boxicons/css/boxicons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@popperjs/core/dist/cjs/popper.js';
import * as bootstrap from 'bootstrap'
import './main.css'
import './normalize.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <App/>
  </React.StrictMode>,
)
