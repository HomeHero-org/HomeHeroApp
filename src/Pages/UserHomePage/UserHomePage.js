import styles from './UserHomePage.module.css';
import { useState } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';

const UserHomePage = () => {

    const [isCollapseMenu, setCollapseMenu] = useState(true);
    const collapseMenuHandler = () => {
        setCollapseMenu(!isCollapseMenu);
    };

    const getViewHandler = (nameComponent) => {
    };

    return (
        <div className={`${styles.main_content}`}>
            <h1>Hola esta es la pagina para el usuario</h1>
        </div>

    );
};

export default UserHomePage;