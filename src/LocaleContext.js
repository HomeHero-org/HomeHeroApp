import { createContext } from "react";

const defaulValue = {
    locale: 'es',
    setLoale: () => { }
}

export default createContext(defaulValue);