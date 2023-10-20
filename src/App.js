import React, { useState, useContext } from "react";
import HomePage from "./Components/UI/HomePage/HomePage";
import UserHomePage from "./Pages/UserHomePage/UserHomePage";
import AdminHomePage from "./Pages/AdminHomePage/AdminHomePage";
import NotFound from "./Pages/NotFound/NotFound";
/**Componentes para las vistas principales ------------------------------*/
import Login from "./Pages/LoginPage/Login";
import Signup from "./Pages/SignupPage/Signup";
import CreateRequest from "./Pages/CreateRequest/CreateRequest";
import SearchRequest from "./Pages/SearchRequest/SearchRequest";
import SettingsView from "./Pages/Settings/SettingsView";
/*-------------------------------------------------------------------------- */
import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import RequireAuth from "./Components/RequireAuth/RequireAuth";
import PersistLogin from "./Components/PersistLogin";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import UserProfile from "./Pages/UserProfile/UserProfile";
function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/*Public routes*/}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/not_found" element={<NotFound />} />
                <Route path="/sign_up" element={<Signup />} />
                <Route path="/reset_password" element={<ResetPassword />} />

                {/*Protected routes*/}
                <Route path="/~" element={<PersistLogin />}>
                    <Route
                        path="/~/1017"
                        element={
                            <RequireAuth allowedRoles={["1017", "2001"]} />
                        }
                    >
                        <Route path="/~/1017/home" element={<UserHomePage />} />
                        <Route
                            path="/~/1017/create_request"
                            element={<CreateRequest />}
                        />
                        <Route
                            path="/~/1017/search-request"
                            element={<SearchRequest />}
                        />
                        <Route
                            path="/~/1017/profile"
                            element={<UserProfile />}
                        />
                        <Route
                            path="/~/1017/settings"
                            element={<SettingsView />}
                        />
                    </Route>
                    <Route
                        path="/~/2001"
                        element={<RequireAuth allowedRoles={["2001"]} />}
                    >
                        <Route
                            path="/~/2001/home"
                            element={<AdminHomePage />}
                        />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
