import { useContext } from "react";
import PageContext from "../Store/page-context";

const useCtx = () => {
    return useContext(PageContext);
}

export default useCtx;