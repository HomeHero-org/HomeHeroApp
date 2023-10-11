import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINT, API_COLOMBIA } from "../config";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";
import CreateRequest from "../Pages/CreateRequest/CreateRequest";
import SearchRequest from "../Pages/SearchRequest/SearchRequest";
import MyRequest from "../Pages/UserOwnRequest/MyRequests";
import ChatsView from "../Pages/ChatPage/ChatsView";
import ComplaintView from "../Pages/Complaints/ComplaintView";
import MyPostulations from "../Pages/UserPostulations/MyPostulations";
import QuestionView from "../Pages/Questions/QuestionView";
import ReportsView from "../Pages/Reports/ReportsView";
import SettingsView from "../Pages/Settings/SettingsView";
import TutorialsView from "../Pages/Tutorials/TutorialsView";

const createRequest = async (formData) => {
    try {
        const response = await axios.post(`${API_ENDPOINT}Request`, formData);
        console.log("Request created successfully:", response.data);
    } catch (error) {
        console.error("Error creating request:", error);
    }
};

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

export const PageContextProvider = (props) => {
    const itemsMenu = [
        {
            itemName: "Solicitudes",
            icon: "fa-solid fa-hand-holding-heart",
            subItems: [
                {
                    id: "create_request",
                    name: "Crear Solicitud",
                },
                {
                    id: "search-request",
                    name: "Buscar Solicitudes",
                },
                {
                    id: "MyRequests",
                    name: "Mis Solicitudes",
                },
                {
                    id: "Postulations",
                    name: "Mis Postulaciones",
                },
            ],
        },
        {
            itemName: "Chats",
            icon: "fa-solid fa-comments",
            subItems: [
                {
                    id: "Chats",
                    name: "Todos",
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
            itemName: "Ayuda",
            icon: "fa-regular fa-circle-question",
            subItems: [
                {
                    id: "Tutorials",
                    name: "Tutoriales",
                },
                {
                    id: "Questions",
                    name: "Escribenos tus preguntas",
                },
                {
                    id: "Reports",
                    name: "Reportar Error",
                },
            ],
        },
        {
            id: "Complaints",
            itemName: "Reclamos",
            icon: "fa-solid fa-file-circle-exclamation",
            subItems: null,
        },
        {
            id: "Settings",
            itemName: "Configuración",
            icon: "fa-solid fa-gear",
            subItems: null,
        },
    ];

    const [formData, setFormData] = useState(new FormData());
    const [statusResponse, setstatusResponse] = useState();
    const [mainView, setMainView] = useState(<></>);
    const [requestAction, setRequestAction] = useState("");
    const [requests, setRequests] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLogged, setIsLogged] = useState(false);
    const [departamentList, setDepartamentList] = useState();
    const [citiesList, setCitiesList] = useState();
    const [selectedDepartment, setSelDepartment] = useState(0);
    const [tokenData, setTokenData] = useState(null);
    const [codeRole, setCodeRole] = useState("");
    const [remeberLogin,setRememberLogin] = useState(JSON.parse(localStorage.getItem('persist')) || false);
    

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
        if (requestAction === "REFRESH") {
        }
    }, [requestAction]);

    useEffect(() => {
        if (requests && !(requests instanceof Promise)) {
            setIsLoading(false);
        }
    }, [requests]);

    useEffect(() => {
        localStorage.setItem("persist",remeberLogin);
    }, [remeberLogin]);

    useEffect(() => {
        if (tokenData && !(tokenData instanceof Promise)) {
            console.log("el token guardado en token es:", tokenData);
        }
        if (tokenData && !codeRole){

        }
    }, [tokenData]);

    useEffect(() => {
        getDepartments();
    }, []);

    useEffect(() => {
        if (selectedDepartment != 0) {
            getCites();
        }
    }, [selectedDepartment]);


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
                setRememberLogin: setRememberLogin
            }}
        >
            {props.children}
        </PageContext.Provider>
    );
};

export default PageContext;
