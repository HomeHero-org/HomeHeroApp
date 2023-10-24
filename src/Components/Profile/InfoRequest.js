import styles from "./InfoRequest.module.css";
import MiniCard from "./MiniCard/MiniCard";

const InfoRequest = () => {
    return (
        <section className={styles.info_request}>
            <MiniCard description = "Tus Solicitudes Activas" number={1222} /> 
            <MiniCard description = "Tus Solicitudes Completadas" number={6} /> 
            <MiniCard description = "Calificaciones Pendientes por Hacer" number={6} />
            <MiniCard description = "Ayudas Hechas Este en Octubre" number={7} /> 
            <MiniCard description = "Ayudas Hechas Esta Semana " number={3012} /> 
            <MiniCard description = "Ayudas Hechas Este dia" number={1854} /> 
        </section>
    );
};

export default InfoRequest;
