const API = "https://api.themoviedb.org/3";

const jwt = localStorage.getItem("jwt");

export function httpGet(path) {
    return fetch(API + path, {
        headers: {
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNzM4YzhkMGVhZTUxMDhjNTk1NDA2YWM5NWY2MjRkYyIsInN1YiI6IjYzNzRjN2Y2ZTZkM2NjMDBiNDY3NWZlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MaexZTiN1XCwLOl-uRyleFKiucFwu0FnCiz5XPLebAE",

            "Content-type": "application/json;charset=utf-8",
        },
    })

        .then((res) => res.json())
};

// TODO: nueva petición para nuestra BD

/* const API = "https://api.themoviedb.org/3";

export function httpGet(path) {
    return fetch(API + path, {
        headers: {
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNzM4YzhkMGVhZTUxMDhjNTk1NDA2YWM5NWY2MjRkYyIsInN1YiI6IjYzNzRjN2Y2ZTZkM2NjMDBiNDY3NWZlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MaexZTiN1XCwLOl-uRyleFKiucFwu0FnCiz5XPLebAE",

            "Content-type": "application/json;charset=utf-8",
        },
    })

        .then((res) => res.json())
};
 */


export function  getMyLoansMovies () {
    return fetch('http://127.0.0.1:3000/loans/myloans/movies', {
        headers: {
            Authorization:
                "Bearer "+jwt,

            "Content-type": "application/json;charset=utf-8",
        },
    })

        .then((res) => res.json())
}

export function getMyLoansSeries () {
    return fetch('http://127.0.0.1:3000/loans/myloans/series', {
        headers: {
            Authorization:
                "Bearer "+jwt,

            "Content-type": "application/json;charset=utf-8",
        },
    })

        .then((res) => res.json())
}