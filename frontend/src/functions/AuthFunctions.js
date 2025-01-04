import { postReq } from "../api/axios";


const registerd = async (data) => {
    try {
        const response = await postReq('https://auth06-npm-package.up.railway.app/register', data);
    }
    catch (error) {
        console.error(error);
    }
}








export {registerd}