import React, { useState, useContext } from "react";
import HomePage from "./Components/UI/HomePage/HomePage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
/**Componentes para las vistas principales ------------------------------*/
import Login from "./Pages/LoginPage/Login";
import Signup from "./Pages/SignupPage/Signup";
import CreateRequest from "./Components/CreateRequest";
import SearchRequest from "./Components/SearchRequest";
import MyRequest from "./Components/MyRequests";
import ChatsView from "./Components/ChatsView";
import ComplaintView from "./Components/ComplaintView";
import MyPostulations from "./Components/MyPostulations";
import QuestionView from "./Components/QuestionView";
import ReportsView from "./Components/ReportsView";
import SettingsView from "./Components/SettingsView";
import TutorialsView from "./Components/TutorialsView";
/** ---------------------------------------------------------------------*/
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import styles from "./App.module.css";
import PageContext from "./Store/page-context";

function App() {
    const ctx = useContext(PageContext);

    const [isCollapseMenu, setCollapseMenu] = useState(true);
    const collapseMenuHandler = () => {
        setCollapseMenu(!isCollapseMenu);
    };

    const getViewHandler = (nameComponent) => {
        ctx.onGetView(nameComponent);
    };

    return (
        <div
            className={`${styles.main_content} ${
                isCollapseMenu ? styles.menu_collapsed : undefined} ${ctx.isLogged ? undefined : styles.no_navbar}`}
        >
            <Router>
                {ctx.isLogged && (
                    <>
                        <Sidebar
                            getViewHandler={getViewHandler}
                            isCollapseMenu={isCollapseMenu}
                        />
                        <Navbar
                            isCollapseMenu={isCollapseMenu} collapseMenuHandler={collapseMenuHandler}
                        ></Navbar>
                    </>
                )}
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Signup" element={<Signup />} />
                    <Route path="/CreateRequest" element={<CreateRequest />} />
                    <Route path="/SearchRequest" element={<SearchRequest />} />
                    <Route path="/MyRequests" element={<MyRequest/>} />
                    <Route path="/Chats" element={<ChatsView />} />
                    <Route path="/Complaints" element={<ComplaintView />} />
                    <Route path="/Postulations" element={<MyPostulations />} />
                    <Route path="/Questions" element={<QuestionView />} />
                    <Route path="/Reports" element={<ReportsView />} />
                    <Route path="/Settings" element={<SettingsView />} />
                    <Route path="/Tutorials" element={<TutorialsView />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
