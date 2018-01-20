/**
 * Created by Yuicon
 */
import 'whatwg-fetch';

export const HOST = 'http://localhost:8080';

export const apiHeaders = {
    'Authorization': localStorage.getItem('token'),
    'Content-Type': 'application/json',
};

export function toQueryString(obj, urlEncode) {
    function flattenObj(x, path) {
        const result = [];

        path = path || [];
        if (x === null || x === undefined) return;
        Object.keys(x).forEach((key) => {
            if (!x.hasOwnProperty(key)) {
                return;
            }

            const newPath = path.slice();
            newPath.push(key);

            let vals = [];
            if (x[key] === null || x[key] === undefined) {
                vals = [];
            } else if (typeof x[key] === 'object') {
                vals = flattenObj(x[key], newPath);
            } else {
                vals.push({path: newPath, val: x[key]});
            }
            vals.forEach((obj) => {
                return result.push(obj);
            });
        });

        return result;
    } // flattenObj

    // start with  flattening `obj`
    let parts = flattenObj(obj); // [ { path: [ ...parts ], val: ... }, ... ]

    // convert to array notation:
    parts = parts.map((varInfo) => {
        if (varInfo.path.length === 1) {
            varInfo.path = varInfo.path[0];
        }
        else {
            const first = varInfo.path[0];
            const rest = varInfo.path.slice(1);
            varInfo.path = first + '[' + rest.join('][') + ']';
        }
        return varInfo;
    }); // parts.map

    // join the parts to a query-string url-component
    const queryString = parts.map(function (varInfo) {
        return varInfo.path + '=' + varInfo.val;
    }).join('&');
    if (urlEncode) {
        return encodeURIComponent(queryString);
    } else {
        return queryString;
    }
}

function get(url, queryParam = {}, host = HOST) {
    url = `${host}/${url}`;
    let queryStr = toQueryString(queryParam);
    let s = /\?/i.test(url) ? '&' : '?';
    if (!/^\s*$/.test(queryStr)) {
        url = `${url}${s}${queryStr}`;
    }
    return fetch(url, {
        method: 'GET',
        headers: apiHeaders
    });
}

function $delete(url, queryParam = {}, host = HOST) {
    url = `${host}/${url}`;
    let queryStr = toQueryString(queryParam);
    let s = /\?/i.test(url) ? '&' : '?';
    if (!/^\s*$/.test(queryStr)) {
        url = `${url}${s}${queryStr}`;
    }
    return fetch(url, {
        method: 'DELETE',
        headers: apiHeaders
    });
}

function post(url, params = {}, host = HOST) {
    url = `${host}/${url}`;
    return fetch(url, {
        method: 'POST',
        headers: apiHeaders,
        body: JSON.stringify(params)
    });
}

export const resolve = (res) => {
    if (res.ok) {
        return res.json().then(
            (data) => {
                return data;
            });
    } else {
        console.log('response status is not ok:', new Error(res.statusText));
        return res.json().then(
            (data) => {
                return data;
            })
    }
};

export const http = {};
http.get = get;
http.post = post;
http.delete = $delete;