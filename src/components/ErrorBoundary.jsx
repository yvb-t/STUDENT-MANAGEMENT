import { Component } from 'react';
import NotFound from '../pages/NotFound';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Only log to console for developer debugging. Never display red error text on screen.
    console.error('ErrorBoundary caught error silently:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    // Also signal global handlers if applicable
    window.dispatchEvent(new CustomEvent('clear-error-flag'));
  };

  render() {
    if (this.state.hasError) {
      return (
        <NotFound
          hasRetry={true}
          onRetry={this.handleReset}
          onReset={() => {
            this.handleReset();
            window.location.href = '/';
          }}
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
