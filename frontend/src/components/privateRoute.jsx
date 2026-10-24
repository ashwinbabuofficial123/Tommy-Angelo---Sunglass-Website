import { Navigate, Outlet } from "react-router-dom";
import { checkToken } from "../../utils/checkToken";

export const PrivateRoute = () => {
  return checkToken() ? <Outlet /> : <Navigate to={"/login"} />;
};
