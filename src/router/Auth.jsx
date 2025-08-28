import { Navigate } from "react-router";

const Auth = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  return token && (role === "admin") ?  children : <Navigate to="/home" />

};

export default Auth;
