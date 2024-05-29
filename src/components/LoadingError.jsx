import React from "react";

const LoadingError = ({ loading, error }) => {
  if (loading) return <p className="loading-message">Loading...</p>;
  if (error)
    return (
      <p className="error-message">
        Error loading flight details: {error.message}
      </p>
    );
};

export default LoadingError;
