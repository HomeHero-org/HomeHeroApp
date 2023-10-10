import axios from "axios";
import { API_ENDPOINT } from "../config";
import useCtx from "./useCtx";

const UseRefresherToken = () => {
    const {tokenData} = useCtx();

    const refresh = async () => {
        console.log("HEREEEE!!");
        const respone = await axios.get(`${API_ENDPOINT}user/refresh`,{
            headers: { "Content-Type": "application/json"},
            withCredentials: true
        });
        tokenData(prev => {
            console.log(JSON.stringify(prev));
            console.log(respone.data.accessToken);
            return respone.data.accessToken;
        });
        return respone.data.accessToken;
    }
    return refresh;
};

export default UseRefresherToken; 