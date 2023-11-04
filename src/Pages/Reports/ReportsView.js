import React, { useState, useEffect } from "react";
import styles from "../SearchRequest/SearchRequest.module.css";
import MainBanner from "../../Components/UI/MainBanner/MainBanner";
import QuoteMessage from "../../Components/UI/QuoteMessage/QuoteMessage";
import InfoSection from "../../Components/UI/InfoSection/InfoSection";
import { Document, Page } from 'react-pdf';
import { API_ENDPOINT } from "../../config";
import axios from 'axios';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';


const ReportsView = () => {

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [reportData, setReportData] = useState(null);
    const [selectedReport, setSelectedReport] = useState('');
    const [statusResponse, setstatusResponse] = useState(null);


    const viewReport = async (reportName) => {
        try {
            const response = await axios.get(`${API_ENDPOINT}ReportingServices/${reportName}`, { responseType: 'blob' });
            console.log("Response Headers:", response.headers);

            const contentType = response.headers['content-type'];
            if (contentType !== 'application/pdf') {
                console.error("Unexpected Content-Type:", contentType);
            }
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const objectURL = URL.createObjectURL(blob);

            setReportData(objectURL);

        } catch (error) {
            console.error("Error al obtener el reporte:", error);

            if (error.response) {
                setstatusResponse(error.response.data.statusCode);
            } else {
                setstatusResponse("Error desconocido");
            }
        }
    };


    const handleReportSelection = (e) => {
        const selectedReportName = e.target.value;
        setSelectedReport(selectedReportName);
        viewReport(selectedReportName);
    }


    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    }

    return (
        <React.Fragment>
            <MainBanner>
                <div className={styles.bannerMessage}>
                    <div className={styles.mainMessage}>
                        <h1>Reportes</h1>

                    </div>
                    <QuoteMessage
                        messageHead="¿Que deseas atender hoy?"
                        messagePg='"Lo que sea sabemos que lo harás bien"'
                    />
                </div>
                <div className={styles.filters}>
                    <select onChange={handleReportSelection}>
                        <option value="">Seleccione un reporte</option>

                        <option value="RegistroUsuarios">RegistroUsuarios</option>
                        <option value="ListaSolicitudes">ListaSolicitudes</option>
                    </select>
                </div>
            </MainBanner>
            <InfoSection>
                {selectedReport && (
                    <div>
                        <h3>Visualizando: {selectedReport}</h3>

                        <a href={reportData} download={`${selectedReport}.pdf`}>
                            <button className={styles.downloadButton}>Descargar Reporte</button>
                        </a>


                        <Document
                            file={reportData}
                            onLoadSuccess={onDocumentLoadSuccess}
                        >
                            <Page pageNumber={pageNumber} />
                        </Document>

                    </div>
                )}
            </InfoSection>
        </React.Fragment>
    );
};

export default ReportsView;
