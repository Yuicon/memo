/**
 * @author Yuicon
 */

const apiBase = "https://api.penglei.wang";

const ContentType = {
    JSON: "application/json;charset=UTF-8",
    FORM: "application/x-www-form-urlencoded; charset=UTF-8"
};

const HttpMethod = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    PATCH: "PATCH",
    DELETE: "DELETE"
};

const _get = (url, body = null) => {
    url = `${apiBase}/${url}`;
    if (body !== null) {
        url = new URL(url);
        Object.keys(body).forEach(key => url.searchParams.append(key, body[key]));
    }

    const promise = fetch(url, {
        method: HttpMethod.GET,
        headers: getHeaders(),
    });
    return handleFetch(promise);
};

const _post = (url, body) => {
    url = `${apiBase}/${url}`;
    const promise = fetch(url, {
        method: HttpMethod.POST,
        headers: getHeaders(),
        body: JSON.stringify(body)
    });
    return handleFetch(promise);
};

const handleFetch = promise => {
    return promise
        .then(response => checkStatus(response));
};

const checkStatus = response => {
    if (response.status >= 200 && response.status < 300) {
        return response.json();
    } else if (response.status === 401) {
        // todo
    } else {
        return response;
    }
};

const isSuccess = json => {
    if (!json.success) {
        return new Error(json.message);
    }
    return json;
};

const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": ContentType.JSON,
        "Token": token
    }
};

module.exports = {
    get: _get,
    post: _post
};





