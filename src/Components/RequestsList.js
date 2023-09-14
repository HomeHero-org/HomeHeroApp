import React, { useState, useEffect } from "react";
import axios from "axios";
import ReqNormalCard from "./ReqNormalCard";
import { API_ENDPOINT } from "../config";
import styles from "./RequestListCard.module.css";
import ExtendedCard from "./ExtendedCard";

const RequestsList = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showExtendedCard, setShowExtendedCard] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}Request`);
        setRequests(response.data.result);
        setIsLoading(false);
        console.log("Funciono!");
      } catch (error) {
        console.error("Error fetching requests:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

    const showExtendedInfoHandler = (request) => {
        setShowExtendedCard(true);
        setSelectedRequest(request);
    };


  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.RequestsList}>
    {showExtendedCard && 
    <ExtendedCard 
        picture={`data:image/jpeg;base64,${selectedRequest.requestPicture}`}
        infoReq={{
            title: selectedRequest.requestTitle,
            location: selectedRequest.locationServiceID, 
            description: selectedRequest.requestContent,
            numHeroes: selectedRequest.membersNeeded,
            date: new Date(selectedRequest.publicationReqDate).toLocaleDateString(),                     
        }} 
        clearExtendCard={() => setShowExtendedCard(false)} 
    />
}
      {requests.map(request => (
        <ReqNormalCard 
          key={request.requestID} 
          picture={`data:image/jpeg;base64,${request.requestPicture}`}
          infoReq={{
            title: request.requestTitle,
            location: request.locationServiceID, // puedes mapear el ID a una ubicación real
            description: request.requestContent,
            numHeroes: request.membersNeeded,
            date: new Date(request.publicationReqDate).toLocaleDateString(),
            category: "", // si la API no proporciona la categoría, necesitas proporcionarla de alguna otra forma
          }}
          showExtendInfo={() => showExtendedInfoHandler(request)}
        />
      ))}
    </div>
  );
};

export default RequestsList;
