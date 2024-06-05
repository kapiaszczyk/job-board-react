import React from "react";
import { Route, Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

/**
 * PrivateRoute component to protect routes.
 * 
 * @param {Object} param0
 * @returns {JSX.Element}
 * 
 */
const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props => {
          const currentUser = getCurrentUser();
          if (!currentUser) {
            return <Navigate to="/login" replace={true} />;
          }
  
          if (rest.path.startsWith('/admin') && currentUser.role !== 'admin') {
            return <Navigate to="/user" replace={true} />;
          }
  
          return <Component {...props} />;
        }}
      />
    );
  };
  
export default PrivateRoute;
