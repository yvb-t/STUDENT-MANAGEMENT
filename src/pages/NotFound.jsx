import { Link, useNavigate } from 'react-router-dom';

export default function NotFound({ hasRetry = false, onRetry, onReset }) {
  const navigate = useNavigate();
  let locationPath = '/';
  if (typeof window !== 'undefined') {
    locationPath = window.location.pathname || '/';
  }

  const handleGoHome = (e) => {
    if (e) e.preventDefault();
    try {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('clear-error-flag'));
      }
      if (typeof onReset === 'function') {
        onReset();
      }
    } catch (err) {
      console.error('Error clearing reset state:', err);
    }

    try {
      navigate('/');
    } catch {
      if (typeof window !== 'undefined') {
        window.location.href = import.meta.env.BASE_URL || '/';
      }
    }
  };

  return (
    <div className="google-404-viewport">
      <div className="google-404-container">
        {/* Google Style Colored Logo */}
        <div className="google-logo">
          <Link to="/" onClick={handleGoHome} title="Go to home">
            <span className="g-blue">E</span>
            <span className="g-red">d</span>
            <span className="g-yellow">u</span>
            <span className="g-blue">T</span>
            <span className="g-green">r</span>
            <span className="g-red">a</span>
            <span className="g-blue">c</span>
            <span className="g-green">k</span>
          </Link>
        </div>

        <div className="google-404-content">
          <div className="google-error-text">
            <p className="google-headline">
              <b>404.</b> <ins>That&apos;s an error.</ins>
            </p>

            <p className="google-description">
              The requested URL <code>{locationPath}</code> was not found on this server.
            </p>
            <p className="google-details">That&apos;s all we know.</p>

            <div className="google-actions">
              <button
                type="button"
                className="google-btn google-btn-primary"
                onClick={handleGoHome}
              >
                Go to home
              </button>

              {hasRetry && typeof onRetry === 'function' && (
                <button
                  type="button"
                  className="google-btn"
                  onClick={onRetry}
                >
                  Try again
                </button>
              )}

              <Link
                to="/students"
                className="google-btn"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('clear-error-flag'));
                  }
                }}
              >
                Student Directory
              </Link>
            </div>
          </div>

          {/* Classic Google Broken Robot Graphic */}
          <div className="google-robot">
            <svg
              width="220"
              height="220"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Google Error Robot"
              role="img"
            >
              {/* Antenna */}
              <circle cx="100" cy="24" r="7" fill="#EA4335" />
              <line x1="100" y1="31" x2="100" y2="46" stroke="#5F6368" strokeWidth="4" />

              {/* Head */}
              <rect x="65" y="46" width="70" height="42" rx="8" fill="#F1F3F4" stroke="#5F6368" strokeWidth="4" />
              {/* Eyes */}
              <circle cx="83" cy="64" r="5" fill="#4285F4" />
              <circle cx="117" cy="64" r="5" fill="#4285F4" />
              {/* Mouth */}
              <path d="M85 78 Q100 72 115 78" stroke="#5F6368" strokeWidth="3" strokeLinecap="round" />

              {/* Neck */}
              <rect x="92" y="88" width="16" height="8" fill="#BDC1C6" stroke="#5F6368" strokeWidth="3" />

              {/* Body */}
              <rect x="52" y="96" width="96" height="66" rx="10" fill="#F8F9FA" stroke="#5F6368" strokeWidth="4" />

              {/* Chest 404 display */}
              <rect x="66" y="106" width="68" height="26" rx="4" fill="#E8EAED" stroke="#BDC1C6" strokeWidth="2" />
              <text x="74" y="124" fill="#EA4335" fontFamily="monospace" fontSize="13" fontWeight="bold">
                ! 404
              </text>
              <line x1="112" y1="119" x2="126" y2="119" stroke="#FBBC05" strokeWidth="3" strokeLinecap="round" />

              {/* Bolt */}
              <circle cx="100" cy="146" r="6" fill="#BDC1C6" stroke="#5F6368" strokeWidth="2" />

              {/* Left Arm with Wrench */}
              <path d="M52 108 L28 132" stroke="#5F6368" strokeWidth="6" strokeLinecap="round" />
              <path d="M22 136 L34 124 L38 128 L26 140 Z" fill="#FBBC05" stroke="#5F6368" strokeWidth="2" />

              {/* Right Arm */}
              <path d="M148 108 L170 140" stroke="#5F6368" strokeWidth="6" strokeLinecap="round" />
              <circle cx="170" cy="140" r="5" fill="#34A853" />

              {/* Legs */}
              <rect x="74" y="162" width="14" height="20" rx="3" fill="#BDC1C6" stroke="#5F6368" strokeWidth="3" />
              <rect x="112" y="162" width="14" height="20" rx="3" fill="#BDC1C6" stroke="#5F6368" strokeWidth="3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
