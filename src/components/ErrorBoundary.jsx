import { Component } from "react";
import { Container } from "reactstrap";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Uncaught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="py-5 text-center">
          <Container>
            <h3 className="text-danger mb-3">Something went wrong</h3>
            <p className="text-muted mb-4">
              An unexpected error occurred. Please refresh the page or go back home.
            </p>
            <button
              className="btn btn-success px-4"
              onClick={() => {
                this.setState({ hasError: false });
                window.location.href = "/";
              }}
            >
              Go to Homepage
            </button>
          </Container>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
