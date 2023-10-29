 import React, { useState, useEffect, useMemo } from "react";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import useCtx from "../../Hooks/useCtx";
import styles from "./SearchRequest.module.css";
import MainBanner from "../../Components/UI/MainBanner/MainBanner";
import QuoteMessage from "../../Components/UI/QuoteMessage/QuoteMessage";
import InfoSection from "../../Components/UI/InfoSection/InfoSection";
import ReqNormalCard from "../../Components/UI/RequestCard/ReqNormalCard";
import ExtendedCard from "../../Components/UI/ExtendedCard/ExtendedCard";
import { useTranslation } from 'react-i18next';

const Requestlist = (props) => {
    const ctx = useCtx();
    const axiosPrivate = useAxiosPrivate();
    const { t } = useTranslation();

    
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const normalSearchFetch = async () => {
            try {
                ctx.setIsLoading(true);
                const response = await axiosPrivate.get(`Request`, {
                    signal: controller.signal,
                });
                ctx.setRequests(response.data.result);
            } catch (error) {
                console.error("Error fetching requests:", error);
            }
        };
        normalSearchFetch();

        return () => {
            isMounted = false;
            controller.abort();
        }
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
        return <h2>{t('loading')}</h2>;
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
    const { t } = useTranslation();

    return (
        <div className={styles.advancedFiltersContainer}>
            <div className={styles.inputGroup}>
                <label>{t('category')}</label>
                <select
                    onChange={(e) => {
                        const selectedContent =
                            e.target.options[e.target.selectedIndex]
                                .textContent;
                        setSelectedCategory(selectedContent);
                    }}
                >
                    <option value="1">{t('plumbing')}</option>
                    <option value="2">{t('education')}</option>
                    <option value="3">{t('pets')}</option>
                    <option value="4">{t('medicine')}</option>
                </select>
            </div>
            <div className={styles.inputGroup}>
                <label>{t('Municipality')}</label>
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
    const { t } = useTranslation();

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
                        <h1>{t('Search')}</h1>
                        <h2>{t('of solutions')}</h2>
                    </div>
                    <QuoteMessage
                        messageHead={t('What_do_you_want_to_attend_to_today')}
                        messagePg={t('What_ever_it_is_we_know_you_will_do_it_well')}
                    />
                </div>
                <div className={styles.filters}>
                    <div className={styles.searchBar}>
                        <input
                            placeholder={t("Explore") }
                            value={searchText}
                            onChange={handleSearchChange}
                        />
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <div className={styles.advancedFilters}>
                        <span>{t('filters')}</span>
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
