"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DateExtensions;
(function (DateExtensions) {
    // ignores time
    function IsDateInPast(date) {
        return new Date(date.toDateString()) < new Date(new Date().toDateString());
    }
    DateExtensions.IsDateInPast = IsDateInPast;
    function IsDateInFuture(date) {
        return !IsDateInPast(date);
    }
    DateExtensions.IsDateInFuture = IsDateInFuture;
})(DateExtensions = exports.DateExtensions || (exports.DateExtensions = {}));
