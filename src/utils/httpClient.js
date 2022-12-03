import axios from "axios";

const jwt = localStorage.getItem("jwt");
export const API = "http://127.0.0.1:3000";
// export const API = "https://backend-videoclub-modify-production.up.railway.app";

export const httpGet = async (content, target, criteria) => {
    try {
        let res = await axios.get(`${API}/${content}/${target}/${criteria}`, { headers: { "Authorization": "Bearer " + jwt } })
        return res.data;
    } catch (error) {
        console.error(error);
    }
};

export const getUsersAdmin = async (jwt) => {
    let data = await axios.get(`${API}/users/all`, {
        headers: {
            "Authorization":
                "Bearer " + jwt
        },

    })
    console.log(data)
    return data
}

export function getLoansAdmin(jwt) {
    return fetch(`${API}/loans/allloans`, {
        headers: {
            "Authorization":
                "Bearer " + jwt
        },
    })

        .then((res) => res.json())
}