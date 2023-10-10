import React, { useState, useContext } from "react";
import HomePage from "./Components/UI/HomePage/HomePage";
import AdminHomePage from "./Pages/AdminHomePage/AdminHomePage";
import UserHomePage from "./Pages/UserHomePage/UserHomePage";
import NotFound from "./Pages/NotFound/NotFound";
/**Componentes para las vistas principales ------------------------------*/
import Login from "./Pages/LoginPage/Login";
import Signup from "./Pages/SignupPage/Signup";
import CreateRequest from "./Pages/CreateRequest/CreateRequest";
import SearchRequest from "./Pages/SearchRequest/SearchRequest";
import MyRequest from "./Pages/UserOwnRequest/MyRequests";
import ChatsView from "./Pages/ChatPage/ChatsView";
import ComplaintView from "./Pages/Complaints/ComplaintView";
import MyPostulations from "./Pages/UserPostulations/MyPostulations";
import QuestionView from "./Pages/Questions/QuestionView";
import ReportsView from "./Pages/Reports/ReportsView";
import SettingsView from "./Pages/Settings/SettingsView";
import TutorialsView from "./Pages/Tutorials/TutorialsView";
/*-------------------------------------------------------------------------- */
import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import RequireAuth from "./Components/RequireAuth/RequireAuth";
function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/*Public routes*/}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/not_found" element={<NotFound />} />
                <Route path="/sign_up" element={<Signup />} />
                <Route path="/Home_2001" element={<AdminHomePage />} />
                <Route element={<RequireAuth allowedRoles={['1017','2001']}/>}>
                    <Route path="/1017/home" element={<UserHomePage />} />
                    <Route path="/1017/create_request" element={<CreateRequest />} />
                    <Route path="/1017/search-request" element={<SearchRequest />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
