import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINT, API_COLOMBIA } from "../config";
import { useTranslation } from 'react-i18next';

/** Create Request HTTP Post handler function
 * Function that Post the information of a new request to the API for Create a Request and save in the BD
 * @param {*} formData contains all the new Request Information
 */

const createRequest = async (formData) => {
    try {
        const response = await axios.post(`${API_ENDPOINT}Request`, formData);
        console.log("Request created successfully:", response.data);
    } catch (error) {
        console.error("Error creating request:", error);
    }
};

/** PageContext
 *  Component for using the React Context API for use data among components
 *  () => {} Represents a functions
 * {} Represents object
 * <></> Represets component
 * [] Represents array
 */
const PageContext = React.createContext({
    listView: {},
    mainView: <></>,
    onGetView: (nameComponent) => {},
    itemsMenu: [],
    requestAction: "",
    onSetRequestAction: () => {},
    requests: [],
    setRequests: () => {},
    isLoading: true,
    setIsLoading: () => {},
    onSetForm: () => {},
    isLogged: true,
    onSetLogged: (info) => {},
    departamentList: [],
    citiesList: [],
    SetSelDepartment: (idDep) => {},
    statusResponse: "",
    setstatusResponse: () => {},
    token: null,
    setToken: () => {},
    codeRole: "",
    setCodeRole: () => {},
    axiosPrivate: () => {},
    remeberLogin: false,
    setRememberLogin: () => {},
});

/** Page React Context API Provider
 *
 * @param {*} props allows the children inside this component
 * @returns a empty component that allows other components inside and pass values for set pageContext variable values
 */

export const PageContextProvider = (props) => {
    const { t } = useTranslation();
    // Info about the diferent pages of user and their routes (id)
    const itemsMenu = [
        {
            itemName:t('Inquiries'),
            icon: "fa-solid fa-hand-holding-heart",
            subItems: [
                {
                    id: "/~/1017/create_request",
                    name: t('create_request')


                },
                {
                    id: "/~/1017/search-request",
                    name: t('search_requests'),
                },
                {
                    id: "/~/1017/MyRequests",
                    name: t('my_requests') ,
                },
                {
                    id: "/~/1017/Postulations",
                    name: t('my_submissions'),
                },
            ],
        },
        {
            itemName: "Chats",
            icon: "fa-solid fa-comments",
            subItems: [
                {
                    id: "Chats",
                    name: t('all'),
                },
                {
                    id: "Chats",
                    name: "Chat 1",
                },
                {
                    id: "Chats",
                    name: "Chat 2",
                },
                {
                    id: "Chats",
                    name: "Chat 3",
                },
                {
                    id: "Chats",
                    name: "Chat 4",
                },
            ],
        },
        {
            itemName: t('help'),
            icon: "fa-regular fa-circle-question",
            subItems: [
                {
                    id: "Tutorials",
                    name: t('tutorials'),
                },
                {
                    id: "Questions",
                    name: t('write_your_questions'),
                },
                {
                    id: "Reports",
                    name: t('report_error')
                },
            ],
        },
        {
            id: "Complaints",
            itemName: t('claims'),
            icon: "fa-solid fa-file-circle-exclamation",
            subItems: null,
        },
        {

            id: "/~/1017/settings",
            itemName: t('settings'),

            icon: "fa-solid fa-gear",
            subItems: null,
        },
    ];
    //#region States For Provides value to createRequest
    const [formData, setFormData] = useState(new FormData());
    const [statusResponse, setstatusResponse] = useState();
    const [mainView, setMainView] = useState(<></>);
    const [requestAction, setRequestAction] = useState("");
    const [requests, setRequests] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLogged, setIsLogged] = useState(false);
    const [departamentList, setDepartamentList] = useState(null);
    const [citiesList, setCitiesList] = useState();
    const [selectedDepartment, setSelDepartment] = useState(0);
    const [tokenData, setTokenData] = useState(null);
    const [codeRole, setCodeRole] = useState("");
    const [remeberLogin, setRememberLogin] = useState(
        JSON.parse(localStorage.getItem("persist")) || false
    );
    //#endregion

    //useEffect for manage the search view correctly while request list provides for Home Hero API charge
    useEffect(() => {
        if (requests && !(requests instanceof Promise)) {
            setIsLoading(false);
        }
    }, [requests]);

    //UseEffect for putting a variable named "rememberLogin" in localstorage for persistant login
    useEffect(() => {
        localStorage.setItem("persist", remeberLogin);
    }, [remeberLogin]);
    //UseEffect for execute getDepartements HTTP GET endpoint
    useEffect(() => {
        if (departamentList === null) {
            getDepartments();
        }
    }, [departamentList]);
    //UseEffect for execute getCities HTTP GET endpoint
    useEffect(() => {
        if (selectedDepartment != 0) {
            getCites();
        }
    }, [selectedDepartment]);

    //#region Management of Http Request Actions
    // UseEffect for recieve a request name action
    useEffect(() => {
        if (requestAction === "CREATE_REQUEST") {
            createRequest(formData);
        }
        if (requestAction === "SIGN_UP") {
            signUp(formData);
        }
        if (requestAction === "LOGIN") {
            Login(formData);
        }
    }, [requestAction]);
    // HTTP GET for get the names and id of all departments in colombia summons by COLOMBIA API
    const getDepartments = async () => {
        try {
            const response = await axios.get(`${API_COLOMBIA}Department`);
            const departmentsList = response.data.map((department) => ({
                id: department.id,
                name: department.name,
            }));
            setDepartamentList(departmentsList);
        } catch (error) {
            console.error("Error fetching requests:", error);
            return [];
        }
    };
    // HTTP GET for get the names and id of all cities depends of the selected department in colombia summons by COLOMBIA API
    const getCites = async () => {
        try {
            const response = await axios.get(
                `${API_COLOMBIA}Department/${selectedDepartment}/cities`
            );
            const citiesList = response.data.map((city) => ({
                id: city.id,
                name: city.name,
            }));
            citiesList.sort((a, b) => {
                if (a.name < b.name) {
                    return -1;
                } else if (a.name > b.name) {
                    return 1;
                } else {
                    return 0;
                }
            });
            setCitiesList(citiesList);
        } catch (error) {
            console.error("Error fetching requests:", error);
            return [];
        }
    };
    // HTTP POST for pass the user data needed in the Home Hero API for register a new Normal user
    const signUp = async (data) => {
        console.log("se registrara lo siguiente: ");
        console.log(data);
        try {
            const response = await axios.post(
                `${API_ENDPOINT}user/register`,
                data
            );
            setstatusResponse(response.data.statusCode);
        } catch (error) {
            console.error("Error creating request:", error);
            setstatusResponse(error.response.data.statusCode);
        }
    };
    /** HTTP Post for login a user (Any Role)
     *  [This method generates a token for access to authenticated endpoints and routes]
     *  [WithCredentials: true needed for set the refresh token cookie correctly]
     */
    const Login = async (data) => {
        try {
            const response = await axios.post(
                `${API_ENDPOINT}user/login`,
                data,
                { withCredentials: true }
            );
            setstatusResponse(response.data.statusCode);
            setTokenData(response.data.result.token);
        } catch (error) {
            console.error("Error creating request:", error);
            setstatusResponse(error.response.data.statusCode);
        }
    };
    //#endregion

    return (
        <PageContext.Provider
            value={{
                mainView: mainView,
                itemsMenu: itemsMenu,
                requests: requests,
                setRequests: setRequests,
                requestAction: requestAction,
                isLoading: isLoading,
                setIsLoading: setIsLoading,
                onSetForm: setFormData,
                onSetRequestAction: setRequestAction,
                isLogged: isLogged,
                onSetLogged: setIsLogged,
                departamentList: departamentList,
                citiesList: citiesList,
                SetSelDepartment: setSelDepartment,
                statusResponse: statusResponse,
                setstatusResponse: setstatusResponse,
                token: tokenData,
                setToken: setTokenData,
                codeRole: codeRole,
                setCodeRole: setCodeRole,
                remeberLogin: remeberLogin,
                setRememberLogin: setRememberLogin,
            }}
        >
            {props.children}
        </PageContext.Provider>
    );
};

export default PageContext;
