"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NumberExtensions;
(function (NumberExtensions) {
    function abbreviateNumber(numberToAbbreviate) {
        let str = "";
        if (numberToAbbreviate >= 1000000000) {
            str = (numberToAbbreviate / 1000000000).toFixed(1) + "B";
        }
        else if (numberToAbbreviate >= 1000000) {
            str = (numberToAbbreviate / 1000000).toFixed(1) + "M";
        }
        else if (numberToAbbreviate >= 1000) {
            str = (numberToAbbreviate / 1000).toFixed(1) + "K";
        }
        else {
            str = numberToAbbreviate.toString();
        }
        return str;
    }
    NumberExtensions.abbreviateNumber = abbreviateNumber;
})(NumberExtensions = exports.NumberExtensions || (exports.NumberExtensions = {}));
