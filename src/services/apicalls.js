import axios from 'axios';

// Register Users

export const registerUser = async (body) => {
    return axios.post("http://127.0.0.1:3000/users/register",body);

};

