"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticThemes = ['Light Theme', 'Dark Theme'];
exports.ThemesContent = new Map([
    // tslint:disable-next-line:no-var-requires
    ["Light Theme", require('./default/bootstrap.min.css')],
    // tslint:disable-next-line:no-var-requires
    ["Dark Theme", require('./slate/bootstrap.min.css')],
]);
