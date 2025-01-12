import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ isLoggedIn }) {
  console.log(isLoggedIn)
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
