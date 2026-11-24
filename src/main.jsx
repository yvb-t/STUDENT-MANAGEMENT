/* eslint-disable react-refresh/only-export-components */
import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ErrorBoundary } from './components/ErrorBoundary.jsx';
import NotFound from './pages/NotFound.jsx';

function Root() {
  const [hasGlobalError, setHasGlobalError] = useState(false);

  useEffect(() => {
    const handleWindowError = (event) => {
      // Log for developer debugging only - never display red error text on screen
      console.error('Captured window/async error:', event.error || event.message);
      setHasGlobalError(true);
    };

    const handleUnhandledRejection = (event) => {
      // Log for developer debugging only
      console.error('Captured unhandled promise rejection:', event.reason);
      setHasGlobalError(true);
    };

    const handleClearFlag = () => {
      setHasGlobalError(false);
    };

    window.addEventListener('error', handleWindowError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('clear-error-flag', handleClearFlag);

    return () => {
      window.removeEventListener('error', handleWindowError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('clear-error-flag', handleClearFlag);
    };
  }, []);

  if (hasGlobalError) {
    return (
      <NotFound
        hasRetry={true}
        onRetry={() => setHasGlobalError(false)}
        onReset={() => {
          setHasGlobalError(false);
          window.location.href = '/';
        }}
      />
    );
  }

  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
