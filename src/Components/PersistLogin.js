import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefresherToken from "../Hooks/useRefresherToken";
import useCtx from "../Hooks/useCtx";
import { useNavigate } from "react-router-dom";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [log, setLog] = useState(false);
    const refresh = useRefresherToken();
    const { token , remeberLogin } = useCtx();
    const navigate = useNavigate();
    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
                setLog(true);
            } catch (err) {
                console.error(err);
                setLog(false);
            } finally {
                setIsLoading(false);
            }
        };
        !token ? verifyRefreshToken() : setIsLoading(false);
    }, []);

    return <>{isLoading ? <></> : <Outlet />}</>;
};

export default PersistLogin;
