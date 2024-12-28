import React from "react";
import Loading from "../Loading";

const Button = ({ onClick, children, className, type = "button", isLoading = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-8 py-3 text-lg md:text-xl font-medium text-white bg-primary hover:bg-primary-dark rounded-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-300 ${className}`}
    >
      {isLoading? <Loading /> : children}
    </button>
  );
};

export default Button;