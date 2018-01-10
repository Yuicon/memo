/**
 * @author Yuicon
 */

import {http, resolve} from "./baseApi";

export function create(params = {}) {
    return http.post('user', params).then(resolve)
}