import React, { useState, useContext, Suspense } from "react";
import HomePage from "./Components/UI/HomePage/HomePage";
import UserHomePage from "./Pages/UserHomePage/UserHomePage";
import AdminHomePage from "./Pages/AdminHomePage/AdminHomePage";
import NotFound from "./Pages/NotFound/NotFound";
import Login from "./Pages/LoginPage/Login";
import Signup from "./Pages/SignupPage/Signup";
import CreateRequest from "./Pages/CreateRequest/CreateRequest";
import SearchRequest from "./Pages/SearchRequest/SearchRequest";
import SettingsView from "./Pages/Settings/SettingsView";
import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import RequireAuth from "./Components/RequireAuth/RequireAuth";
import PersistLogin from "./Components/PersistLogin";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import UserProfile from "./Pages/UserProfile/UserProfile";
import MyRequest from "./Pages/UserOwnRequest/MyRequests";
import i18n from './i18n';
import CreateForm from "./Components/CreateForm/CreateForm";
import LocaleContext from "./LocaleContext";
import { useTranslation } from 'react-i18next';
function Loading() {
    return (
        <>Loading...</>
    )
}

function App() {
    const [locale, setLocale] = useState(i18n.language); // Utiliza i18n.language para establecer el idioma inicial
    i18n.on('languageChanged', (lng) => setLocale(i18n.language));
    const { t } = useTranslation();
    const handleChange = (event) => {
        i18n.changeLanguage(event.target.value);
    }
    // Boton cambio de idiona
    //<LocaleContext.Provider value={{ locale, setLocale }}>
    //    <Suspense fallback={<Loading />}>
    //        <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000 }}>
    //            <div className="bg-white p-3 rounded shadow-lg d-flex align-items-center">
    //                <span className="me-2">{t('Language')}</span>
    //                <select
    //                    value={locale}
    //                    onChange={handleChange}
    //                    className="form-select form-select-lg d-flex align-items-center"
    //                    style={{
    //                        fontSize: '16px',
    //                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    //                        cursor: 'pointer',
    //                        paddingLeft: '40px',  // Espacio adicional para el ícono
    //                        backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="icon"><path fill="%23007bff" d="M171.5 260.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 173.8c-9.4-9.4-9.4-24.6 0-33.9l108.4-108.4c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L63.9 136H372c13.3 0 24 10.7 24 24v16c0 13.3-10.7 24-24 24H63.9l107.2 107.1c9.8 9.8 10 24.8.4 34.3z"/></svg>'), url('path_to_your_globe_icon.svg')`,
    //                        backgroundPosition: 'right 1.5rem center, 1rem center',  // Posición del ícono de despliegue y del globo, respectivamente
    //                        backgroundRepeat: 'no-repeat, no-repeat',
    //                        backgroundSize: '1rem auto, 1.5rem auto'  // Tamaño del ícono de despliegue y del globo, respectivamente
    //                    }}
    //                >
    //                    <option value="es">{t('language1')}</option>
    //                    <option value="en">{t('language2')}</option>
    //                </select>
    //            </div>
    //        </div>
    //    </Suspense>
    //</LocaleContext.Provider>


    //import LocaleContext from "./LocaleContext";
    //import { useTranslation } from 'react-i18next';
    //const [locale, setLocale] = useState(i18n.language); // Utiliza i18n.language para establecer el idioma inicial
    //i18n.on('languageChanged', (lng) => setLocale(i18n.language));
    //const { t } = useTranslation();
    //const handleChange = (event) => {
    //    i18n.changeLanguage(event.target.value);
    //}

    return (

        <LocaleContext.Provider value={{ locale, setLocale }}>
            <Suspense fallback={<Loading />}>
                <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000 }}>
                    <div className="bg-white p-3 rounded shadow-lg d-flex align-items-center">
                        <span className="me-2">{t('Language')}</span>
                        <select
                            value={locale}
                            onChange={handleChange}
                            className="form-select form-select-lg d-flex align-items-center"
                            style={{
                                fontSize: '16px',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                cursor: 'pointer',
                                paddingLeft: '40px',  // Espacio adicional para el ícono
                                backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="icon"><path fill="%23007bff" d="M171.5 260.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 173.8c-9.4-9.4-9.4-24.6 0-33.9l108.4-108.4c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L63.9 136H372c13.3 0 24 10.7 24 24v16c0 13.3-10.7 24-24 24H63.9l107.2 107.1c9.8 9.8 10 24.8.4 34.3z"/></svg>'), url('path_to_your_globe_icon.svg')`,
                                backgroundPosition: 'right 1.5rem center, 1rem center',  // Posición del ícono de despliegue y del globo, respectivamente
                                backgroundRepeat: 'no-repeat, no-repeat',
                                backgroundSize: '1rem auto, 1.5rem auto'  // Tamaño del ícono de despliegue y del globo, respectivamente
                            }}
                        >
                            <option value="es">{t('language1')}</option>
                            <option value="en">{t('language2')}</option>
                            <option value="fr">Portuges</option>
                        </select>
                    </div>
                </div>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        {/*Public routes*/}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/not_found" element={<NotFound />} />
                        <Route path="/sign_up" element={<Signup />} />
                        <Route path="/settings" element={<SettingsView />} />
                        <Route path="/reset_password" element={<ResetPassword />} />
                         <Route
                            path="/~/1017/profile"
                            element={<UserProfile />}
                        />
                               <Route
                            path="/~/1017/MyRequests"
                            element={<MyRequest/>}
                        />
                        {/*Protected routes*/}
                        <Route path="/~" element={<PersistLogin />}>
                            <Route
                                path="/~/1017"
                                element={
                                    <RequireAuth allowedRoles={["1017", "2001"]} />
                                }
                            >
                                <Route path="/~/1017/home" element={<UserHomePage />} />
                                <Route
                                    path="/~/1017/create_request"
                                    element={<CreateRequest />}
                                />
                                <Route
                                    path="/~/1017/search-request"
                                    element={<SearchRequest />}
                                />
                            </Route>
                            <Route
                                path="/~/2001"
                                element={<RequireAuth allowedRoles={["2001"]} />}
                            >
                                <Route
                                    path="/~/2001/home"
                                    element={<AdminHomePage />}
                                />
                            </Route>
                        </Route>
                    </Route>
                </Routes>
            </Suspense>
        </LocaleContext.Provider>
    );
}

export default App;
