/**
 * @author Yuicon
 */
import 'whatwg-fetch';
import {Observable} from 'rxjs/Observable';
import {AsyncSubject} from 'rxjs/AsyncSubject';
import {defer} from 'rxjs/observable/defer';
import {apiHeaders, HOST, toQueryString} from "./baseApi";

export const rxFetch = (url, option = {}) => {
    return Observable::defer(() => {
        if (didSubscribe) {
            throw new Error('can not subscribe to rxjs-fetch result more than once');
        }

        let didSubscribe = true;

        const subject = new AsyncSubject();

        fetch(url, option)
            .then(promiseResponse => {
                subject.next(promiseResponse);
                subject.complete();
            })
            .catch(err => subject.error(err));

        return subject;
    });
};

function get(url, queryParam = {}, host = HOST) {
    url = `${host}/${url}`;
    let queryStr = toQueryString(queryParam);
    let s = /\?/i.test(url) ? '&' : '?';
    if (!/^\s*$/.test(queryStr)) {
        url = `${url}${s}${queryStr}`;
    }
    return rxFetch(url, {
        method: 'GET',
        headers: apiHeaders
    });
}

function post(url, params = {}, host = HOST) {
    url = `${host}/${url}`;
    return rxFetch(url, {
        method: 'POST',
        headers: apiHeaders,
        body: JSON.stringify(params)
    });
}

export const rxHttp = {};
rxHttp.get = get;
rxHttp.post = post;

