/**
 * @author Yuicon
 */

import {observable, action, runInAction} from 'mobx'
import * as userApi from '../api/user';

export class UserStore {

    constructor(rootStore) {
        this.rootStore = rootStore
    }

    @observable currentUser = new User();

    @action('注册')
    async signUpAction(params = {}) {
        try {
            return this.rootStore.fetch(async () => {
                const data = await userApi.create(params);
                runInAction(() => {
                    this.currentUser = new User(data);
                    localStorage.setItem("token", this.currentUser.token);
                });
            });
        } catch (e) {
            console.log(e);
        }
    }

    @action('登陆')
    async login(params = {}) {
        try {
            return this.rootStore.fetch(async () => {
                const data = await userApi.login(params);
                runInAction(() => {
                    this.currentUser = new User(data);
                    localStorage.setItem("token", this.currentUser.token);
                });
            });
        } catch (e) {
            console.log(e);
        }
    }

    @action('验证token')
    async check() {
        try {
            return this.rootStore.fetch(async () => {
                const data = await userApi.check(this.currentUser.token);
                runInAction(() => {
                    this.currentUser = new User(data);
                    localStorage.setItem("token", this.currentUser.token);
                });
            });
        } catch (e) {
            console.log(e);
        }
    }

}

export class User {

    id = null;
    name = null;
    email = null;
    records = [];
    token = localStorage.getItem("token");

    constructor(obj = null) {
        if (obj) {
            this.id = obj.id;
            this.name = obj.name;
            this.email = obj.email;
            this.records = obj.records;
            this.token = obj.token;
        }
    }

}
