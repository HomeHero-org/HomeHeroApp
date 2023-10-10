import React, { useState, useEffect, useMemo } from "react";
import useCtx from "../../Hooks/useCtx";
import styles from "./SearchRequest.module.css";
import UseRefresherToken from "../../Hooks/useRefresherToken";
import MainBanner from "../../Components/UI/MainBanner/MainBanner";
import QuoteMessage from "../../Components/UI/QuoteMessage/QuoteMessage";
import InfoSection from "../../Components/UI/InfoSection/InfoSection";
import ReqNormalCard from "../../Components/UI/RequestCard/ReqNormalCard";
import ExtendedCard from "../../Components/UI/ExtendedCard/ExtendedCard";

const Requestlist = (props) => {
    const ctx = useCtx();
    const refresh = UseRefresherToken();
    useEffect(() => {
        console.log("Refresh");
        refresh();
       // ctx.onSetRequestAction("NORMAL_SEARCH");
    }, []);

    const filteredRequests = useMemo(() => {
        if (!Array.isArray(ctx.requests)) return [];

        return ctx.requests.filter((request) => {
            if (
                props.selectedCategory &&
                request.requestArea !== props.selectedCategory
            ) {
                return false;
            }
            if ( 
                props.selectedMunicipio &&
                request.requestLocation !== props.selectedMunicipio
            ) {
                return false;
            }
            if (
                props.searchText &&
                !request.requestTitle
                    .toLowerCase()
                    .includes(props.searchText.toLowerCase())
            ) {
                return false;
            }

            return true;
        });
    }, [
        ctx.requests,
        props.selectedCategory,
        props.selectedMunicipio,
        props.searchText,
    ]);

    if (ctx.isLoading) {
        return <h2>Loading.....</h2>;
    } else {
        return (
            <>
                {filteredRequests.map((request) => (
                    <ReqNormalCard
                        key={request.requestID}
                        picture={`data:image/jpeg;base64,${request.requestPicture}`}
                        infoReq={{
                            title: request.requestTitle,
                            location: request.requestLocation,
                            description: request.requestContent,
                            numHeroes: request.membersNeeded,
                            date: new Date(
                                request.publicationReqDate
                            ).toLocaleDateString(),
                            category: request.requestArea,
                        }}
                        showExtendInfo={() =>
                            props.showExtendedInfoHandler(request)
                        }
                    />
                ))}
            </>
        );
    }
};

const AdvancedFilters = (props) => {
    const setSelectedCategory = props.setSelectedCategory;
    const setSelectedMunicipio = props.setSelectedMunicipio;

    return (
        <div className={styles.advancedFiltersContainer}>
            <div className={styles.inputGroup}>
                <label>Categoria</label>
                <select
                    onChange={(e) => {
                        const selectedContent =
                            e.target.options[e.target.selectedIndex]
                                .textContent;
                        setSelectedCategory(selectedContent);
                    }}
                >
                    <option value="1">Fontanería</option>
                    <option value="2">Educación</option>
                    <option value="3">Mascotas</option>
                    <option value="4">Medicina</option>
                </select>
            </div>
            <div className={styles.inputGroup}>
                <label>Municipio</label>
                <select
                    onChange={(e) => {
                        const selectedContent =
                            e.target.options[e.target.selectedIndex]
                                .textContent;
                        setSelectedMunicipio(selectedContent);
                    }}
                >
                    <option value="1">Facatativa</option>
                    <option value="2">San Juan</option>
                    <option value="3">Bogota</option>
                    <option value="4">Madrid</option>
                </select>
            </div>
        </div>
    );
};

const SearchRequest = (props) => {
    /** Guardar la consulta de request */
    const ctx = useCtx();
    const [isShowCard, setShowCard] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [isShowExtendCard, setShowExtendCard] = useState(false);
    const [isShowFilters, setShowFilters] = useState(false);

    //
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedMunicipio, setSelectedMunicipio] = useState(null);
    const [searchText, setSearchText] = useState("");

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    let selectedCard = null;

    const showFiltersHandler = () => {
        setShowFilters(!isShowFilters);
    };

    const onShowCard = (info) => {
        setShowCard(info);
    };
    const showExtendInfo = (isShow, reqInfo) => {
        setShowExtendCard(isShow);
        selectedCard = reqInfo;
        document.body.style.overflow = "hidden";
    };

    const showExtendedInfoHandler = (request) => {
        setShowExtendCard(true);
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
                    infoReq={selectedRequest}
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
                        <input
                            placeholder="Buscar"
                            value={searchText}
                            onChange={handleSearchChange}
                        />
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
                        {isShowFilters && (
                            <AdvancedFilters
                                setSelectedCategory={setSelectedCategory}
                                setSelectedMunicipio={setSelectedMunicipio}
                            />
                        )}
                    </div>
                </div>
            </MainBanner>
            <InfoSection>
                <Requestlist
                    showExtendedInfoHandler={showExtendedInfoHandler}
                    selectedCategory={selectedCategory}
                    selectedMunicipio={selectedMunicipio}
                    searchText={searchText} // Pasa searchText como prop
                />
            </InfoSection>
        </React.Fragment>
    );
};

export default SearchRequest;
