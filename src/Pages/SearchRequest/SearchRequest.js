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
import { API_COLOMBIA } from "../../config"
import axios from "axios"

const Requestlist = (props) => {
    const ctx = useCtx();
    const axiosPrivate = useAxiosPrivate();
    const [cityNames, setCityNames] = useState({});
    
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
            if (props.selectedCategory && request.requestArea !== props.selectedCategory) {
                return false;
            }

            if (props.selectedMunicipio && String(request.locationServiceID) !== String(props.selectedMunicipio)) {
                console.log("Entra a validacion!");
                return false;
            }

            if (props.searchText && !request.requestTitle.toLowerCase().includes(props.searchText.toLowerCase())) {
                return false;
            }

            return true;
        });
    }, [ctx.requests, props.selectedCategory, props.selectedMunicipio, props.searchText]);


    const { t } = useTranslation();
   

    useEffect(() => {
        const fetchCityName = async (cityId) => {
            try {
                const response = await axios.get(`${API_COLOMBIA}City/${cityId}`);
                setCityNames(prev => ({ ...prev, [cityId]: response.data.name }));
            } catch (error) {
                console.error("Error fetching city name:", error);
            }
        };

        if (ctx.requests) {
            ctx.requests.forEach(request => {
                if (request.locationServiceID && !cityNames[request.locationServiceID]) {
                    fetchCityName(request.locationServiceID);
                }
            });
        }

    }, [ctx.requests, cityNames]);


    if (ctx.isLoading) {
        return <h2>{t('es') }</h2>;
    } else {
        return (
            <>
                {filteredRequests.map((request) => {
    const cityName = cityNames[request.locationServiceID] || 'Loading...';
    return (
        <ReqNormalCard
            key={request.requestID}
            picture={`data:image/jpeg;base64,${request.requestPicture}`}
            infoReq={{
                title: request.requestTitle,
                location: cityName, 
                description: request.requestContent,
                numHeroes: request.membersNeeded,
                date: new Date(request.publicationReqDate).toLocaleDateString(),
                category: request.requestArea,
            }}
            showExtendInfo={() => props.showExtendedInfoHandler(request)}
        />
    );
})}


            </>
        );
    }
};

const AdvancedFilters = (props) => {
    const ctx = useCtx();
    const { t } = useTranslation();

    const setLocationServiceID = props.setLocationServiceID;

    return (

        <div className={styles.advancedFiltersContainer}>
            <div className={styles.inputGroup}>
                <label>{t('category')}</label>
                <select
                    onChange={(e) => {
                        const selectedContent =
                            e.target.options[e.target.selectedIndex]
                                .textContent;
                        props.setSelectedCategory(selectedContent);
                    }}
                >
                    <option value="1">{t('plumbing')}</option>
                    <option value="2">{t('education')}</option>
                    <option value="3">{t('pets')}</option>
                    <option value="4">{t('medicine')}</option>
                </select>
            </div>
            <div className={`${styles.input_group} ${styles.select_group}`}>
                <label>{t('department_where_you_live')}</label>
                <select
                    className={styles.customInput}
                    id="department"
                    defaultValue={0}
                    onChange={(e) => {
                        ctx.SetSelDepartment(e.target.value);
                    }}
                >
                    <option value="0" disabled>
                        {t('departamento')}
                    </option>
                    {ctx.departamentList &&
                        ctx.departamentList.map((department) => (
                            <option
                                key={department.id}
                                value={department.id}
                            >
                                {department.name}
                            </option>
                        ))}
                </select>
            </div>
            <div className={`${styles.input_group} ${styles.select_group}`}>
                <label>{t('City where you live')}</label>
                <select
                    id="ciudad"
                    defaultValue={0}
                    onChange={(e) => {
                        setLocationServiceID(e.target.value);
                        props.setSelectedMunicipio(e.target.value);
                    }}
                >


                    <option value="0" disabled>
                        {t('city')}
                    </option>
                    {ctx.citiesList &&
                        ctx.citiesList.map((city) => (
                            <option key={city.id} value={city.id}>
                                {city.name}
                            </option>
                        ))}
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
    const [locationServiceID, setLocationServiceID] = useState(0);
    const [cityNames, setCityNames] = useState({});
    const ctx = useCtx();
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

    useEffect(() => {
        const fetchCityName = async (cityId) => {
            try {
                const response = await axios.get(`${API_COLOMBIA}City/${cityId}`);
                setCityNames(prev => ({ ...prev, [cityId]: response.data.name }));
            } catch (error) {
                console.error("Error fetching city name:", error);
            }
        };

        if (ctx.requests) {
            ctx.requests.forEach(request => {
                if (request.locationServiceID && !cityNames[request.locationServiceID]) {
                    fetchCityName(request.locationServiceID);
                }
            });
        }

    }, [ctx.requests, cityNames]);


    const showExtendedInfoHandler = (request) => {

        const cityName = cityNames[request.locationServiceID] || 'Nombre no disponible';

       
        const requestWithCityName = {
            ...request, 
            location: cityName, 
        };

        setShowExtendCard(true);
        setSelectedRequest(requestWithCityName);
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
                        <h2>{t('of_request')}</h2>
                    </div>
                    <QuoteMessage
                        messageHead={t('What_do_you_want_to_attend_to_today')}
                        messagePg={t('What_ever_it_is_we_know_you_will_do_it_well') }
                    />
                </div>
                <div className={styles.filters}>
                    <div className={styles.searchBar}>
                        <input
                            placeholder={t('Search')}
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
                                setLocationServiceID={setLocationServiceID}
                                setSelectedMunicipio={setSelectedMunicipio} 
                                locationServiceID={locationServiceID}
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
                    searchText={searchText} 
 
                />
            </InfoSection>
        </React.Fragment>
    );
};

export default SearchRequest;
