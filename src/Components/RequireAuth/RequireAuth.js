import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useState } from "react";
import useCtx from "../../Hooks/useCtx";
import decodeJWT from "../../Hooks/decodeJWT";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import styles from './RequireAuth.module.css';

const RequireAuth = ({ allowedRoles }) => {
    const [isCollapseMenu, setCollapseMenu] = useState(true);
    const collapseMenuHandler = () => {
        setCollapseMenu(!isCollapseMenu);
    };

    const getViewHandler = (nameComponent) => {};

    const { token} = useCtx();
    const decodedToken = token ? decodeJWT(token) : null;
    const location = useLocation();
    return allowedRoles.includes(decodedToken?.role) ? (
        <div
            className={`${styles.main_content} ${
                isCollapseMenu ? styles.menu_collapsed : undefined
            }`}
        >
            <Sidebar
                getViewHandler={getViewHandler}
                isCollapseMenu={isCollapseMenu}
            />
            <Navbar collapseMenuHandler={collapseMenuHandler}></Navbar>
            <Outlet />
        </div>
    ) : decodedToken ? (
        <Navigate to="/not_found" state={{ from: location }} replace />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;
