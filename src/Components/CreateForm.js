import React from "react";
import styles from "./CreateForm.module.css";
import Button from "./UI/Button";

const CreateForm = (props) => {
    const showCardHandler = (event) => {
        event.preventDefault();
        props.onShowCard(true);
    };

    return (
        <React.Fragment>
            <form className={styles.CreateForm} onSubmit={showCardHandler}>
                <input
                    className={styles.customInput}
                    type="text"
                    id="titulo"
                    placeholder="Introduce el titulo"
                />
                <input className={styles.customInput} type="date" id="fecha" />
                <select className={styles.customInput} id="ciudad">
                    <option value="" disabled selected>
                        Ciudad
                    </option>
                    <option value="opcion1">Facatativa</option>
                    <option value="opcion2">San Juan</option>
                    <option value="opcion3">Bogota</option>
                    <option value="opcion4">Madrid</option>
                </select>
                <div className={styles.inputGroup}>
                    <label htmlFor="numMb">
                        Cantidad de miembros necesitados
                    </label>
                    <input
                        className={`${styles.smallInput} ${styles.customInput}`}
                        type="number"
                        id="numMb"
                        min="1"
                        step="1"
                        defaultValue="1"
                    />
                </div>
                <textarea
                    className={styles.customInput}
                    id="descripcion"
                    rows="4"
                    placeholder="Describe tu solicitud"
                    maxLength="250"
                ></textarea>
                <div className={styles.inputGroup}>
                    <label>Imagen acerca de la solicitud</label>
                    <label
                        htmlFor="imagen"
                        className={`${styles.smallInput} ${styles.customInput} ${styles.pointer}`}
                    >
                        <i class="fa-solid fa-image"></i>
                    </label>
                    <input
                        className={styles.fileInput}
                        type="file"
                        id="imagen"
                    />
                </div> 
                <Button
                    color="greenBtn"
                    content="Crear"
                    icon="fa-solid fa-square-plus fa-lg"
                />
            </form>
        </React.Fragment>
    );
};

export default CreateForm;
