import { decodeToken } from "react-jwt";

const decodeJWT = (token) => {
    try {
        const tokenInfo = decodeToken(token);
        return tokenInfo;
    } catch (error) {
        console.error('Error trying to decode the JWT: ',error)
    }
}

export default decodeJWT;