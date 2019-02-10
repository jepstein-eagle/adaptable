"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
exports.StaticThemes = ['Light Theme', 'Dark Theme'];
exports.ThemesContent = new Map([
    // tslint:disable-next-line:no-var-requires
    [GeneralConstants_1.LIGHT_THEME, require('./default/bootstrap.min.css')],
    // tslint:disable-next-line:no-var-requires
    [GeneralConstants_1.DARK_THEME, require('./slate/bootstrap.min.css')],
]);
