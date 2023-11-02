import React, { useState } from "react";
import useCtx from "../../Hooks/useCtx";
import styles from "./CreateForm.module.css";
import Button from "../UI/Button/Button";
import { useTranslation } from 'react-i18next';


const CreateForm = (props) => {
    const { t } = useTranslation();
    const ctx = useCtx();
    const [locationServiceID, setLocationServiceID] = useState(0);
    const [nameLocationService, setnameLocationService] = useState("");
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
        formData.append("LocationName", nameLocationService);
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
                    placeholder={t('enter_title')}
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
                   <label>{t('department_where_you_live')}</label>
                    <select
                        className={styles.customInput}
                        id="department"
                        defaultValue={0}
                        onClick={(e) => {
                            ctx.SetSelDepartment(e.target.value);
                        }}
                    >
                        <option value="0" disabled>
                            {t('departamento')}
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
                    <label>{t('City where you live')}</label>
                    <select
                        id="ciudad"
                        defaultValue={0}
                        className={
                            locationServiceID == 0
                                ? styles.invalid_input
                                : undefined
                        }
                        onChange={(e) => {
                            const selectedOption = e.target.options[e.target.selectedIndex];
                            setLocationServiceID(selectedOption.value);
                            setnameLocationService(selectedOption.getAttribute('name'));
                        }}
                    >
                        <option value="0" disabled>
                            {t('city')}
                        </option>
                        {ctx.citiesList &&
                            ctx.citiesList.map((city) => (
                                <option key={city.id} value={city.id} name={city.name}>
                                    {city.name}
                                </option>
                            ))}
                    </select>
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="numMb">{t('number_of_members_needed')}</label>
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
                    <label>{t('area')}</label>
                    <select
                    className={styles.customInput}
                    id="categoria"
                    value={areaServiceID}
                    onChange={(e) => setAreaServiceID(e.target.value)}
                >
                        <option value="0" disabled>{t('area')}</option>
                        <option value="1">{t('plumbing')}</option>
                        <option value="2">{t('education')}</option>
                        <option value="3">{t('pets')}</option>
                        <option value="4">{t('medicine')}</option>
                </select>
                </div>
                <textarea
                    className={styles.customInput}
                    id="descripcion"
                    rows="4"
                    placeholder={t('describe_your_request')}
                    maxLength="250"
                    value={requestContent}
                    onChange={(e) => setRequestContent(e.target.value)}
                ></textarea>
                <div className={styles.inputGroup}>
                    <label>{t('image_about_request')}</label>
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
                    content={t('create_button')}
                    icon="fa-solid fa-square-plus fa-lg"
                />

            </form>
        </React.Fragment>
    );
};

export default CreateForm;
