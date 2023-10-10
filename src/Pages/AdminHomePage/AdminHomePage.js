import styles from './AdminHomePage.module.css';
import { useState } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';

const AdminHomePage = () => {

    const [isCollapseMenu, setCollapseMenu] = useState(true);
    const collapseMenuHandler = () => {
        setCollapseMenu(!isCollapseMenu);
    };

    const getViewHandler = (nameComponent) => {
    };

    return (
        <div className={`${styles.main_content} ${isCollapseMenu ? styles.menu_collapsed: undefined}`}>
            <Sidebar getViewHandler={getViewHandler} isCollapseMenu={isCollapseMenu} />
            <Navbar collapseMenuHandler={collapseMenuHandler}></Navbar>
            <h1>Hola esta es la pagina para el admin</h1>
        </div>

    );
};

export default AdminHomePage;