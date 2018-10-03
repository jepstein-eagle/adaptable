"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringExtensions;
(function (StringExtensions) {
    function IsNull(stringToCheck) {
        return stringToCheck == null;
    }
    StringExtensions.IsNull = IsNull;
    function IsNotNull(stringToCheck) {
        return !StringExtensions.IsNull(stringToCheck);
    }
    StringExtensions.IsNotNull = IsNotNull;
    function IsEmpty(stringToCheck) {
        return stringToCheck == "";
    }
    StringExtensions.IsEmpty = IsEmpty;
    function IsNotEmpty(stringToCheck) {
        return !StringExtensions.IsEmpty(stringToCheck);
    }
    StringExtensions.IsNotEmpty = IsNotEmpty;
    function IsNullOrEmpty(stringToCheck) {
        return StringExtensions.IsNull(stringToCheck) || StringExtensions.IsEmpty(stringToCheck);
    }
    StringExtensions.IsNullOrEmpty = IsNullOrEmpty;
    function IsNotNullOrEmpty(stringToCheck) {
        return StringExtensions.IsNotNull(stringToCheck) && StringExtensions.IsNotEmpty(stringToCheck);
    }
    StringExtensions.IsNotNullOrEmpty = IsNotNullOrEmpty;
    function PlaceSpaceBetweenCapitalisedWords(stringToCheck) {
        return stringToCheck.replace(/([A-Z])/g, ' $1').trim();
    }
    StringExtensions.PlaceSpaceBetweenCapitalisedWords = PlaceSpaceBetweenCapitalisedWords;
    function RemoveTrailingComma(stringToCheck) {
        return stringToCheck.replace(/,\s*$/, "");
    }
    StringExtensions.RemoveTrailingComma = RemoveTrailingComma;
    function ToLowerCase(stringToCheck) {
        return (StringExtensions.IsNullOrEmpty(stringToCheck)) ? stringToCheck : stringToCheck.toLowerCase();
    }
    StringExtensions.ToLowerCase = ToLowerCase;
})(StringExtensions = exports.StringExtensions || (exports.StringExtensions = {}));
