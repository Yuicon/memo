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
    async registerAction(params = {}) {
        try {
            return this.rootStore.fetch(async () => {
                const data = await userApi.create(params);
                runInAction(() => {
                    this.currentUser = new User(data);
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

    constructor(obj = null) {
        if (obj) {
            this.id = obj.id;
            this.name = obj.name;
            this.email = obj.email;
            this.records = obj.records;
        }
    }

}
