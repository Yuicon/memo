/**
 * @author Yuicon
 */

import {http, resolve} from "./baseApi";

export function create(params = {}) {
    return http.post('user', params).then(resolve)
}

export function login(params = {}) {
    return http.post('login', params).then(resolve)
}

export function check(token = localStorage.getItem("token")) {
    return http.post('check', token).then(resolve)
}