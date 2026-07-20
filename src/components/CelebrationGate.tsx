import { Navigate, Outlet } from 'react-router-dom';
import { useAppData } from '../context/AppProvider';

/** Redirects to celebration when the jar is full until the user acknowledges. */
export function CelebrationGate() {
  const { jar, jarTarget } = useAppData();

  if (jar.currentCount >= jarTarget) {
    return <Navigate to="/celebration" replace />;
  }

  return <Outlet />;
}
