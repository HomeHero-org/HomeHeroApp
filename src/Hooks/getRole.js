import decodeJWT from "./decodeJWT";

const getRole = (token) => {
        const tokenInfo = token ? decodeJWT(token) : null;
        const codeRole = tokenInfo ? tokenInfo.role : "ANY";
        console.log("Desde useGetRole");
        console.log("token ugr",tokenInfo);
        console.log("codeRole",codeRole);
    return codeRole;
};

export default getRole;
