import React, { useState } from "react";
import styles from "./MyRequest.module.css";
import MainBanner from "../../Components/UI/MainBanner/MainBanner";
import QuoteMessage from "../../Components/UI/QuoteMessage/QuoteMessage";
import InfoSection from "../../Components/UI/InfoSection/InfoSection";
import { GrStatusGoodSmall } from "react-icons/gr";
import imgRequest from "../../Images/req01.jpg";
import userImg from "../../Images/user_default_photo.jpg";
import { useTranslation } from 'react-i18next';

const MyRequests = () => {
    const [currentRequest, setCurrentRequest] = useState(null);
    const { t } = useTranslation();
    const myRequest = [
        {
            id: 1,
            title:  t('Title Request') ,
            area: "Something",
            date: "2023-10-20",
            status: "Not Started",
            membersNeeded: 25,
            description:
                "En estos tiempos difíciles, extendemos una sincera solicitud de ayuda a quienes más lo necesitan. Nuestra organización se dedica a brindar asistencia a personas en situaciones de vulnerabilidad. Con tu apoyo, podemos marcar la diferencia en la vida de muchas familias. Cualquier contribución es valiosa, y juntos podemos construir un futuro más esperanzador.",
            imgRequest: imgRequest,
        },
        {
            id: 2,
            title: t('Title Request'),
            area: "Something",
            date: "2023-10-20",
            status: "Not Started",
            membersNeeded: 22,
            description:
                "La educación es el camino hacia un futuro mejor, y en este sentido, solicitamos tu apoyo. Nuestra iniciativa se enfoca en proporcionar recursos educativos a comunidades desfavorecidas. Cada donación que recibimos nos acerca un paso más a nuestros objetivos de garantizar una educación de calidad para todos los niños. Tu generosidad puede darles la oportunidad de aprender y crecer.",
            imgRequest: imgRequest,
        },
        {
            id: 3,
            title: t('Title Request'),
            area: "Something",
            date: "2023-10-20",
            status: "Not Started",
            membersNeeded: 21,
            description:
                "La salud es un derecho fundamental, y en este momento, necesitamos tu colaboración. Estamos solicitando asistencia para brindar atención médica a aquellos que no pueden acceder a servicios médicos. Cada donación ayuda a proporcionar tratamientos, medicamentos y atención de calidad a quienes luchan contra enfermedades. Tu apoyo puede marcar la diferencia en la recuperación de vidas.",
            imgRequest: imgRequest,
        },
        {
            id: 4,
            title: t('Title Request'),
            area: "Something",
            date: "2023-10-20",
            status: "Not Started",
            membersNeeded: 45,
            description:
                "Las personas mayores merecen vivir sus últimos años con dignidad y cuidado. Nuestra solicitud de ayuda se centra en proporcionar apoyo a la tercera edad. Los recursos que recaudamos se utilizan para garantizar que los ancianos reciban atención, compañía y comodidad. Contribuir a esta causa es una forma significativa de honrar a nuestros mayores.",
            imgRequest: imgRequest,
        },
        {
            id: 5,
            title: t('Title Request'),
            area: "Something",
            date: "2023-10-20",
            status: "Not Started",
            membersNeeded: 2,
            description:
                "En momentos de desastres naturales, la solidaridad es fundamental. Nuestra organización está activamente involucrada en la respuesta a emergencias. Cada contribución que recibimos se dirige a ayudar a las comunidades afectadas por inundaciones, terremotos u otras catástrofes. Tu apoyo financiero puede proporcionar refugio, alimentos y esperanza en medio de la adversidad.",
            imgRequest: imgRequest,
        },
        {
            id: 6,
            title: t('Title Request'),
            area: "Something",
            date: "2023-10-20",
            status: "Not Started",
            membersNeeded: 5,
            description:
                "Tu ayuda puede cambiar vidas. Solicitamos tu colaboración para apoyar a refugiados que buscan un lugar seguro para reconstruir sus vidas. Tu donación brinda refugio, comida y esperanza a quienes han perdido todo.",
            imgRequest: imgRequest,
        },
        {
            id: 7,
            title: t('Title Request'),
            area: "Something",
            date: "2023-10-20",
            status: "Not Started",
            membersNeeded: 8,
            description:
                "Cada niño merece un futuro brillante. Te invitamos a unirte a nuestra causa para proporcionar educación y atención médica a niños desfavorecidos. Tu contribución hace posible un mundo mejor para ellos.",
            imgRequest: imgRequest,
        },
        {
            id: 8,
            title: t('Title Request'),
            area: "Something",
            date: "2023-10-20",
            status: "Not Started",
            membersNeeded: 10,
            description:
                "El hambre es una lucha diaria para muchas familias. Tu generosidad alimenta a quienes lo necesitan. Con tu apoyo, podemos brindar comidas nutritivas a quienes tienen hambre.",
            imgRequest: imgRequest,
        },
        {
            id: 9,
            title: t('Title Request'),
            area: "Something",
            date: "2023-10-20",
            status: "Not Started",
            membersNeeded: 3,
            description:
                "Construir hogares es construir sueños. Necesitamos tu ayuda para financiar un proyecto de viviendas asequibles. Tu donación da a familias la oportunidad de tener un techo seguro.",
            imgRequest: imgRequest,
        },
        {
            id: 10,
            title: t('Title Request'),
            area: "Something",
            date: "2023-10-20",
            status: "Not Started",
            membersNeeded: 1,
            description:
                "Las emergencias no avisan. Tu apoyo a nuestro fondo de crisis es esencial. Nos permite responder rápidamente a desastres naturales y ayudar a las comunidades afectadas. Tu donación marca la diferencia en tiempos difíciles.",
            imgRequest: imgRequest,
        },
    ];

    const postulants = [
        {
            id: 1,
            profileImg: userImg,
            username: "Martin Eladio Sanchez Martinez",
            qualification: 4.2,
            moneyOrdered: 45000,
            status: 1,
        },
        {
            id: 2,
            profileImg: userImg,
            username: "Martin Eladio Sanchez Martinez",
            qualification: 4.2,
            moneyOrdered: 45000,
            status: 1,
        },
        {
            id: 3,
            profileImg: userImg,
            username: "Mariano Eladio Sanchez Martinez",
            qualification: 4.2,
            moneyOrdered: 4500,
            status: 1,
        },
        {
            id: 4,
            profileImg: userImg,
            username: "Rigoberto Eladio Sanchez Martinez",
            qualification: 3.7,
            moneyOrdered: 5000,
            status: 1,
        },
        {
            id: 5,
            profileImg: userImg,
            username: "Martin Fabricio Sanchez Martinez",
            qualification: 2.9,
            moneyOrdered: 55000,
            status: 0,
        },
        {
            id: 6,
            profileImg: userImg,
            username: "Jose Eladio Sanchez Martinez",
            qualification: 4.8,
            moneyOrdered: 45000,
            status: 0,
        },
        {
            id: 7,
            profileImg: userImg,
            username: "Juan Eladio Sanchez Martinez",
            qualification: 3.2,
            moneyOrdered: 45000,
            status: 0,
        },
    ];
   

    return (
        <div className={styles.main_content}>
            <section className={styles.own_request_section}>
                <div className={styles.request_filter}>
                    <h2>{t('filters')}</h2>
                  
                    <div
                        className={`${styles.input_group} ${styles.select_group}`}
                    >
                        <label>{t('area')}</label>
                        <select
                            className={styles.customInput}
                            id="categoria"
                            defaultValue={0}
                        >
                            <option value="0" disabled>
                                {t('area')}
                            </option>
                            <option value="1">{t('plumbing')}</option>
                            <option value="2">{t('education')}</option>
                            <option value="3">{t('pets')}</option>
                            <option value="4">{t('medicine')}</option>
                        </select>
                    </div>
                    <div
                        className={`${styles.input_group} ${styles.select_group}`}
                    >
                        <label>{t('state')}</label>
                        <select
                            className={styles.customInput}
                            id="categoria"
                            defaultValue={0}
                        >
                            <option value="0" disabled>
                                {t('state')}
                            </option>
                            <option value="1">{t('plumbing')}</option>
                            <option value="2">{t('education')}</option>
                            <option value="3">{t('pets')}</option>
                            <option value="4">{t('medicine')}</option>
                        </select>
                    </div>
                </div>
                <div className={styles.own_request_list}>
                    {myRequest.map((request) => {
                        return (
                            <div
                                key={request.id}
                                className={styles.request_summary}
                                onClick={() => setCurrentRequest(request)}
                            >
                                <div className={styles.img_container}>
                                    <img
                                        alt="Request"
                                        src={request.imgRequest}
                                    />
                                </div>
                                <div className={styles.request_summary_info}>
                                    <h2>{request.title}</h2>
                                    <p>
                                        <strong>{t('area')} </strong> {request.area}
                                    </p>
                                    <p>
                                        <strong>{ t('date')}</strong>{" "}
                                        <time dateTime={request.date}>
                                            {request.date}
                                        </time>
                                    </p>
                                    <p className={styles.request_state}>
                                        <GrStatusGoodSmall />
                                        <strong>{request.status}</strong>
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
            <section className={styles.postulations_section}>
                {currentRequest && (
                    <>
                        <header className={styles.request_extended_header}>
                            <p className={styles.request_state}>
                                <GrStatusGoodSmall />
                                <strong>{currentRequest.status}</strong>
                            </p>
                            <h2>{currentRequest.title}</h2>
                            <div className={styles.member_status}>
                                <h3>{t('members')}</h3>
                                <p>
                                    <strong>Necesitados</strong>{" "}
                                    {currentRequest.membersNeeded}
                                </p>
                                <p>
                                    <strong>{t('accepted')}</strong> 17
                                </p>
                                <p>
                                    <strong>{t('Faltantes')}</strong> 8
                                </p>
                            </div>
                        </header>
                        <section className={styles.request_extended_info}>
                            <p>
                                <strong>{t('Ubicacion')}</strong> Facatativá
                            </p>
                            <p>
                                <strong>{t('area1') }</strong> {currentRequest.area}
                            </p>
                            <p className={styles.description}>
                                {currentRequest.description}
                            </p>
                        </section>
                        <section className={styles.request_postulations}>
                            <h2> {t('Postulaciones')}</h2>
                            <div className={styles.postulants_container}>
                                <h3>{t('Aceptados')}</h3>
                                {postulants.map((postulant) => {
                                    if (postulant.status === 1)
                                        return (
                                            <div
                                                key={postulant.id}
                                                className={
                                                    styles.postulant_card
                                                }
                                            >
                                                <div
                                                    className={
                                                        styles.img_container
                                                    }
                                                >
                                                    <img
                                                        alt="Request"
                                                        src={
                                                            postulant.profileImg
                                                        }
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        styles.postulant_info
                                                    }
                                                >
                                                    <h4>
                                                        {postulant.username}
                                                    </h4>
                                                    <p>
                                                        <strong>
                                                            {t('Dinero pedido')}
                                                        </strong>
                                                        {postulant.moneyOrdered}
                                                    </p>
                                                    <div
                                                        className={
                                                            styles.postulant_btns
                                                        }
                                                    >
                                                        <button
                                                            className={
                                                                styles.bg_red
                                                            }
                                                        >
                                                            {t('Deshacer Aceptación')}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                })}
                            </div>
                            <div className={styles.postulants_container}>
                                <h3>{t('Pendientes')}</h3>
                                {postulants.map((postulant) => {
                                    if (postulant.status === 0)
                                        return (
                                            <div
                                                className={
                                                    styles.postulant_card
                                                }
                                            >
                                                <div
                                                    className={
                                                        styles.img_container
                                                    }
                                                >
                                                    <img
                                                        alt="Request"
                                                        src={
                                                            postulant.profileImg
                                                        }
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        styles.postulant_info
                                                    }
                                                >
                                                    <h4>
                                                        {postulant.username}
                                                    </h4>
                                                    <p>
                                                        <strong>
                                                            {t('Dinero pedido')}
                                                        </strong>{" "}
                                                        {postulant.moneyOrdered}
                                                    </p>
                                                    <div
                                                        className={
                                                            styles.postulant_btns
                                                        }
                                                    >
                                                        <button
                                                            className={
                                                                styles.bg_blue
                                                            }
                                                        >
                                                            {t('Contraoferta')}
                                                        </button>
                                                        <button
                                                            className={
                                                                styles.bg_green
                                                            }
                                                        >
                                                            {t('Aceptar')}
                                                        </button>
                                                        <button
                                                            className={
                                                                styles.bg_red
                                                            }
                                                        >
                                                            {t('Rechazar')}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                })}
                            </div>
                        </section>
                    </>
                )}
            </section>
        </div>
    );
};

export default MyRequests;
