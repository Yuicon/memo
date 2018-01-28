/**
 * Created by Yuicon
 */

import {observable, action, runInAction} from 'mobx';
import {UserStore} from "./UserStore";
import {_throw} from "rxjs/observable/throw";
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

    runActionWrap = (response, runAction) => {
        response.json().then(data => {
            runAction(data);
        });
    };

    /**
     * rx请求入口
     * @param rxApi  Observable
     * @param runAction  use data
     * @returns {Observable}
     */
    @action('rx请求入口')
    rxFetch(rxApi, runAction = (data) => console.log(data)) {
        return rxApi::switchMap(response => {
            if (response.ok) {
                this.runActionWrap(response, runAction);
                return Observable::of(response);
            } else {
                let err = new Error('HTTP Error ' + response.status + ': ' + response.statusText);
                err.response = response;
                return Observable::_throw(err);
            }
        });
    }

}

export const rootStore = new RootStore();