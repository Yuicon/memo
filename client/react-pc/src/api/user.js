/**
 * @author Yuicon
 */

import {http, resolve} from "./baseApi";
import {rxHttp} from "./rxBaseApi";

export function create(params = {}) {
    return http.post('user', params).then(resolve);
}

export function rxCreate(params = {}) {
    return rxHttp.post('user', params);
}

export function login(params = {}) {
    return http.post('login', params).then(resolve);
}

export function rxLogin(params = {}) {
    return rxHttp.post('login', params);
}

export function check(token = localStorage.getItem("token")) {
    return http.post('check', token).then(resolve);
}

export function rxCheck(token = localStorage.getItem("token")) {
    return rxHttp.post('check', token);
}