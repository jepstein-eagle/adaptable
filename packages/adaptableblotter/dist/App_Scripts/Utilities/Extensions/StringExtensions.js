"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringExtensions;
(function (StringExtensions) {
    function IsNull(stringToCheck) {
        return stringToCheck == null;
    }
    StringExtensions.IsNull = IsNull;
    function IsNotNull(stringToCheck) {
        return !IsNull(stringToCheck);
    }
    StringExtensions.IsNotNull = IsNotNull;
    function IsEmpty(stringToCheck) {
        return stringToCheck == "";
    }
    StringExtensions.IsEmpty = IsEmpty;
    function IsNotEmpty(stringToCheck) {
        return !IsEmpty(stringToCheck);
    }
    StringExtensions.IsNotEmpty = IsNotEmpty;
    function IsNullOrEmpty(stringToCheck) {
        return IsNull(stringToCheck) || IsEmpty(stringToCheck);
    }
    StringExtensions.IsNullOrEmpty = IsNullOrEmpty;
    function IsNotNullOrEmpty(stringToCheck) {
        return !this.IsNullOrEmpty(stringToCheck);
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
        return (IsNullOrEmpty(stringToCheck)) ? stringToCheck : stringToCheck.toLowerCase();
    }
    StringExtensions.ToLowerCase = ToLowerCase;
    function Includes(stringToCheck, valueToCheck) {
        return stringToCheck.includes(valueToCheck);
    }
    StringExtensions.Includes = Includes;
    function NotIncludes(stringToCheck, valueToCheck) {
        return !Includes(stringToCheck, valueToCheck);
    }
    StringExtensions.NotIncludes = NotIncludes;
})(StringExtensions = exports.StringExtensions || (exports.StringExtensions = {}));
