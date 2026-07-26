import axios from "axios";


const api = axios.create({

    baseURL:"http://localhost:8000",

});


export const sendMessage = async(message)=>{

    const response = await api.post(
        "/api/chat",
        {
            message:message
        }
    );


    return response.data;

};