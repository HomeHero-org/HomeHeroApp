import React, { useState } from "react";
import styles from "./CreateForm.module.css";
import Button from "./UI/Button";
import axios from "axios";
import { API_ENDPOINT } from "../config";


const CreateForm = (props) => {
    const [locationServiceID, setLocationServiceID] = useState(0);
    const [requestContent, setRequestContent] = useState("");
    const [publicationReqDate, setPublicationReqDate] = useState(
      new Date().toISOString().slice(0, 10)
    );
    const [membersNeeded, setMembersNeeded] = useState(1);
    const [requestPicture, setRequestPicture] = useState(null);
    const [requestTitle, setRequestTitle] = useState("");
    // props.onShowCard(true);
    const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData();      
      formData.append("MembersNeeded", Number(membersNeeded));
      formData.append("LocationServiceID", locationServiceID);
      formData.append("RequestContent", requestContent);
      formData.append("PublicationReqDate", publicationReqDate);
      formData.append("MembersNeeded", membersNeeded);
      if (requestPicture) formData.append("RequestPicture", requestPicture);            
      formData.append("RequestTitle", requestTitle);
  
      try {
        const response = await axios.post(`${API_ENDPOINT}Request`, formData);
        console.log("Request created successfully:", response.data);
      } catch (error) {
        console.error("Error creating request:", error);
      }
    };

    return (
        <React.Fragment>
            <div>              
            </div>
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
                <select
                    className={styles.customInput}
                    id="ciudad"
                    value={locationServiceID}
                    onChange={(e) => setLocationServiceID(e.target.value)}
                >
                    <option value="" disabled selected>Ciudad</option>
                    <option value="1">Facatativa</option>
                    <option value="2">San Juan</option>
                    <option value="3">Bogota</option>
                    <option value="4">Madrid</option>
                </select>
                <label htmlFor="numMb">Cantidad de miembros necesitados</label>
                <input
                    className={`${styles.smallInput} ${styles.customInput}`}
                    type="number"
                    id="numMb"
                    min="1"
                    step='1'
                    defaultValue='1'
                    value={membersNeeded}
                    onChange={(e) => setMembersNeeded(e.target.value)}
                />
                <textarea
                    className={styles.customInput}
                    id="descripcion"
                    rows="4"
                    placeholder="Describe tu solicitud"
                    maxLength='250'
                    value={requestContent}
                    onChange={(e) => setRequestContent(e.target.value)}
                ></textarea>
                <label>Imagen acerca de la solicitud</label>
                <label htmlFor="imagen" className={`${styles.smallInput} ${styles.customInput} ${styles.pointer}`}><i class="fa-solid fa-image"></i></label>
                <input
                    className={styles.fileInput}
                    type="file"
                    id="imagen"
                    onChange={(e) => setRequestPicture(e.target.files[0])}
                />
                <Button color='greenBtn' content="Crear" icon="fa-solid fa-square-plus fa-lg" />
            </form>
        </React.Fragment>
        
    );
};

export default CreateForm;
