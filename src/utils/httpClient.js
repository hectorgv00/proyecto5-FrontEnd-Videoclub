import axios from "axios";
import { Await } from "react-router-dom";

// const jwt = localStorage.getItem("jwt");
export const API = "https://backend-videoclub-modify-production.up.railway.app";


export function httpGet(path, jwt) {
    return fetch(API + path, {
        headers: {
            Authorization:
                "Bearer " + jwt
        },
    })

        .then((res) => res.json())
};

export function httpGetSeries(path, jwt) {
    return fetch(API + path, {
        headers: {
            Authorization:
                "Bearer " + jwt
        },
    })

        .then((res) => res.json())
};


export const getUsersAdmin = async (jwt) => {
    let data = await axios.get( `${API}/users/all`, {
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


export function getMyLoansMovies(jwt) {
    return fetch(`${API}/loans/myloans/movies`, {
        headers: {
            Authorization:
                "Bearer " + jwt
        },
    })

        .then((res) => res.json())
}

export function getMyLoansSeries(jwt) {
    return fetch(`${API}/loans/myloans/series`, {
        headers: {
            Authorization:
                "Bearer " + jwt,

            // "Content-type": "application/json;charset=utf-8",
        },
    })

        .then((res) => res.json())
}