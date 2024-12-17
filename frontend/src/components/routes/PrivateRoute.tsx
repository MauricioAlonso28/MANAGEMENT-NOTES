import { useEffect, useState } from 'react'
import { verifyAuth } from '../../services/users.services';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await verifyAuth();
      
      setIsAuthenticated(authenticated);
    };
    checkAuth();
  }, []);
  
  if (isAuthenticated === null) {
    return <div>Loading...</div>; 
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute