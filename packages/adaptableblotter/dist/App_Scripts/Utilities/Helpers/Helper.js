"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StringExtensions_1 = require("../Extensions/StringExtensions");
const LoggingHelper_1 = require("./LoggingHelper");
var Helper;
(function (Helper) {
    function getStringRepresentionFromKey(event) {
        if (event.key == null) {
            return event.char; // IE
        }
        else {
            return event.key;
        }
    }
    Helper.getStringRepresentionFromKey = getStringRepresentionFromKey;
    function cloneObject(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
    Helper.cloneObject = cloneObject;
    function capitalize(string) {
        return (/[a-z]/.test(string) ? string : string.toLowerCase())
            .replace(/[\s\-_]*([^\s\-_])([^\s\-_]+)/g, replacer)
            .replace(/[A-Z]/g, ' $&')
            .trim();
    }
    Helper.capitalize = capitalize;
    function replacer(b, c) {
        return b.toUpperCase() + c;
    }
    // converts an array (or an array of arrays) to CSV
    function convertArrayToCsv(array, separator = " ' ") {
        var csvContent = '';
        array.forEach(function (infoArray, index) {
            var line = [];
            var item;
            var i;
            for (i = 0; i < infoArray.length; ++i) {
                item = infoArray[i];
                if (separator == ",") {
                    if (item != null && item != undefined) {
                        if (item.indexOf(',') !== -1 || item.indexOf('"') !== -1) {
                            item = '"' + item.replace(/"/g, '""') + '"';
                        }
                        // bit of a hack but we have a user where they have "+2502+S" as a value which Excel then thinks is a formula
                        if (item.indexOf('+') == 0) {
                            item = "'" + item + "'";
                        }
                    }
                }
                line.push(item);
            }
            csvContent += line.join(separator) + (index != array.length - 1 ? '\n' : '');
        });
        return csvContent;
    }
    Helper.convertArrayToCsv = convertArrayToCsv;
    function createDownloadedFile(content, fileName, mimeType) {
        var a = document.createElement('a');
        mimeType = mimeType || 'application/octet-stream';
        if (navigator.msSaveBlob) { // IE10
            navigator.msSaveBlob(new Blob([content], {
                type: mimeType
            }), fileName);
        }
        else if (URL && 'download' in a) { //html5 A[download]
            a.href = URL.createObjectURL(new Blob([content], {
                type: mimeType
            }));
            a.setAttribute('download', fileName);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
        else {
            location.href = 'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
        }
    }
    Helper.createDownloadedFile = createDownloadedFile;
    // Copies a string to the clipboard. Must be called from within an 
    // event handler such as click. May return false if it failed, but
    // this is not always possible. Browser support for Chrome 43+, 
    // Firefox 42+, Safari 10+, Edge and IE 10+.
    // IE: The clipboard feature may be disabled by an administrator. By
    // default a prompt is shown the first time the clipboard is 
    // used (per session).
    function copyToClipboard(text) {
        if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
            var textarea = document.createElement("textarea");
            textarea.textContent = text;
            textarea.style.width = '1px';
            textarea.style.height = '1px';
            textarea.style.top = '0px';
            textarea.style.left = '0px';
            textarea.style.position = 'absolute';
            textarea.style.opacity = '0.0';
            document.body.appendChild(textarea);
            textarea.select();
            textarea.focus();
            try {
                return document.execCommand("copy"); // Security exception may be thrown by some browsers.
            }
            catch (ex) {
                LoggingHelper_1.LoggingHelper.LogAdaptableBlotterWarning("Copy to clipboard failed.", ex);
                return false;
            }
            finally {
                document.body.removeChild(textarea);
            }
        }
        LoggingHelper_1.LoggingHelper.LogAdaptableBlotterWarning("Copy not available on this computer.");
    }
    Helper.copyToClipboard = copyToClipboard;
    function ReturnItemCount(items, itemName) {
        if (items.length == 0) {
            return "No " + itemName + "s";
        }
        return (items.length == 1) ? "1 " + itemName : items.length + " " + itemName + "s";
    }
    Helper.ReturnItemCount = ReturnItemCount;
    function IsInputNullOrEmpty(itemToCheck) {
        if (typeof (itemToCheck) == "string") {
            return StringExtensions_1.StringExtensions.IsNullOrEmpty(itemToCheck);
        }
        else if (typeof (itemToCheck) == "number") {
            return StringExtensions_1.StringExtensions.IsNullOrEmpty(itemToCheck.toString());
        }
        else if (itemToCheck instanceof (Date)) {
            return StringExtensions_1.StringExtensions.IsNullOrEmpty(itemToCheck.toString());
        }
        return itemToCheck == null;
    }
    Helper.IsInputNullOrEmpty = IsInputNullOrEmpty;
    function IsInputNotNullOrEmpty(itemToCheck) {
        return !IsInputNullOrEmpty(itemToCheck);
    }
    Helper.IsInputNotNullOrEmpty = IsInputNotNullOrEmpty;
    function ReadFileContents(fileName) {
        // let contents: string = fs.readFileSync(fileName, { encoding: 'utf8' })
        return fileName;
    }
    Helper.ReadFileContents = ReadFileContents;
    function areObjectsEqual(obj1, obj2) {
        // if both are null return true
        if (obj1 == null && obj2 == null) {
            return true;
        }
        if (obj1 != null && obj2 == null) {
            return false;
        }
        if (obj1 == null && obj2 != null) {
            return false;
        }
        //Loop through properties in object 1
        for (var p in obj1) {
            //Check property exists on both objects
            if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) {
                return false;
            }
            switch (typeof (obj1[p])) {
                //Deep compare objects
                case 'object':
                    if (!areObjectsEqual(obj1[p], obj2[p])) {
                        return false;
                    }
                    break;
                //Compare function code
                case 'function':
                    if (typeof (obj2[p]) == 'undefined' || (p != 'compare' && obj1[p].toString() != obj2[p].toString())) {
                        return false;
                    }
                    break;
                //Compare values
                default:
                    if (obj1[p] != obj2[p]) {
                        return false;
                    }
                    break;
            }
            //Check object 2 for any extra properties
            for (let p2 in obj2) {
                if (typeof (obj1[p2]) == 'undefined') {
                    return false;
                }
            }
            return true;
        }
        ;
    }
    Helper.areObjectsEqual = areObjectsEqual;
    function StringifyValue(value) {
        if (!isNaN(Number(value))) {
            return Number(value).toString();
        }
    }
    Helper.StringifyValue = StringifyValue;
    function RoundNumber(numberToRound, decimalPlaces) {
        switch (decimalPlaces) {
            case 1:
                return Math.round(numberToRound * 10) / 10;
            case 2:
                return Math.round(numberToRound * 100) / 100;
            case 3:
                return Math.round(numberToRound * 1000) / 1000;
            case 4:
                return Math.round(numberToRound * 10000) / 10000;
            case 5:
                return Math.round(numberToRound * 100000) / 100000;
            case 6:
                return Math.round(numberToRound * 1000000) / 1000000;
        }
    }
    Helper.RoundNumber = RoundNumber;
    function RoundNumberTo4dp(numberToRound) {
        return RoundNumber(numberToRound, 4);
    }
    Helper.RoundNumberTo4dp = RoundNumberTo4dp;
    function RoundValueIfNumeric(numberToRound, decimalPlaces) {
        let returnValue;
        if (!isNaN(Number(numberToRound))) {
            console.log("was: " + numberToRound);
            returnValue = RoundNumber(numberToRound, decimalPlaces);
            console.log("now: " + returnValue);
        }
        return returnValue;
    }
    Helper.RoundValueIfNumeric = RoundValueIfNumeric;
})(Helper = exports.Helper || (exports.Helper = {}));
