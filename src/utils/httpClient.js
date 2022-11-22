const API = "https://api.themoviedb.org/3";

export function httpGet(path) {
    return fetch(API + path, {
        headers: {
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNzM4YzhkMGVhZTUxMDhjNTk1NDA2YWM5NWY2MjRkYyIsInN1YiI6IjYzNzRjN2Y2ZTZkM2NjMDBiNDY3NWZlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MaexZTiN1XCwLOl-uRyleFKiucFwu0FnCiz5XPLebAE",

            "Content-type": "application/json;charset=utf-8",
        },
    })

        .then((res) => res.json())
}