import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => window.location.reload();

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "#f8f9fa",
            color: "#333",
            fontFamily: "Inter, sans-serif",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <h1>⚠️ Something went wrong.</h1>
          <p>Try refreshing the page or come back later.</p>
          <button
            onClick={this.handleReload}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            🔄 Reload Page
          </button>

          {process.env.NODE_ENV === "development" && (
            <details
              style={{
                marginTop: "1rem",
                background: "#fff",
                borderRadius: "8px",
                padding: "10px",
                textAlign: "left",
                maxWidth: "600px",
                overflow: "auto",
              }}
            >
              <summary>Error details</summary>
              <pre style={{ whiteSpace: "pre-wrap", color: "#c00" }}>
                {this.state.error?.toString()}
                {"\n"}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
