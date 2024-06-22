import React from "react";

interface ErrorProps {
  error: string;
}

const CustomError: React.FC<ErrorProps> = ({ error }) => {
  return (
    <div className="error-container">
      <p>Error: {error}</p>
    </div>
  );
};

export default CustomError;
