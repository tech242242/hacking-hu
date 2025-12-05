import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// React application render کرنے سے پہلے loading screen ہٹائیں
const rootElement = document.getElementById('root');

// Loading screen کو ہٹانے کا function
const removeLoadingScreen = () => {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }
};

// App render کرنے کے بعد loading screen ہٹائیں
const renderApp = () => {
  try {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
    
    // App render ہونے کے بعد loading screen ہٹائیں
    setTimeout(removeLoadingScreen, 1000);
    
  } catch (error) {
    console.error('Failed to render React app:', error);
    removeLoadingScreen();
    
    // Error fallback UI
    rootElement.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        color: #f00;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: 'Courier New', monospace;
        text-align: center;
        padding: 20px;
      ">
        <h1 style="color: #f00; text-shadow: 0 0 10px #f00; margin-bottom: 20px;">
          SYSTEM ERROR
        </h1>
        <p style="color: #0f0; margin-bottom: 10px;">
          Application failed to load: ${error.message}
        </p>
        <button onclick="location.reload()" style="
          margin-top: 20px;
          padding: 10px 20px;
          background: rgba(255,0,0,0.2);
          border: 1px solid #f00;
          color: #f00;
          cursor: pointer;
          font-family: 'Courier New', monospace;
        ">
          RELOAD SYSTEM
        </button>
      </div>
    `;
  }
};

// DOM کے ready ہونے کا انتظار کریں
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}

// Vite development mode میں hot reload کے لیے
if (import.meta.hot) {
  import.meta.hot.accept();
}
