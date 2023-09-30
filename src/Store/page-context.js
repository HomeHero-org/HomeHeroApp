import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../config";
import CreateRequest from "../Components/CreateRequest";
import SearchRequest from "../Components/SearchRequest";
import MyRequest from "../Components/MyRequests";
import ChatsView from "../Components/ChatsView";
import ComplaintView from "../Components/ComplaintView";
import MyPostulations from "../Components/MyPostulations";
import QuestionView from "../Components/QuestionView";
import ReportsView from "../Components/ReportsView";
import SettingsView from "../Components/SettingsView";
import TutorialsView from "../Components/TutorialsView";

const createRequest = async (formData) => {
    try {
        const response = await axios.post(
            `${API_ENDPOINT}Request`,
            formData
        );
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
    isLoading: true,
    onSetForm: () => {}
});

export const PageContextProvider = (props) => {
    const listViews = {
        ["CreateRequest"]: <CreateRequest />,
        ["SearchRequest"]: <SearchRequest />,
        ["MyRequests"]: <MyRequest />,
        ["ChatsView"]: <ChatsView />,
        ["ComplaintView"]: <ComplaintView />,
        ["MyPostulations"]: <MyPostulations />,
        ["QuestionView"]: <QuestionView />,
        ["ReportsView"]: <ReportsView />,
        ["SettingsView"]: <SettingsView />,
        ["TutorialsView"]: <TutorialsView />,
    };

    const itemsMenu = [
        {
            itemName: "Solicitudes",
            icon: "fa-solid fa-hand-holding-heart",
            subItems: [
                {
                    id: "CreateRequest",
                    name: "Crear Solicitud",
                },
                {
                    id: "SearchRequest",
                    name: "Buscar Solicitudes",
                },
                {
                    id: "MyRequests",
                    name: "Mis Solicitudes",
                },
                {
                    id: "MyPostulations",
                    name: "Mis Postulaciones",
                },
            ],
        },
        {
            itemName: "Chats",
            icon: "fa-solid fa-comments",
            subItems: [
                {
                    id: "ChatsView",
                    name: "Todos",
                },
                {
                    id: "ChatsView",
                    name: "Chat 1",
                },
                {
                    id: "ChatsView",
                    name: "Chat 2",
                },
                {
                    id: "ChatsView",
                    name: "Chat 3",
                },
                {
                    id: "ChatsView",
                    name: "Chat 4",
                },
            ],
        },
        {
            itemName: "Ayuda",
            icon: "fa-regular fa-circle-question",
            subItems: [
                {
                    id: "TutorialsView",
                    name: "Tutoriales",
                },
                {
                    id: "QuestionView",
                    name: "Escribenos tus preguntas",
                },
                {
                    id: "ReportsView",
                    name: "Reportar Error",
                },
            ],
        },
        {
            id: "ComplaintView",
            itemName: "Reclamos",
            icon: "fa-solid fa-file-circle-exclamation",
            subItems: null,
        },
        {
            id: "SettingsView",
            itemName: "Configuración",
            icon: "fa-solid fa-gear",
            subItems: null,
        },
    ];

    const [formData, setFormData] = useState(new FormData());
    const [mainView, setMainView] = useState(<></>);
    const [requestAction, setRequestAction] = useState("");
    const [requests, setRequests] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (requestAction === "NORMAL_SEARCH") {
            setRequests(normalSearchFetch);
            setRequestAction("");
        }
        if (requestAction === "CREATE_REQUEST"){
            createRequest(formData);
        }
        if(requests && !(requests instanceof Promise)){
            setIsLoading(false);
        }
    }, [requestAction,requests]);

    const getViewHandler = (nameComponent) => {
        if (nameComponent === "SearchRequest") {
            setRequestAction("NORMAL_SEARCH");
        }
        setMainView(listViews[nameComponent]);
    };

    const normalSearchFetch = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${API_ENDPOINT}Request`);
            setRequests(response.data.result);
        } catch (error) {
            console.error("Error fetching requests:", error);
            return [];
        }
    };

    return (
        <PageContext.Provider
            value={{
                listView: listViews,
                mainView: mainView,
                onGetView: getViewHandler,
                itemsMenu: itemsMenu,
                requests: requests,
                requestAction: requestAction,
                isLoading: isLoading,
                onSetForm: setFormData,
                onSetRequestAction: setRequestAction
            }}
        >
            {props.children}
        </PageContext.Provider>
    );
};

export default PageContext;
