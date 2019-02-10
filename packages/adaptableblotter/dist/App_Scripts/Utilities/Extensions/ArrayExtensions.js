"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ArrayExtensions;
(function (ArrayExtensions) {
    function AddItem(array, itemToAdd) {
        if (this.NotContainsItem(array, itemToAdd)) {
            array.push(itemToAdd);
        }
    }
    ArrayExtensions.AddItem = AddItem;
    function ContainsItem(array, itemToCheck) {
        if (array == null) {
            return false;
        }
        return array.indexOf(itemToCheck) > -1;
    }
    ArrayExtensions.ContainsItem = ContainsItem;
    function NotContainsItem(array, itemToCheck) {
        return !ContainsItem(array, itemToCheck);
    }
    ArrayExtensions.NotContainsItem = NotContainsItem;
    function RetrieveDistinct(array) {
        return Array.from(new Set(array.map(item => item)));
    }
    ArrayExtensions.RetrieveDistinct = RetrieveDistinct;
    function IsNull(arrayToCheck) {
        return arrayToCheck == null;
    }
    ArrayExtensions.IsNull = IsNull;
    function IsNotNull(arrayToCheck) {
        return !ArrayExtensions.IsNull(arrayToCheck);
    }
    ArrayExtensions.IsNotNull = IsNotNull;
    function IsEmpty(arrayToCheck) {
        return arrayToCheck.length == 0;
    }
    ArrayExtensions.IsEmpty = IsEmpty;
    function IsNotEmpty(arrayToCheck) {
        return !ArrayExtensions.IsEmpty(arrayToCheck);
    }
    ArrayExtensions.IsNotEmpty = IsNotEmpty;
    function IsNullOrEmpty(arrayToCheck) {
        return ArrayExtensions.IsNull(arrayToCheck) || ArrayExtensions.IsEmpty(arrayToCheck);
    }
    ArrayExtensions.IsNullOrEmpty = IsNullOrEmpty;
    function IsNotNullOrEmpty(arrayToCheck) {
        return ArrayExtensions.IsNotNull(arrayToCheck) && ArrayExtensions.IsNotEmpty(arrayToCheck);
    }
    ArrayExtensions.IsNotNullOrEmpty = IsNotNullOrEmpty;
    function HasOneItem(arrayToCheck) {
        return arrayToCheck.length == 1;
    }
    ArrayExtensions.HasOneItem = HasOneItem;
    function moveArray(array, from, to) {
        array.splice(to, 0, array.splice(from, 1)[0]);
    }
    ArrayExtensions.moveArray = moveArray;
    //This deliberately only checks contents equality and not positional so [1, 2, 3]== [1, 3, 2]
    function areArraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return false;
        }
        return arr1.every(x => arr2.indexOf(x) != -1);
    }
    ArrayExtensions.areArraysEqual = areArraysEqual;
    function areArraysEqualWithOrder(arr1, arr2) {
        if (arr1 == null) {
            return true;
        }
        if (arr1.length !== arr2.length) {
            return false;
        }
        return arr1.every((x, index) => arr2.indexOf(x) == index);
    }
    ArrayExtensions.areArraysEqualWithOrder = areArraysEqualWithOrder;
    function areArraysEqualWithOrderandProperties(value, other) {
        var type = Object.prototype.toString.call(value);
        // If the two objects are not the same type, return false
        if (type !== Object.prototype.toString.call(other)) {
            return false;
        }
        // If items are not an object or array, return false
        if (['[object Array]', '[object Object]'].indexOf(type) < 0) {
            return false;
        }
        // Compare the length of the length of the two items
        var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
        var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
        if (valueLen !== otherLen) {
            return false;
        }
        // Compare two items
        var compare = function (item1, item2) {
            // Get the object type
            var itemType = Object.prototype.toString.call(item1);
            // If an object or array, compare recursively
            if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
                if (!areArraysEqualWithOrderandProperties(item1, item2)) {
                    return false;
                }
            }
            // Otherwise, do a simple comparison
            else {
                // If the two items are not the same type, return false
                if (itemType !== Object.prototype.toString.call(item2)) {
                    return false;
                }
                // Else if it's a function, convert to a string and compare
                // Otherwise, just compare
                if (itemType === '[object Function]') {
                    if (item1.toString() !== item2.toString()) {
                        return false;
                    }
                }
                else {
                    if (item1 !== item2) {
                        return false;
                    }
                }
            }
        };
        // Compare properties
        if (type === '[object Array]') {
            for (var i = 0; i < valueLen; i++) {
                if (compare(value[i], other[i]) === false) {
                    return false;
                }
            }
        }
        else {
            for (var key in value) {
                if (value.hasOwnProperty(key)) {
                    if (compare(value[key], other[key]) === false) {
                        return false;
                    }
                }
            }
        }
        // If nothing failed, return true
        return true;
    }
    ArrayExtensions.areArraysEqualWithOrderandProperties = areArraysEqualWithOrderandProperties;
    ;
})(ArrayExtensions = exports.ArrayExtensions || (exports.ArrayExtensions = {}));
