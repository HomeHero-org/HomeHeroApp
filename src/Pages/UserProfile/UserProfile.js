import { useEffect, useState } from "react";
import InfoRequest from "../../Components/Profile/InfoRequest";
import styles from "./UserProfile.module.css";
import InfoUser from "../../Components/Profile/InfoUser/InfoUser";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import profileIMG from '../../Images/userPf1.jpg';
import InfoQualification from "../../Components/Profile/InfoQualification/InfoQualification";
const getPercentage = (userInfo) => {
    const quantityUserData = Object.keys(userInfo).length;
    const quantityNotNullData = Object.keys(userInfo).filter(
        (key) => userInfo[key] !== null && userInfo[key] !== undefined
    ).length;
    return ((quantityNotNullData / quantityUserData) * 100).toFixed(1);
};

const UserProfile = () => {
    const [viewPDF, setViewPDF] = useState(null);
    const newplugin = defaultLayoutPlugin();
    const userInfo = {
        profileImg: profileIMG,
        names: "John Sebastián",
        surnames: "Galindo Hernandez",
        email: "johnsgalindo@ucundinamarca.edu.co",
        id: "1003566091",
        recidenceCity: 91,
        gender: "Masculino",
        curriculum: viewPDF,
    };
    const qualification = 3.2;
    const qualificationQuantity = 25;

    const viewPDFHandler = (pdfFile) => {
        if (pdfFile) {
            setViewPDF(pdfFile);
        } else {
            setViewPDF(null);
        }
    };

    return (
        <div className={styles.main_content}>
            <InfoUser
                userInfo={userInfo}
                percentage={getPercentage(userInfo)}
                viewPDFHandler={viewPDFHandler}
            />
            {viewPDF && (
                <section id="pdf_container" className={styles.pdf_container}>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                        <Viewer fileUrl={viewPDF} plugins={[newplugin]} />
                    </Worker>
                </section>
            )}
            <InfoQualification userQualification = {qualification} qualificationQuantity={qualificationQuantity}/>
        </div>
    );
};

export default UserProfile;
