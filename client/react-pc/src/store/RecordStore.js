/**
 * @author Yuicon
 */
import {observable, action, runInAction} from 'mobx'
import * as recordApi from '../api/record';
import {rxResolve} from "../api/rxBaseApi";
import {User} from "./UserStore";

export class RecordStore {

    constructor(rootStore) {
        this.rootStore = rootStore
    }

    @action('创建记录')
    rxCreate(params) {
        return this.rootStore.rxFetch(recordApi.rxCreate(params),
            rxResolve,
            data => {
                runInAction(() => {
                    this.rootStore.userStore.currentUser = new User(data);
                });
            });
    }

}

export class Record {

    id = null;
    source = undefined;
    items = [];

    static build(record) {
        return new Record(record);
    }

    constructor(obj = null) {
        if (obj) {
            this.id = obj.id;
            this.source = obj.source;
            this.items = obj.items && obj.items.map(item => Item.buildItem(item));
        }
    }

}

export class Item {

    label = undefined;
    value = undefined;

    static buildItem(item) {
        return new Item(item)
    }

    constructor(obj = null) {
        if (obj) {
            this.label = obj.label;
            this.value = obj.value;
        }
    }

}
