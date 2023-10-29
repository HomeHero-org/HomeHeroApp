import styles from './AdminHomePage.module.css';
import { useState } from 'react';

const AdminHomePage = () => {

    console.log("Entro aqui");

    const [isCollapseMenu, setCollapseMenu] = useState(true);
    const collapseMenuHandler = () => {
        setCollapseMenu(!isCollapseMenu);
    };

    const getViewHandler = (nameComponent) => {
    };

    return (
        <div className={styles.main_content}>
            <h1>Hola esta es la pagina para el admin</h1>
        </div>

    );
};

export default AdminHomePage;