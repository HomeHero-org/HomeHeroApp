import { axiosPrivate } from "../config";
import { useEffect } from "react";
import useRefresherToken from "./useRefresherToken";
import useCtx from "./useCtx";

const useAxiosPrivate = () => {
    const refresh = useRefresherToken();
    const ctx = useCtx();
    console.log("tokenPrivate",ctx.token);
    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    console.log("llego a useAxiosPrivate",ctx.token);

                    config.headers["Authorization"] = `Bearer ${ctx.token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers[
                        "Authorization"
                    ] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.response.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [ctx.token, refresh]);

    return axiosPrivate;
};

export default useAxiosPrivate;
