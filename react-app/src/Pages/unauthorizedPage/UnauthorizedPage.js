import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      {/* Unauthorized Message */}
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-primary mb-4">
          401
        </h1>
        <p className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
          Unauthorized Access
        </p>
        <p className="text-gray-600 text-base md:text-lg max-w-md mx-auto">
          You don’t have the required permissions to view this page. Please go
          back or contact your administrator for further assistance.
        </p>
      </div>

      {/* Go Back Button */}
      <div className="mt-6">
      <Button onClick={goBack}>Login first</Button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
