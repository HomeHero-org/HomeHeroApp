import React, { useState, useContext, useReducer, useEffect } from "react";
import PageContext from "../../Store/page-context";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import SignupImg from "../../Images/Sign-Up-Logo.svg";

const SignupValitadion = (state, action) => {
    //#region Regular Expressions for validations
    const nameValidation = /^[\p{L} '-]{3,100}$/u;
    const emailValidation =
        /^[a-zA-Z0-9._%+-]{3,30}@[a-zA-Z0-9.-]{2,30}\.[a-zA-Z]{2,}$/;
    const pwdValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    //#endregion

    if (action.type === "NAMES_INPUT") {
        const data = {
            ...state,
            names: {
                value: action.val.trim(),
                isValid: nameValidation.test(action.val.trim()),
            },
        };
        return data;
    }
    if (action.type === "SURNAMES_INPUT") {
        const data = {
            ...state,
            surnames: {
                value: action.val,
                isValid: nameValidation.test(action.val),
            },
        };
        return data;
    }
    if (action.type === "EMAIL_INPUT") {
        const data = {
            ...state,
            email: {
                value: action.val,
                isValid: emailValidation.test(action.val),
            },
        };
        return data;
    }
    if (action.type === "PWD_INPUT") {
        const data = {
            ...state,
            password: {
                value: action.val,
                isValid: pwdValidation.test(action.val),
            },
        };
        return data;
    }
    if (action.type === "PWD_CONF_INPUT") {
        const data = {
            ...state,
            confPassword: {
                value: action.val,
                isValid:
                    state.password.isValid &&
                    action.val === state.password.value,
            },
        };
        return data;
    }
    if (action.type === "CITY_INPUT") {
        const data = {
            ...state,
            city: {
                value: action.val,
            },
        };
        return data;
    }
    return { ...state };
};

const Signup = () => {
    const navigate = useNavigate();
    const ctx = useContext(PageContext);
    const [errorMessage, setErrorMessage] = useState();
    const [signupData, setSignupData] = useReducer(SignupValitadion, {
        names: {
            value: null,
            isValid: false,
        },
        surnames: {
            value: null,
            isValid: false,
        },
        email: {
            value: null,
            isValid: false,
        },
        city: {
            value: null,
        },
        password: {
            value: null,
            isValid: false,
        },
        confPassword: {
            value: null,
            isValid: false,
        },
    });

    useEffect(() => {
        if (signupData.confPassword.isValid) {
            setErrorMessage(null);
        } else if (signupData.confPassword.value) {
            setErrorMessage("Las contraseñas deben ser iguales");
        }
    }, [signupData.confPassword]);

    //#region useStates form managing the error input and aria-describedly
    const [isNamesFocus, setNamesFocus] = useState({
        style: false,
        add: false,
    });
    const [isSurnamesFocus, setSurnamesFocus] = useState({
        style: false,
        add: false,
    });
    const [isEmailFocus, setEmailFocus] = useState({
        style: false,
        add: false,
    });
    const [isPasswordFocus, setPasswordFocus] = useState({
        style: false,
        add: false,
    });

    //#endregion
    const signupHandler = (event) => {
        event.preventDefault();
        if (
            !signupData.names.isValid ||
            !signupData.surnames.isValid ||
            !signupData.email.isValid ||
            !signupData.password.isValid ||
            signupData.city > 0
        ) {
            setErrorMessage("Hay Datos Incorrectos");
        } else {
            setErrorMessage(null);
            ctx.onSetForm({
                namesUser: signupData.names.value,
                surnamesUser: signupData.surnames.value,
                email: signupData.email.value,
                password: signupData.password.value,
                cityID: parseInt(signupData.city.value),
                roleID_User: 2,
            });
            ctx.onSetRequestAction("SIGN_UP");
        }
    };

    useEffect(() => {
        if (ctx.statusResponse === 409) {
            setErrorMessage(
                "Ya existe un usuario registrado con ese correo electronico"
            );
        }
        if (ctx.statusResponse === 200 && !ctx.token) {
            ctx.onSetForm({
                Email: signupData.email.value,
                Password: signupData.password.value,
                RememberLogin: false,
            });
            ctx.onSetRequestAction("LOGIN");
        }
        if (ctx.statusResponse === 200 && ctx.token) {
            navigate("/");
        }
    }, [ctx.statusResponse,ctx.token, signupData.email.value, signupData.password.value]);

    const onVisibleHandler = (info) => {
        if (info === "NAMES") {
            setNamesFocus((prevState) => {
                return { add: prevState.add, style: !prevState.style };
            });
            if (!isNamesFocus.add) {
                setNamesFocus((prevState) => {
                    return { add: !prevState.add, style: prevState.style };
                });
            } else {
                setTimeout(() => {
                    setNamesFocus((prevState) => {
                        return { add: !prevState.add, style: prevState.style };
                    });
                }, 300);
            }
        }
        if (info === "SURNAMES") {
            setSurnamesFocus((prevState) => {
                return { add: prevState.add, style: !prevState.style };
            });
            if (!isSurnamesFocus.add) {
                setSurnamesFocus((prevState) => {
                    return { add: !prevState.add, style: prevState.style };
                });
            } else {
                setTimeout(() => {
                    setSurnamesFocus((prevState) => {
                        return { add: !prevState.add, style: prevState.style };
                    });
                }, 300);
            }
        }
        if (info === "EMAIL") {
            setEmailFocus((prevState) => {
                return { add: prevState.add, style: !prevState.style };
            });
            if (!isEmailFocus.add) {
                setEmailFocus((prevState) => {
                    return { add: !prevState.add, style: prevState.style };
                });
            } else {
                setTimeout(() => {
                    setEmailFocus((prevState) => {
                        return { add: !prevState.add, style: prevState.style };
                    });
                }, 300);
            }
        }
        if (info === "PWD") {
            setPasswordFocus((prevState) => {
                return { add: prevState.add, style: !prevState.style };
            });
            if (!isPasswordFocus.add) {
                setPasswordFocus((prevState) => {
                    return { add: !prevState.add, style: prevState.style };
                });
            } else {
                setTimeout(() => {
                    setPasswordFocus((prevState) => {
                        return { add: !prevState.add, style: prevState.style };
                    });
                }, 300);
            }
        }
    };

    return (
        <div className={styles.main_container}>
            <form onSubmit={signupHandler} className={styles.login_form}>
                <h2>REGISTRO</h2>
                <div className={styles.input_group}>
                    <label>NOMBRES</label>
                    {!signupData.names.isValid &&
                        signupData.names.value != null && (
                            <i
                                className={`fa-solid fa-xmark ${styles.mark}`}
                            ></i>
                        )}
                    {signupData.names.isValid &&
                        signupData.names.value != null && (
                            <i
                                className={`fa-solid fa-check ${styles.mark} ${styles.green}`}
                            ></i>
                        )}
                    <input
                        className={
                            !signupData.names.isValid &&
                            signupData.names.value != null
                                ? styles.invalid_input
                                : undefined
                        }
                        aria-describedby="nameNote"
                        type="text"
                        placeholder='"Escribe tus nombres aquí"'
                        onFocus={() => onVisibleHandler("NAMES")}
                        onBlur={() => onVisibleHandler("NAMES")}
                        onChange={(e) =>
                            setSignupData({
                                type: "NAMES_INPUT",
                                val: e.target.value,
                            })
                        }
                    ></input>
                    {isNamesFocus.add && (
                        <p
                            id="nameNote"
                            className={
                                isNamesFocus.style
                                    ? styles.show_description
                                    : styles.hide_description
                            }
                        >
                            Minimo 3 letras y Maximo 100 <br />
                            Se permiten Minusculas,Mayusculas y caracteres
                            especiales
                        </p>
                    )}
                </div>
                <div className={styles.input_group}>
                    <label>APELLIDOS</label>
                    {!signupData.surnames.isValid &&
                        signupData.surnames.value != null && (
                            <i
                                className={`fa-solid fa-xmark ${styles.mark}`}
                            ></i>
                        )}
                    {signupData.surnames.isValid &&
                        signupData.surnames.value != null && (
                            <i
                                className={`fa-solid fa-check ${styles.mark} ${styles.green}`}
                            ></i>
                        )}
                    <input
                        className={
                            !signupData.surnames.isValid &&
                            signupData.surnames.value != null
                                ? styles.invalid_input
                                : undefined
                        }
                        type="text"
                        placeholder='"Escribe tus apellidos aquí"'
                        onFocus={() => onVisibleHandler("SURNAMES")}
                        onBlur={() => onVisibleHandler("SURNAMES")}
                        onChange={(e) =>
                            setSignupData({
                                type: "SURNAMES_INPUT",
                                val: e.target.value,
                            })
                        }
                    ></input>
                    {isSurnamesFocus.add && (
                        <p
                            id="nameNote"
                            className={
                                isSurnamesFocus.style
                                    ? styles.show_description
                                    : styles.hide_description
                            }
                        >
                            Minimo 3 letras y Maximo 100 <br />
                            Se permiten Minusculas,Mayusculas y caracteres
                            especiales
                        </p>
                    )}
                </div>
                <div className={styles.input_group}>
                    <label>CORREO</label>
                    {!signupData.email.isValid &&
                        signupData.email.value != null && (
                            <i
                                className={`fa-solid fa-xmark ${styles.mark}`}
                            ></i>
                        )}
                    {signupData.email.isValid &&
                        signupData.email.value != null && (
                            <i
                                className={`fa-solid fa-check ${styles.mark} ${styles.green}`}
                            ></i>
                        )}
                    <input
                        className={
                            !signupData.email.isValid &&
                            signupData.email.value != null
                                ? styles.invalid_input
                                : undefined
                        }
                        type="email"
                        placeholder="Ejemplo@ejemplo.com"
                        onFocus={() => onVisibleHandler("EMAIL")}
                        onBlur={() => onVisibleHandler("EMAIL")}
                        onChange={(e) =>
                            setSignupData({
                                type: "EMAIL_INPUT",
                                val: e.target.value,
                            })
                        }
                    ></input>
                    {isEmailFocus.add && (
                        <p
                            id="nameNote"
                            className={
                                isEmailFocus.style
                                    ? styles.show_description
                                    : styles.hide_description
                            }
                        >
                            Minimo 3 letras y Maximo 100 <br />
                            Se permiten Minusculas,Mayusculas, caracteres
                            especiales y conectores '-''.''_'
                        </p>
                    )}
                </div>
                <div className={styles.input_group}>
                    <label>DEPARTAMENTO</label>
                    <select
                        className={styles.customInput}
                        id="department"
                        defaultValue={0}
                        onClick={(e) => {
                            ctx.SetSelDepartment(e.target.value);
                            setSignupData({ type: "CITY_INPUT", val: 0 });
                        }}
                    >
                        <option value="0" disabled>
                            Departamento
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
                <div className={styles.input_group}>
                    <label>CIUDAD DONDE VIVES</label>
                    <select
                        id="ciudad"
                        defaultValue={0}
                        className={
                            signupData.city.value === 0
                                ? styles.invalid_input
                                : undefined
                        }
                        onClick={(e) =>
                            setSignupData({
                                type: "CITY_INPUT",
                                val: e.target.value,
                            })
                        }
                    >
                        <option value="0" disabled>
                            Ciudad
                        </option>
                        {ctx.citiesList &&
                            ctx.citiesList.map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.name}
                                </option>
                            ))}
                    </select>
                </div>
                <div className={styles.input_group}>
                    <label>CONTRASEÑA</label>
                    {!signupData.password.isValid &&
                        signupData.password.value != null && (
                            <i
                                className={`fa-solid fa-xmark ${styles.mark}`}
                            ></i>
                        )}
                    {signupData.password.isValid &&
                        signupData.password.value != null && (
                            <i
                                className={`fa-solid fa-check ${styles.mark} ${styles.green}`}
                            ></i>
                        )}
                    <input
                        className={
                            !signupData.password.isValid &&
                            signupData.password.value != null
                                ? styles.invalid_input
                                : undefined
                        }
                        type="password"
                        placeholder="********"
                        onFocus={() => onVisibleHandler("PWD")}
                        onBlur={() => onVisibleHandler("PWD")}
                        onChange={(e) =>
                            setSignupData({
                                type: "PWD_INPUT",
                                val: e.target.value,
                            })
                        }
                    ></input>
                    {isPasswordFocus.add && (
                        <p
                            id="nameNote"
                            className={
                                isPasswordFocus.style
                                    ? styles.show_description
                                    : styles.hide_description
                            }
                        >
                            Minimo 8 caracteres <br />
                            Debe usar al menos: <br />1 Minusculas, 1 Mayusculas
                            y 1 Numero
                        </p>
                    )}
                </div>
                <div className={styles.input_group}>
                    <label>CONFIRMAR CONTRASEÑA</label>
                    <input
                        type="password"
                        placeholder="********"
                        onChange={(e) => {
                            setSignupData({
                                type: "PWD_CONF_INPUT",
                                val: e.target.value,
                            });
                        }}
                    ></input>
                </div>
                <button className={`${styles.btn_group} ${styles.signup_btn}`}>
                    <i className="fa-solid fa-user-plus"></i>
                    <span>Registrarse</span>
                </button>
                {errorMessage && (
                    <p className={styles.signup_info_process}>{errorMessage}</p>
                )}
                <div className={styles.login_option}>
                    <label>¿Ya estas registrado?</label>
                    <button
                        onClick={() => navigate('/login')}
                        className={`${styles.btn_group} ${styles.login_btn}`}
                    >
                        <i className="fa-solid fa-right-to-bracket"></i>
                        <span>Iniciar Sesión</span>
                    </button>
                </div>
            </form>
            <div className={styles.img_container}>
                <img alt="Sign up decoration" src={SignupImg} />
            </div>
        </div>
    );
};

export default Signup;
