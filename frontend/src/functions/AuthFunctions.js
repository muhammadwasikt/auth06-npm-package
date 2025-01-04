import { postReq } from "../api/axios";


const register = async (data) => {
    try {
        const response = await postReq('https://auth06-npm-package.up.railway.app/register', data);
    }
    catch (error) {
        console.error(error);
    }
}