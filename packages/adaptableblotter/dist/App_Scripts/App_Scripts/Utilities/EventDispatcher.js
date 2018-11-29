"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventDispatcher {
    constructor() {
        this._subscriptions = new Array();
    }
    Subscribe(fn) {
        if (fn) {
            this._subscriptions.push(fn);
        }
    }
    Unsubscribe(fn) {
        let i = this._subscriptions.indexOf(fn);
        if (i > -1) {
            this._subscriptions.splice(i, 1);
        }
    }
    Dispatch(sender, args) {
        for (let handler of this._subscriptions) {
            handler(sender, args);
        }
    }
}
exports.EventDispatcher = EventDispatcher;
