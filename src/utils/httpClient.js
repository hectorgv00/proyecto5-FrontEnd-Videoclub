import axios from "axios";

const jwt = localStorage.getItem("jwt");
const API = "http://127.0.0.1:3000";

export const httpGet = async (content, target, criteria) => {
    try {
        let res = await axios.get(`${API}/${content}/${target}/${criteria}`, {headers: {"Authorization": "Bearer " + jwt}})
        return res.data;
    } catch (error) {
        console.error(error);
    }
};

export const getUsersAdmin = async (jwt) => {
    let data = await axios.get('http://127.0.0.1:3000/users/all', {
        headers: {
            "Authorization":
                "Bearer " + jwt
        },

    })
    console.log(data)
    return data
}

export function getLoansAdmin(jwt) {
    return fetch('http://127.0.0.1:3000/loans/allloans', {
        headers: {
            "Authorization":
                "Bearer " + jwt
        },
    })

        .then((res) => res.json())
}


export function getMyLoansMovies(jwt) {
    return fetch('http://127.0.0.1:3000/loans/myloans/movies', {
        headers: {
            Authorization:
                "Bearer " + jwt
        },
    })

        .then((res) => res.json())
}

export function getMyLoansSeries(jwt) {
    return fetch('http://127.0.0.1:3000/loans/myloans/series', {
        headers: {
            Authorization:
                "Bearer " + jwt,

            // "Content-type": "application/json;charset=utf-8",
        },
    })

        .then((res) => res.json())
}