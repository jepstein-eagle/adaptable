"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("../Enums");
var EnumExtensions;
(function (EnumExtensions) {
    // export function getNamesAndValues<T extends number>(e: any) {
    //     return EnumExtensions.getNames(e).map(n => ({ name: n, value: e[n] as T }));
    // }
    function getNames(e) {
        return EnumExtensions.getObjValues(e).filter(v => typeof v === "string");
    }
    EnumExtensions.getNames = getNames;
    function getValues(e) {
        return EnumExtensions.getObjValues(e).filter(v => typeof v === "number");
    }
    EnumExtensions.getValues = getValues;
    function getObjValues(e) {
        return Object.keys(e).map(k => e[k]);
    }
    EnumExtensions.getObjValues = getObjValues;
    function getCssFontSizeFromFontSizeEnum(fontSize) {
        switch (fontSize) {
            case Enums_1.FontSize.XLarge:
                return "x-large";
            case Enums_1.FontSize.Large:
                return "large";
            case Enums_1.FontSize.Medium:
                return "medium";
            case Enums_1.FontSize.Small:
                return "small";
            case Enums_1.FontSize.XSmall:
                return "x-small";
        }
    }
    EnumExtensions.getCssFontSizeFromFontSizeEnum = getCssFontSizeFromFontSizeEnum;
})(EnumExtensions = exports.EnumExtensions || (exports.EnumExtensions = {}));
