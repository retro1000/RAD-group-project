import axios from 'axios';
//https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises
//https://api.api-ninjas.com/v1/exercises
// JtI3EC6WHysjaJVctA0xcg==9IvYksUIgdWjNWcF
// KmKZYk8ztUsMG8f69ln7upLSwcNNnQTOQZCumKdq
const api = async(muscle, offset) => {
    return await axios.get(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}&offset=${offset}`, {
    headers: {
        'X-Api-Key': 'JtI3EC6WHysjaJVctA0xcg==9IvYksUIgdWjNWcF',
        // 'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com',
        // 'X-RapidAPI-Key': 'e932f4ede1msh7ae875a57e2537ap1d0d46jsnf21ed14edd0d'
    }
    })
    .then(response => {
        if(response.status === 200) return response.data;
        else throw new Error('API error : '+response.status);
    })
    .catch(error => {
        throw new Error(error.message);
    });
}

export const API = {api};
