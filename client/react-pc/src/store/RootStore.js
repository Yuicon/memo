/**
 * Created by Yuicon
 */

import {observable, action, runInAction} from 'mobx';
import {UserStore} from "./UserStore";
import {_throw} from "rxjs/observable/throw";
import {rxResolve} from "../api/rxBaseApi";
import {of} from "rxjs/observable/of";
import {Observable} from "rxjs/Observable";
import {switchMap} from "rxjs/operator/switchMap";
import {RecordStore} from "./RecordStore";

class RootStore {

    promiseStack = [];
    @observable animating = false;

    constructor() {
        this.userStore = new UserStore(this);
        this.recordStore = new RecordStore(this);
    }

    @action('发起请求')
    push() {
        runInAction(() => {
            this.promiseStack.push('promiseStack');
            if (!this.animating) {
                this.animating = true;
            }
        });
    }

    @action('请求结束')
    pop() {
        runInAction(() => {
            this.promiseStack.pop();
            if (this.promiseStack.length === 0) {
                this.animating = false;
            }
        });
    }

    @action('请求入口')
    async fetch(api) {
        try {
            this.push();
            await api();
            this.pop();
        } catch (e) {
            this.pop();
            console.log(e);
        }
    }

    /**
     * rx请求入口
     * @param rxApi  Observable
     * @param resolve  how get data
     * @param runAction  use data
     * @returns {Observable}
     */
    @action('rx请求入口')
    rxFetch(rxApi, resolve = rxResolve, runAction = (data) => console.log(data)) {
        return rxApi::switchMap(async response => {
            if (response.ok) {
                const data = await rxResolve(response);
                runAction(data);
                return Observable::of(data);
            } else {
                let err = new Error('HTTP Error ' + response.status + ': ' + response.statusText);
                err.response = response;
                return Observable::_throw(err);
            }
        });
    }

}

export const rootStore = new RootStore();