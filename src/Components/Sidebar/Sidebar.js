import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import styles from "./Sidebar.module.css";
import imgProfile from "../../Images/userPf1.jpg";
import PageContext from "../../Store/page-context";
import { useNavigate } from "react-router-dom";

const ItemMenu = (props) => {
    const navigate = useNavigate();
    const ctx = useContext(PageContext);
    const [isShowSubmenu, setShowSubmenu] = useState(false);
    const showSubmenuHandler = () => {
        setShowSubmenu(!isShowSubmenu);
    };
    if (props.infoItem.subItems) {
        return (
            <li className={isShowSubmenu ? styles.show_menu : undefined}>
                <div className={styles.icon_link}>
                    <a>
                        <i className={props.infoItem.icon}></i>
                        <span className={styles.link_name}>
                            {props.infoItem.itemName}
                        </span>
                    </a>
                    <i
                        onClick={showSubmenuHandler}
                        className={`fa-solid fa-angle-down ${styles.arrow}`}
                    ></i>
                </div>
                <ul className={styles.sub_menu}>
                    <li>
                        <a className={styles.link_name}>
                            {props.infoItem.itemName}
                        </a>
                    </li>
                    {props.infoItem.subItems.map((subItem, index) => {
                        return (
                            <li key={index}>
                                <a className={styles.subItem_menu} onClick={() => navigate(`/1017/${subItem.id}`)}>{subItem.name}</a>
                            </li>
                        );
                    })}
                </ul>
            </li>
        );
    } else {
        return (
            <li className={isShowSubmenu ? styles.show_menu : undefined}>
                    <a className={styles.pointer} onClick={() => props.getViewHandler(props.infoItem.id)}>
                        <i className={props.infoItem.icon}></i>
                        <span className={styles.link_name}>
                            {props.infoItem.itemName}
                        </span>
                    </a>
                    <ul className={`${styles.sub_menu} ${styles.blank}`}>
                        <li><a className={styles.link_name} onClick={() => props.getViewHandler(props.infoItem.id)}>{props.infoItem.itemName}</a></li>
                    </ul>
            </li>
        );
    }
};

const MainSidebar = (props) => {
    const ctx = useContext(PageContext);

    return (
        <div className={`${styles.sidebar} ${props.isCollapseMenu ? styles.close : undefined }`}>
            <div className={styles.logo_details}>
                <i className="fa-solid fa-heading"></i>
                <span className={styles.logo_name}>HomeHero</span>
            </div>
            <ul className={styles.nav_links}>
                {ctx.itemsMenu.map((item, index) => {
                    return <ItemMenu getViewHandler={props.getViewHandler} key={index} infoItem={item} />;
                })}
                <li>
                    <div className={styles.profile_details}>
                        <div className={styles.profile_content}>
                            <img src={imgProfile} alt="Profile image" />
                        </div>
                        <div className={styles.profile_info}>
                            <p className={styles.user_name}>
                                Sebastian Galindo
                            </p>
                            <p className={styles.role}>Begginer</p>
                        </div>
                        <i className="bx bx-log-out bx-sm"></i>
                    </div>
                </li>
            </ul>
        </div>
    );
};

const Sidebar = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <MainSidebar getViewHandler={props.getViewHandler} isCollapseMenu={props.isCollapseMenu} />,
                document.getElementById("sidebar-root")
            )}
        </React.Fragment>
    );
};

export default Sidebar;
