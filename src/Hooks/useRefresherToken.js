import axios from "axios";
import { API_ENDPOINT } from "../config";
import useCtx from "./useCtx";

const useRefresherToken = () => {
    const {setToken} = useCtx();

    const refresh = async () => {
        console.log("HEREEEE!!");
        const respone = await axios.get(`${API_ENDPOINT}user/refresh`,{
            headers: { "Content-Type": "application/json"},
            withCredentials: true
        });
        setToken(prev => {
            console.log("antiguo",JSON.stringify(prev));
            console.log("nuevo",respone.data.accessToken);
            return respone.data.accessToken;
        });
        return respone.data.accessToken;
    }
    return refresh;
};

export default useRefresherToken; 