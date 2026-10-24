import { Navigate } from "react-router-dom";

// Wrap any page with this to allow only logged-in Admins.
// Everyone else is sent back to the home page "/".
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")); // saved in LoginCard

  // CHANGE "role" if your user field has a different name
  if (!token || user?.role !== "Admin") {
    return <Navigate to="/" />;
  }

  return children; // is Admin -> show the page
};

export default AdminRoute;
