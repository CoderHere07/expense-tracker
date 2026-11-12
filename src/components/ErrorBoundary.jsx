import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() { return { hasError: true }; }

  componentDidCatch(error, info) { console.error('Dashboard crashed:', error, info); }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" className="sk-ledger mx-auto mt-16 max-w-md text-center">
          <h2 className="mb-3 text-xl font-bold">Something went wrong</h2>
          <button className="sk-brass" onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}