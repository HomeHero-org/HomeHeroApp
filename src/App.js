import React, { useState } from "react";
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

function App() {

    const listViews = {
        ['CreateRequest']: <CreateRequest/>,
        ['SearchRequest']: <SearchRequest/>,
        ['MyRequests']:<MyRequest/>,
        ['ChatsView']:<ChatsView/>,
        ['ComplaintView']:<ComplaintView/>,
        ['MyPostulations']:<MyPostulations/>,
        ['QuestionView']:<QuestionView/>,
        ['ReportsView']:<ReportsView/>,
        ['SettingsView']:<SettingsView/>,
        ['TutorialsView']:<TutorialsView/>
    }

    const [isCollapseMenu, setCollapseMenu] = useState(false);
    const [mainView,setMainView] = useState(<></>);

    const collapseMenuHandler = () => {
        setCollapseMenu(!isCollapseMenu);
    };

    const getViewHandler = (nameComponent) => {
        setMainView(listViews[nameComponent]);
    }

    return (
        <div className={`${styles.main_content} ${isCollapseMenu ? styles.menu_collapsed: undefined}`}>
            <Sidebar getViewHandler={getViewHandler} isCollapseMenu={isCollapseMenu} />
            <Navbar collapseMenuHandler={collapseMenuHandler}></Navbar>
            {mainView}
        </div>
    );
}

export default App;
