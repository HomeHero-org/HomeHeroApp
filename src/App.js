import React, { useState, useContext } from "react";
import HomePage from "./Components/UI/HomePage/HomePage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Pages/LoginPage/Login";
/**Componentes para las vistas principales ------------------------------*/
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
    /*   const ctx = useContext(PageContext);

    const [isCollapseMenu, setCollapseMenu] = useState(false);
    const collapseMenuHandler = () => {
        setCollapseMenu(!isCollapseMenu);
    };

    const getViewHandler = (nameComponent) => {
        ctx.onGetView(nameComponent);
    }

    if(ctx.isLogged){
        return (
            <div className={`${styles.main_content} ${isCollapseMenu ? styles.menu_collapsed: undefined}`}>
                <Sidebar getViewHandler={getViewHandler} isCollapseMenu={isCollapseMenu} />
                <Navbar collapseMenuHandler={collapseMenuHandler}></Navbar>
                {ctx.mainView}
            </div>
        );
    };

    return (
        <div className={styles.background_home}>
            <HomePage />
        </div>
    );*/

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/> } />
                <Route path="/login" element={<Login/> } />
            </Routes>
        </Router>
    );
}

export default App;
