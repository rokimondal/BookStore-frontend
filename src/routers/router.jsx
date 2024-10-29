import { createBrowserRouter, } from "react-router-dom"
import App from "../App"
import Home from "../pages/Home/Home";
import Login from "../components/Login"
import Register from "../components/Register";
import Cart from "../pages/Books/Cart";
import Checkout from "../pages/Books/Checkout";
import SingleBook from "../pages/Books/SingleBook";
import { PrivateRouteWithoutUser, PrivateRouteWithUser } from "./PrivateRoute";
import OrderPage from "../pages/Books/OrderPage";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
import NotFound from "../components/NotFound";
import Dashboard from "../pages/Dashboard/Dashboard";
import UpdateBook from "../pages/Dashboard/EditBook/UpdateBook";
import AddBook from "../pages/Dashboard/addBook/AddBooks";
import ManageBooks from "../pages/Dashboard/manageBook/ManageBooks";
import UserDashboard from "../pages/Dashboard/users/UserDashboard";
import DashBoardLayout from "../pages/DashBoardLayout";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <PrivateRouteWithUser><Login /></PrivateRouteWithUser>
            },
            {
                path: "/register",
                element: <PrivateRouteWithUser><Register /></PrivateRouteWithUser>
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/checkout",
                element: <PrivateRouteWithoutUser><Checkout /></PrivateRouteWithoutUser>
            },
            {
                path: "/books/:id",
                element: <SingleBook />
            },
            {
                path: "/orders",
                element: <PrivateRouteWithoutUser><OrderPage /></PrivateRouteWithoutUser>
            },
            {
                path: "/user-dashboard",
                element: <PrivateRouteWithoutUser><UserDashboard /></PrivateRouteWithoutUser>
            }
        ],
    },
    {
        path: "/admin",
        element: <div><AdminLogin /></div>
    },
    {
        path: "/dashboard",
        element: <AdminRoute><DashBoardLayout /></AdminRoute>,
        children: [
            {
                path: "",
                element: <AdminRoute><Dashboard /></AdminRoute>
            },
            {
                path: "add-new-book",
                element: <AdminRoute><AddBook /></AdminRoute>
            },
            {
                path: "edit-book/:id",
                element: <AdminRoute><UpdateBook /></AdminRoute>
            },
            {
                path: "manage-books",
                element: <AdminRoute><ManageBooks /></AdminRoute>
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
]);
export default router;