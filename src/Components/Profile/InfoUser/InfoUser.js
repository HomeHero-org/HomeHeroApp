import styles from "./InfoUser.module.css";
import { useEffect, useState } from "react";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import imgProfile from "../../../Images/user_default_photo.jpg";
import { FaFileCircleCheck, FaFileCircleExclamation } from "react-icons/fa6";
import axios from "axios";
import { API_COLOMBIA } from "../../../config";
import { isEditable } from "@testing-library/user-event/dist/utils";

const InfoUser = (props) => {
    const initImage = props.userInfo.profileImg
        ? props.userInfo.profileImg
        : imgProfile;
    const [citiesList, setCitiesList] = useState([]);
    const [selectedCity, setSelectedCity] = useState();
    const [selectedImage, setSelectedImage] = useState(initImage);
    const getCites = async () => {
        try {
            const response = await axios.get(`${API_COLOMBIA}City`);
            const citiesList = response.data.map((city) => ({
                id: city.id,
                name: city.name,
            }));
            setCitiesList(citiesList);
        } catch (error) {
            console.error("Error fetching requests:", error);
            return [];
        }
    };

    useEffect(() => {
        getCites();
    }, []);

    useEffect(() => {
        if (!selectedCity && citiesList && !(citiesList instanceof Promise)) {
            setSelectedCity(
                citiesList.find((c) => c.id === props.userInfo.recidenceCity)
            );
        }
    }, [citiesList]);

    const [editInfo, setEditInfo] = useState(false);
    const [buttonText, setButtonText] = useState(
        editInfo ? "Guardar" : props.percentage === 100 ? "Editar" : "Completar"
    );
    const [pdfFile, setPDFFile] = useState(null);
    const fileType = ["application/pdf"];

    const pdfChangeHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            console.log("selectedFile", selectedFile);
            if (selectedFile && fileType.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onload = (e) => {
                    setPDFFile(e.target.result);
                };
            } else {
                setPDFFile(null);
            }
        }
    };

    useEffect(() => {
        if (pdfFile) {
            props.viewPDFHandler(pdfFile);
        }
    }, [pdfFile]);

    const userInfoHandler = () => {
        if (buttonText === "Guardar") {
            //Call the function for verify data and make Http Request to Update the Info
            setEditInfo(false);
            setButtonText(props.percentage === 100 ? "Editar" : "Completar");
        } else {
            setEditInfo(true);
            setButtonText("Guardar");
        }
    };

    const fileSelectorHandler = () => {
        if (editInfo) {
            document.getElementById("curriculum_input").click();
        }
        if (props.userInfo.curriculum) {
            document
                .getElementById("pdf_container")
                .scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    const imageChangeHandler = (e) => {
        const newImage = e.target.files[0];
        if(newImage){
            const blobUrl = URL.createObjectURL(newImage);
            setSelectedImage(blobUrl);
        }
    };

    const editPhotoHandler = () => {
        if (editInfo) {
            document.getElementById("image_input").click();
        } else {
            const a = document.createElement("a");
            a.href = selectedImage;
            a.download = "profileImage.jpg";
            a.style.display = "none";
            document.body.appendChild(a);
            a.click();
        }
    };

    return (
        <section className={styles.info_profile}>
            <div className={styles.percentage_group}>
                <div
                    className={styles.percentage}
                    style={{ width: `${props.percentage}%` }}
                >
                    <span className={styles.precentage_number}>
                        {props.percentage}%
                    </span>
                </div>
            </div>
            <button onClick={userInfoHandler} className={styles.edit_button}>
                {buttonText}
            </button>
            <div className={styles.main_info}>
                <div className={styles.img_container}>
                    <img src={selectedImage} />
                    <button
                        onClick={editPhotoHandler}
                        className={styles.photo_button}
                    >
                        {editInfo ? "Editar" : "Descargar"}
                    </button>
                    <input
                        onChange={imageChangeHandler}
                        type="file"
                        id="image_input"
                        accept="image/jpeg, image/png, image/jpg"
                        style={{ display: "none" }}
                    />
                </div>
                <button
                    className={styles.curriculum}
                    onClick={fileSelectorHandler}
                >
                    <p>Curriculum</p>
                    <BsFillFileEarmarkPdfFill size={50} />
                    <p className={styles.curriculum_state}>
                        {!props.userInfo.curriculum ? (
                            <>
                                <em className={styles.warning}>Pendiente</em>
                                <FaFileCircleExclamation
                                    className={styles.warning}
                                />
                            </>
                        ) : (
                            <>
                                <em className={styles.green}>Cargado</em>
                                <FaFileCircleCheck className={styles.green} />
                            </>
                        )}
                    </p>
                </button>
                <input
                    onChange={pdfChangeHandler}
                    type="file"
                    id="curriculum_input"
                    accept=".pdf"
                    style={{ display: "none" }}
                />
                <div className={styles.info_item}>
                    <label className={styles.item}>
                        <strong>Nombres</strong>
                        <input
                            type="text"
                            defaultValue={props.userInfo.names}
                            disabled={!editInfo}
                        ></input>
                    </label>
                    <label className={styles.item}>
                        <strong>Apellidos</strong>
                        <input
                            type="text"
                            defaultValue={props.userInfo.surnames}
                            disabled={!editInfo}
                        ></input>
                    </label>
                    <label className={`${styles.item}`}>
                        <strong>Email</strong>
                        <input
                            className={styles.long_input}
                            type="email"
                            defaultValue={props.userInfo.email}
                            disabled={!editInfo}
                        ></input>
                    </label>
                    <label className={styles.item}>
                        <strong>ID</strong>
                        <input
                            type="text"
                            defaultValue={props.userInfo.id}
                            disabled={!editInfo}
                        ></input>
                    </label>
                    <label className={styles.item}>
                        <strong>Ciudad de Residencia</strong>
                        <input
                            type="text"
                            defaultValue={selectedCity ? selectedCity.name : ""}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            disabled={!editInfo}
                            list="citiesList"
                        ></input>
                        <datalist id="citiesList">
                            {citiesList.map((city) => {
                                return (
                                    <option key={city.id} value={city.name}>
                                        {city.name}
                                    </option>
                                );
                            })}
                        </datalist>
                    </label>
                    <label className={styles.item}>
                        <strong>Genero</strong>
                        <input
                            type="text"
                            defaultValue={props.userInfo.gender}
                            disabled={!editInfo}
                        ></input>
                    </label>
                </div>
            </div>
        </section>
    );
};

export default InfoUser;
