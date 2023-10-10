import React, { useState } from "react";
import useCtx from "../../Hooks/useCtx";
import styles from "./CreateForm.module.css";
import Button from "../UI/Button/Button";

const CreateForm = (props) => {
    const ctx = useCtx();
    const [locationServiceID, setLocationServiceID] = useState(0);
    const [areaServiceID, setAreaServiceID] = useState(0);
    const [requestContent, setRequestContent] = useState("");
    const [publicationReqDate, setPublicationReqDate] = useState(
        new Date().toISOString().slice(0, 10)
    );
    const [membersNeeded, setMembersNeeded] = useState(1);
    const [requestPicture, setRequestPicture] = useState(null);
    const [requestTitle, setRequestTitle] = useState("");
    // props.onShowCard(true);
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("MembersNeeded", Number(membersNeeded));
        formData.append("LocationServiceID", locationServiceID);
        formData.append("RequestContent", requestContent);
        formData.append("PublicationReqDate", publicationReqDate);
        formData.append("MembersNeeded", membersNeeded);
        formData.append("AreaID_Request", areaServiceID);
        if (requestPicture) formData.append("RequestPicture", requestPicture);
        formData.append("RequestTitle", requestTitle);
        ctx.onSetForm(formData);
        console.log("form In Create Request 1",formData);
        console.log("form In Create Request 2",ctx.formData);
        ctx.onSetRequestAction("CREATE_REQUEST");
        /*
        try {
            const response = await axios.post(
                `${API_ENDPOINT}Request`,
                formData
            );
            console.log("Request created successfully:", response.data);
        } catch (error) {
            console.error("Error creating request:", error);
        }*/
    };

    return (
        <React.Fragment>
            <form className={styles.CreateForm} onSubmit={handleSubmit}>
                <input
                    className={styles.customInput}
                    type="text"
                    id="titulo"
                    placeholder="Introduce el titulo"
                    value={requestTitle}
                    onChange={(e) => setRequestTitle(e.target.value)}
                />
                <input
                    className={styles.customInput}
                    type="date"
                    id="fecha"
                    value={publicationReqDate}
                    onChange={(e) => setPublicationReqDate(e.target.value)}
                />
                <div className={`${styles.input_group} ${styles.select_group}`}>
                    <label>DEPARTAMENTO DONDE VIVES</label>
                    <select
                        className={styles.customInput}
                        id="department"
                        defaultValue={0}
                        onClick={(e) => {
                            ctx.SetSelDepartment(e.target.value);
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
                <div className={`${styles.input_group} ${styles.select_group}`}>
                    <label>CIUDAD DONDE VIVES</label>
                    <select
                        id="ciudad"
                        defaultValue={0}
                        className={
                            locationServiceID == 0
                                ? styles.invalid_input
                                : undefined
                        }
                        onClick={(e) => setLocationServiceID(e.target.value)}
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
                        value={membersNeeded}
                        onChange={(e) => setMembersNeeded(e.target.value)}
                    />
                </div>
                
                <div className={`${styles.input_group} ${styles.select_group}`}>
                    <label>AREA</label>
                    <select
                    className={styles.customInput}
                    id="categoria"
                    value={areaServiceID}
                    onChange={(e) => setAreaServiceID(e.target.value)}
                >
                    <option value="0" disabled>
                        Area
                    </option>
                    <option value="1">Fontaneria</option>
                    <option value="2">Educacion</option>
                    <option value="3">Mascotas</option>
                    <option value="4">Medicina</option>
                    <option value="4">Construccion</option>
                </select>
                </div>
                <textarea
                    className={styles.customInput}
                    id="descripcion"
                    rows="4"
                    placeholder="Describe tu solicitud"
                    maxLength="250"
                    value={requestContent}
                    onChange={(e) => setRequestContent(e.target.value)}
                ></textarea>
                <div className={styles.inputGroup}>
                    <label>Imagen acerca de la solicitud</label>
                    <label
                        htmlFor="imagen"
                        className={`${styles.smallInput} ${styles.customInput} ${styles.pointer}`}
                    >
                        <i className="fa-solid fa-image"></i>
                    </label>
                    <input
                        className={styles.fileInput}
                        type="file"
                        id="imagen"
                        onChange={(e) => setRequestPicture(e.target.files[0])}
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
