import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  component: React.ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
}) => {
  const navigate = useNavigate();

//   useEffect(() => {
//     if (!isAuthenticated()) {
//       navigate("/"); // Redirect to login page if not authenticated
//     }
//   }, [navigate]);

  return <Component />;
};

export default ProtectedRoute;
