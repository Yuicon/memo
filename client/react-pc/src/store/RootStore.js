/**
 * Created by Yuicon
 */

import {observable, action, runInAction} from 'mobx';

class RootStore {

    promiseStack = [];
    @observable animating = false;

    constructor() {

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

}

export const rootStore = new RootStore();