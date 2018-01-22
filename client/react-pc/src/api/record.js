import {rxHttp} from "./rxBaseApi";

/**
 * @author Yuicon
 */
export function rxCreate(params = {}) {
    return rxHttp.post('record', params);
}