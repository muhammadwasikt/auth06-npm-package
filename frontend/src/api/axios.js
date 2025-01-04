import toast from "react-hot-toast";
import apiClient from ".";



const getReq = async (path) => {
    try {
        const response = await apiClient.get(path)
        toast.success(response?.data.message)
        return response?.data;
    } catch (error) {
        toast.error(error.message)
        toast.error(error.response.data.message)
    }
}

const postReq = async (path , data) => {
    try {
        const response = await apiClient.post(path , data)
        toast.success(response?.data.message)
        if (response?.data.token) {
            localStorage.setItem("userId",response?.data.token)
        }
        return response?.data;
    } catch (error) {
        toast.error(error.message)
        toast.error(error.response.data.message)
    }
}

const deletReq = async (path) => {
    try {
        const response = await apiClient.delete(path)
        toast.success(response?.data.message)
        return response?.data;
    } catch (error) {
        toast.error(error.message)
        toast.error(error.response.data.message)
    }
}

const putReq = async (path , data) => {
    try {
        const response = await apiClient.put(path , data)
        toast.success(response?.data.message)
        return response?.data;
    } catch (error) {
        toast.error(error.message)
        toast.error(error.response.data.message)
    }
}


export { getReq , postReq , deletReq , putReq };