import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContex"

export const PrivateRouteWithoutUser = ({ children }) => {
    const { currentUser, loading } = useAuth()
    if (loading) {
        return <div>Loading...</div>
    }
    if (currentUser) {
        return children;
    }
    return (
        <Navigate to="/login" replace></Navigate>
    )
}

export const PrivateRouteWithUser = ({ children }) => {
    const { currentUser, loading } = useAuth()
    if (loading) {
        return <div>Loading...</div>
    }
    if (currentUser) {
        return (
            <Navigate to="/" replace></Navigate>
        )
    }
    return children;
}