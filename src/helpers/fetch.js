const baseUrl = process.env.REACT_APP_API_URL;

const fetchWithoutToken = (endPoint, method = "GET", data = {}) => {

    if (method === "GET") {
        return fetch(`${baseUrl}/${endPoint}`);
    } else {

        const options = {
            method,
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        };

        return fetch(`${baseUrl}/${endPoint}`, options);
    }

};

const fetchWithToken = (endPoint, method = "GET", data = {}) => {

    const token = localStorage.getItem("token") || "";

    if (method === "GET") {
        return fetch(`${baseUrl}/${endPoint}`, {
            method,
            headers: {
                "x-token": token
            }
        });
    } else {

        return fetch(`${baseUrl}/${endPoint}`, {
            method,
            headers: {
                "x-token": token,
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        });
    }

};

export {
    fetchWithoutToken,
    fetchWithToken
};