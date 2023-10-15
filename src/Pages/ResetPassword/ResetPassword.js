import React, { useState, useReducer, useEffect } from "react";
import useCtx from "../../Hooks/useCtx";
import getRole from "../../Hooks/getRole";
import { useNavigate } from "react-router-dom";
import styles from "./ResetPassword.module.css";
import resetPWDImg from "../../Images/Reset password-amico.svg";
import useCountDown from "../../Hooks/useCountDown";

/** Login Validation Function inserted in the useReducer
 *
 * @param {*} state Provides the last values of the object returnet for 'newPasswordData' useReducer function
 * @param {*} action Provides the current values set in the last call to the useReducer Function
 * @returns //Returns an object with the user information for can login {Password, Email}
 */
const ResetPasswordData = (state, action) => {
    //#region Regular Expressions for validations
    const emailValidation =
        /^[a-zA-Z0-9._%+-]{3,30}@[a-zA-Z0-9.-]{2,30}\.[a-zA-Z]{2,}$/;
    const pwdValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    //#endregion
    //set a Email data and validate its data
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
    //set a Password data and validate its data
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
    return { ...state };
};

/**Login Page Component charged in route /login
 *
 * @returns a component composed to the login form with Email and Password inputs, and an Image as login banner
 */
const ResetPassword = () => {
    const ctx = useCtx();
    const navigate = useNavigate();
    //const location = useLocation();
    //const from = location.state?.from?.pathname || '/'; -> for take the url clicked before to access to login url

    //use Reducer for management of the login data
    const [newPasswordData, setNewPasswordData] = useReducer(
        ResetPasswordData,
        {
            email: {
                value: null,
                isValid: false,
            },
            password: {
                value: null,
                isValid: false,
            },
        }
    );
    //use State for set error messages
    const [errorMessage, setErrorMessage] = useState();

    const setRememberHandler = () => {
        ctx.setRememberLogin((prevState) => !prevState);
    };
    //event handler for onSubmit
    const loginHandler = (event) => {
        event.preventDefault();
        //navigate(from, {replace: true}); // -> this is the way for charge a url clicked for the user before to access at login view
        ctx.onSetForm({
            Email: newPasswordData.email.value,
            Password: newPasswordData.password.value,
            RememberLogin: ctx.remeberLogin,
        });
        ctx.onSetRequestAction("LOGIN");
    };

    /**UseEffect for manage the possible status response of login action
     * Status Response 400 -> Had bad information passed to login Http Request
     * Status Response 200 -> Login success
     */
    useEffect(() => {
        if (ctx.statusResponse === 400) {
            setErrorMessage("Email o Contraseña incorrecta");
        }
        if (ctx.statusResponse === 200) {
            navigate(`/~/${getRole(ctx.token)}/home`, { replace: true });
            ctx.setstatusResponse(null);
        }
    }, [ctx.statusResponse]);

    //#region useStates and function for managing the aria labedly showed as extra information
    const [isEmailFocus, setEmailFocus] = useState({
        style: false,
        add: false,
    });
    const [isPasswordFocus, setPasswordFocus] = useState({
        style: false,
        add: false,
    });

    const onVisibleHandler = (info) => {
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
    //#endregion

    const [digit, setDigit] = useState(["", "", "", "", "", ""]);
    const {secondsLeft, start } = useCountDown();
    const [showTimer, setShowTimer] = useState(false);
    const [timerPos,setTimerPost] = useState('fa-hourglass-start');
    const onlyDigitHandler = (e, i) => {
        const value = e.target.value;
        if (/^[0-9]*$/.test(value)) {
            setDigit((prevState) => {
                const newArray = [...prevState];
                newArray[i] = value;
                console.log(newArray);
                return newArray;
            });
        }
    };

    const sendCodeHanlder = (e) => {
        e.preventDefault();
        setShowTimer(true);
        start(60);
    }

    const validateCodeHanlder = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        if(secondsLeft < 1){
            setShowTimer(false);
        }
        if(timerPos === 'fa-hourglass-start'){
            setTimerPost('fa-hourglass-half');
        }
        else if(timerPos === 'fa-hourglass-half'){
            setTimerPost('fa-hourglass-end');
        }
        else if(timerPos === 'fa-hourglass-end'){
            setTimerPost('fa-hourglass');
        }
        else{ 
            setTimerPost('fa-hourglass-start');
        }
    },[secondsLeft]);


    return (
        <div className={styles.main_container}>
            <div className={styles.img_container}>
                <img alt="Reset password Image" src={resetPWDImg} />
            </div>
            <form onSubmit={loginHandler} className={styles.login_form}>
                <h2>Nueva Contraseña</h2>
                <div className={styles.input_group}>
                    <label>CORRREO CON EL QUE TE REGISTRASTE</label>
                    {!newPasswordData.email.isValid &&
                        newPasswordData.email.value != null && (
                            <i
                                className={`fa-solid fa-xmark ${styles.mark}`}
                            ></i>
                        )}
                    {newPasswordData.email.isValid &&
                        newPasswordData.email.value != null && (
                            <i
                                className={`fa-solid fa-check ${styles.mark} ${styles.green}`}
                            ></i>
                        )}
                    <input
                        className={
                            !newPasswordData.email.isValid &&
                            newPasswordData.email.value != null
                                ? styles.invalid_input
                                : undefined
                        }
                        type="email"
                        placeholder="Ejemplo@ejemplo.com"
                        onFocus={() => onVisibleHandler("EMAIL")}
                        onBlur={() => onVisibleHandler("EMAIL")}
                        onChange={(e) =>
                            setNewPasswordData({
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
                            especiales y conectores "- . _"
                        </p>
                    )}
                </div>
                <button onClick={sendCodeHanlder} className={`${styles.btn_group} ${styles.code_btn}`}>
                    <i className="fa-solid fa-paper-plane"></i>
                    <span>Pedir codigo de recuperación</span>
                </button>
                <div className={styles.code_group}>
                    <label>INGRESA EL CODIGO ENVIADO</label>
                    <input
                        className={styles.numImput}
                        autoComplete="-" //this is a little random but if you put any text different to off or false autocomplete 'off' works
                        value={digit[0]}
                        maxLength={1}
                        onChange={(e) => onlyDigitHandler(e, 0)}
                    ></input>
                    <input
                        className={styles.numImput}
                        autoComplete="-"
                        value={digit[1]}
                        maxLength={1}
                        onChange={(e) => onlyDigitHandler(e, 1)}
                    ></input>
                    <input
                        className={styles.numImput}
                        autoComplete="-"
                        value={digit[2]}
                        maxLength={1}
                        onChange={(e) => onlyDigitHandler(e, 2)}
                    ></input>
                    <input
                        className={styles.numImput}
                        autoComplete="-"
                        value={digit[3]}
                        maxLength={1}
                        onChange={(e) => onlyDigitHandler(e, 3)}
                    ></input>
                    <input
                        className={styles.numImput}
                        autoComplete="-"
                        value={digit[4]}
                        maxLength={1}
                        onChange={(e) => onlyDigitHandler(e, 4)}
                    ></input>
                    <input
                        className={styles.numImput}
                        autoComplete="-"
                        value={digit[5]}
                        maxLength={1}
                        onChange={(e) => onlyDigitHandler(e, 5)}
                    ></input>
                    <div className={`${styles.timerCode} ${showTimer ? styles.timer_show : styles.timer_hide}`}>
                    <span>{secondsLeft}s</span>
                    <i className={`fa-solid ${timerPos}`}></i>

                    </div>
                </div>
                <button onClick={validateCodeHanlder} className={`${styles.btn_group} ${styles.validate_btn}`}>
                    <i className="fa-solid fa-circle-check"></i>
                    <span>Validar</span>
                </button>
                <div className={styles.input_group}>
                    <label>NUEVA CONTRASEÑA</label>
                    {!newPasswordData.password.isValid &&
                        newPasswordData.password.value != null && (
                            <i
                                className={`fa-solid fa-xmark ${styles.mark}`}
                            ></i>
                        )}
                    {newPasswordData.password.isValid &&
                        newPasswordData.password.value != null && (
                            <i
                                className={`fa-solid fa-check ${styles.mark} ${styles.green}`}
                            ></i>
                        )}
                    <input
                        className={
                            !newPasswordData.password.isValid &&
                            newPasswordData.password.value != null
                                ? styles.invalid_input
                                : undefined
                        }
                        type="password"
                        placeholder="********"
                        onFocus={() => onVisibleHandler("PWD")}
                        onBlur={() => onVisibleHandler("PWD")}
                        onChange={(e) =>
                            setNewPasswordData({
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
                <button className={`${styles.btn_group} ${styles.reset_btn}`}>
                    <i className="fa-solid fa-right-to-bracket"></i>
                    <span>Reestablecer Contraseña</span>
                </button>
                {errorMessage && (
                    <p className={styles.login_info_process}>{errorMessage}</p>
                )}
                <div className={styles.signup_option}>
                    <label>¿No estas registrado?</label>
                    <button
                        onClick={() => navigate("/sign_up")}
                        className={`${styles.btn_group} ${styles.signup_btn}`}
                    >
                        <i className="fa-solid fa-user-plus"></i>
                        <span>Registrarse</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ResetPassword;
