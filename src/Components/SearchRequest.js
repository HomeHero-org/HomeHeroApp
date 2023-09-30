import React, { useState, useEffect, useContext } from "react";
import styles from "./SearchRequest.module.css";
import MainBanner from "./UI/MainBanner";
import QuoteMessage from "./UI/QuoteMessage";
import InfoSection from "./UI/InfoSection";
import ReqNormalCard from "./UI/ReqNormalCard";
import ExtendedCard from "./UI/ExtendedCard";
import PageContext from "../Store/page-context";

const Requestlist = (props) => {
    const ctx = useContext(PageContext);

    if (ctx.isLoading) {
        return <h2>Loading.....</h2>;
    } else {
        return (
            <>
                {ctx.requests.map((request) => (
                    <ReqNormalCard
                        key={request.requestID}
                        picture={`data:image/jpeg;base64,${request.requestPicture}`}
                        infoReq={{
                            title: request.requestTitle,
                            location: request.locationServiceID, // puedes mapear el ID a una ubicación real
                            description: request.requestContent,
                            numHeroes: request.membersNeeded,
                            date: new Date(
                                request.publicationReqDate
                            ).toLocaleDateString(),
                            category: "", // si la API no proporciona la categoría, necesitas proporcionarla de alguna otra forma
                        }}
                        showExtendInfo={() => props.showExtendedInfoHandler(request)}
                    />
                ))}
            </>
        );
    }
};

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

const SearchRequest = (props) => {
    /** Guardar la consulta de request */
    const ctx = useContext(PageContext);
    const [isShowCard, setShowCard] = useState(false);
    const [showExtendedCard, setShowExtendedCard] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [isShowExtendCard, setShowExtendCard] = useState(false);
    const [isShowFilters, setShowFilters] = useState(false);

    let selectedCard = null;

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

    const showExtendedInfoHandler = (request) => {
        console.log("a");
        setShowExtendedCard(true);
        setSelectedRequest(request);
    };

    const clearExtendCard = () => {
        setShowExtendCard(false);
        document.body.style.overflow = "auto";
    };

    return (
        <React.Fragment>
            {isShowExtendCard && (
                <ExtendedCard
                    infoReq={ctx.requests[1]}
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
                            className={`fa-solid fa-circle-chevron-down fa-lg ${
                                isShowFilters ? styles.open : ""
                            }`}
                        ></i>
                        {isShowFilters && <AdvancedFilters />}
                    </div>
                </div>
            </MainBanner>
            <InfoSection>
                <Requestlist showExtendedInfoHandler={showExtendedInfoHandler}/>
            </InfoSection>
        </React.Fragment>
    );
};

export default SearchRequest;
