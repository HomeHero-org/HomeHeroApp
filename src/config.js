import axios from "axios";

//const API_ENDPOINT = "https://localhost:7119/api/";

const API_ENDPOINT = "https://homeheroapi.azurewebsites.net/api/";

const API_COLOMBIA = "https://api-colombia.com/api/v1/";

export { API_ENDPOINT, API_COLOMBIA };

export const axiosPrivate = axios.create({
    baseURL: API_ENDPOINT,
    headers: { "Content-Type": "application/json"},
    withCredentials: true,
});
