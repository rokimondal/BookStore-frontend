import { Navigate, Outlet } from "react-router-dom";


const AdminRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const tokenSavedAt = localStorage.getItem('tokenSavedAt');
    if (!token || !tokenSavedAt) return <Navigate to={'/admin'} />
    const savedDate = new Date(tokenSavedAt);
    const now = new Date();
    const TimeInMinutes = Math.floor((now - savedDate) / (1000 * 60));
    if (TimeInMinutes >= 60) return <Navigate to={'/admin'} />
    return children ? children : <Outlet />
}
export default AdminRoute;