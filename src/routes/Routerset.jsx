import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import OnBoardingProcess from "../pages/OnBoarding/OnBoardingProcess";
import SignInView from "../pages/OnBoarding/Sign in/SignInView";
import SignUpView from "../pages/OnBoarding/Sign up/SignUpView";
import DashboardLayout from "../pages/Layout/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import { AuthContext } from "../context/AuthContext";
import Orders from "../pages/Dashboard/Orders/Orders";
import Customers from "../pages/Dashboard/Customers/Customers";
import Books from "../pages/Dashboard/Books/Books";

const Routerset = () => {
  const { admin } = useContext(AuthContext);

  return (
    <Routes>
      {/* -----------------------------basic routes----------------------------- */}
      <Route path="onboarding/*" element={<OnBoardingProcess />}>
        <Route path="" element={<SignInView />} />
        <Route path="sign-in" element={<SignInView />} />
      </Route>

      {/* -----------------------------private & public routes----------------------------- */}
      {admin !== null ? (
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Orders />} />
          <Route path="orders" element={<Orders />} />
          <Route path="books" element={<Books />} />
          <Route path="customers" element={<Customers />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/onboarding/sign-in" />} />
      )}
    </Routes>
  );
};

export default Routerset;

const PublicRoutes = ({ element, allow }) => {
  const { block, user } = useContext(AuthContext);

  if (block) {
    if (allow) {
      if (user?.role === 3) {
        return element;
      } else {
        // return <Navigate to="/unauthorized-error" replace />;
        return element;
      }
    } else {
      return <Navigate to="/subscription-expired" replace />;
    }
  } else {
    return element;
  }
};

const PrivateRoute = ({ element }) => {
  const { isAuthChack, setIsAuthChack } = useContext(AuthContext);

  if (!isAuthChack) {
    return element;
  } else {
    return <Navigate to="/onboarding/sign-up" replace />;
  }
};
