import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../auth/Firebase/Firebase.config';
import Loading from '../Loading/Loading';

export default function ProtectedRoutes({ children }: any) {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
  }
  return children;
}
