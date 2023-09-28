import React, { useState } from "react";
import styles from "./SearchRequest.module.css";
import MainBanner from "./UI/MainBanner";
import QuoteMessage from "./UI/QuoteMessage";
import CreateForm from "./CreateForm";
import InfoSection from "./UI/InfoSection";
import ReqNormalCard from "./UI/ReqNormalCard";
import ExtendedCard from "./UI/ExtendedCard";

/** IMAGENES DE LOS REQUESTS DE PRUEBA
 */
import req01 from "../Images/req01.jpg";
import req02 from "../Images/req02.jpg";
import req03 from "../Images/req03.jpg";
import req04 from "../Images/req04.jpg";
import req05 from "../Images/req05.jpg";
import req06 from "../Images/req06.jpg";

const AdvancedFilters = (props) => {
    return (
        <div className={styles.advancedFiltersContainer}>
            <div className={styles.inputGroup}>
                <label>Categoria</label>
                <select>
                    <option value="opcion1">Fontanería</option>
                    <option value="opcion2">Educación</option>
                    <option value="opcion3">Mascotas</option>
                    <option value="opcion4">Medicina</option>
                </select>
            </div>
            <div className={styles.inputGroup}>
                <label>Municipio</label>
                <select>
                    <option value="opcion1">Facatativa</option>
                    <option value="opcion2">San Juan</option>
                    <option value="opcion3">Bogota</option>
                    <option value="opcion4">Madrid</option>
                </select>
            </div>
        </div>
    );
};

const SearchRequest = () => {
    /** Guardar la consulta de request */
    const requests = [
        {
            title: "Titulo Solicitud #1 de almenos varias lineas",
            description:
                "Lorem ipsum dolor sit amet consectetur. Massa lorem pellentesque sed pellentesque malesuada diam. Nec mattis velit ac odio duis. Diam adipiscing risus eget nunc nisl convallis. Felis vitae duis in vitae consectetur. Lacus tempus est est nulla.Luctus urna arcu interdum est sagittis arcu egestas elit suspendisse.",
            location: "Municipio",
            numHeroes: "##",
            date: "##/##/####",
            category: "Nombre Categoria",
            image: req01,
        },
        {
            title: "Titulo Solicitud #2 de almenos varias lineas",
            description:
                "Lorem ipsum dolor sit amet consectetur. Massa lorem pellentesque sed pellentesque malesuada diam. Nec mattis velit ac odio duis. Diam adipiscing risus eget nunc nisl convallis. Felis vitae duis in vitae consectetur. Lacus tempus est est nulla.Luctus urna arcu interdum est sagittis arcu egestas elit suspendisse.",
            location: "Municipio",
            numHeroes: "##",
            date: "##/##/####",
            category: "Nombre Categoria",
            image: req02,
        },
        {
            title: "Titulo Solicitud #3 de almenos varias lineas",
            description:
                "Lorem ipsum dolor sit amet consectetur. Massa lorem pellentesque sed pellentesque malesuada diam. Nec mattis velit ac odio duis. Diam adipiscing risus eget nunc nisl convallis. Felis vitae duis in vitae consectetur. Lacus tempus est est nulla.Luctus urna arcu interdum est sagittis arcu egestas elit suspendisse.",
            location: "Municipio",
            numHeroes: "##",
            date: "##/##/####",
            category: "Nombre Categoria",
            image: req03,
        },
        {
            title: "Titulo Solicitud #4 de almenos varias lineas",
            description:
                "Lorem ipsum dolor sit amet consectetur. Massa lorem pellentesque sed pellentesque malesuada diam. Nec mattis velit ac odio duis. Diam adipiscing risus eget nunc nisl convallis. Felis vitae duis in vitae consectetur. Lacus tempus est est nulla.Luctus urna arcu interdum est sagittis arcu egestas elit suspendisse.",
            location: "Municipio",
            numHeroes: "##",
            date: "##/##/####",
            category: "Nombre Categoria",
            image: req04,
        },
        {
            title: "Titulo Solicitud #5 de almenos varias lineas",
            description:
                "Lorem ipsum dolor sit amet consectetur. Massa lorem pellentesque sed pellentesque malesuada diam. Nec mattis velit ac odio duis. Diam adipiscing risus eget nunc nisl convallis. Felis vitae duis in vitae consectetur. Lacus tempus est est nulla.Luctus urna arcu interdum est sagittis arcu egestas elit suspendisse.",
            location: "Municipio",
            numHeroes: "##",
            date: "##/##/####",
            category: "Nombre Categoria",
            image: req05,
        },
        {
            title: "Titulo Solicitud #6 de almenos varias lineas",
            description:
                "Lorem ipsum dolor sit amet consectetur. Massa lorem pellentesque sed pellentesque malesuada diam. Nec mattis velit ac odio duis. Diam adipiscing risus eget nunc nisl convallis. Felis vitae duis in vitae consectetur. Lacus tempus est est nulla.Luctus urna arcu interdum est sagittis arcu egestas elit suspendisse.",
            location: "Municipio",
            numHeroes: "##",
            date: "##/##/####",
            category: "Nombre Categoria",
            image: req06,
        },
    ];

    let selectedCard = null;
    const [isShowCard, setShowCard] = useState(false);
    const [isShowExtendCard, setShowExtendCard] = useState(false);
    const [isShowFilters, setShowFilters] = useState(false);

    const showFiltersHandler = () => {
        setShowFilters(!isShowFilters);
    };

    const onShowCard = (info) => {
        setShowCard(info);
    };
    const showExtendInfo = (isShow, reqInfo) => {
        console.log(reqInfo);
        setShowExtendCard(isShow);
        selectedCard = reqInfo;
        document.body.style.overflow = "hidden";
    };

    const clearExtendCard = () => {
        setShowExtendCard(false);
        document.body.style.overflow = "auto";
    };

    return (
        <React.Fragment>
            {isShowExtendCard && (
                <ExtendedCard
                    infoReq={requests[1]}
                    clearExtendCard={clearExtendCard}
                />
            )}
            <MainBanner>
                <div className={styles.bannerMessage}>
                    <div className={styles.mainMessage}>
                        <h1>Busqueda</h1>
                        <h2>de solicitudes</h2>
                    </div>
                    <QuoteMessage
                        messageHead="¿Que deseas atender hoy?"
                        messagePg='"Lo que sea sabemos que lo harás bien"'
                    />
                </div>
                <div className={styles.filters}>
                    <div className={styles.searchBar}>
                        <input placeholder="Buscar" />
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <div className={styles.advancedFilters}>
                        <span>Filtros</span>
                        <i
                            onClick={showFiltersHandler}
                            className={`fa-solid fa-circle-chevron-down fa-lg ${isShowFilters ? styles.open : ''}`}
                        ></i>
                        {isShowFilters && <AdvancedFilters/>}
                    </div>
                </div>
            </MainBanner>
            <InfoSection>
                {requests &&
                    requests.map((request, index) => {
                        return (
                            <ReqNormalCard
                                key={index}
                                infoReq={request}
                                showExtendInfo={showExtendInfo}
                            />
                        );
                    })}
            </InfoSection>
        </React.Fragment>
    );
};

export default SearchRequest;
