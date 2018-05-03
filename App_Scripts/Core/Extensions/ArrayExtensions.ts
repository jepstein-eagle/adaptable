
export module ArrayExtensions {

    export function IsNull(arrayToCheck: any[]) {
        return arrayToCheck == null;
    }

    export function IsNotNull(arrayToCheck: any[]) {
        return !ArrayExtensions.IsNull(arrayToCheck);
    }

    export function IsEmpty(arrayToCheck: any[]) {
        return arrayToCheck.length==0;
    }

     export function IsNotEmpty(arrayToCheck: any[]) {
        return !ArrayExtensions.IsEmpty(arrayToCheck);
    }

    export function IsNullOrEmpty(arrayToCheck: any[]) {
        return ArrayExtensions.IsNull(arrayToCheck) || ArrayExtensions.IsEmpty(arrayToCheck);
    }

    export function IsNotNullOrEmpty(arrayToCheck: any[]) {
        return !ArrayExtensions.IsNullOrEmpty(arrayToCheck);
    }

    export function moveArray(array: any[], from: number, to: number) {
        array.splice(to, 0, array.splice(from, 1)[0]);
    }

    //This deliberately only checks contents equality and not positional so [1, 2, 3]== [1, 3, 2]
    export function areArraysEqual(arr1: any[], arr2: any[]) {
        if (arr1.length !== arr2.length) {
            return false;
        }
        return arr1.every(x => arr2.indexOf(x) != -1)
    }

    export function areArraysEqualWithOrder(arr1: any[], arr2: any[]) {
        if (arr1 == null) {
            return true
        }

        if (arr1.length !== arr2.length) {
            return false;
        }
        return arr1.every((x, index) => arr2.indexOf(x) == index)
    }

    export function areArraysEqualWithOrderandProperties(value: any[], other: any[]) {
        var type = Object.prototype.toString.call(value);

        // If the two objects are not the same type, return false
        if (type !== Object.prototype.toString.call(other)) { return false; }

        // If items are not an object or array, return false
        if (['[object Array]', '[object Object]'].indexOf(type) < 0) { return false; }

        // Compare the length of the length of the two items
        var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
        var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
        if (valueLen !== otherLen) { return false; }

        // Compare two items
        var compare = function (item1: any, item2: any) {

            // Get the object type
            var itemType = Object.prototype.toString.call(item1);

            // If an object or array, compare recursively
            if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
                if (!areArraysEqualWithOrderandProperties(item1, item2)) { return false; }
            }

            // Otherwise, do a simple comparison
            else {

                // If the two items are not the same type, return false
                if (itemType !== Object.prototype.toString.call(item2)) { return false; }

                // Else if it's a function, convert to a string and compare
                // Otherwise, just compare
                if (itemType === '[object Function]') {
                    if (item1.toString() !== item2.toString()) { return false; }
                } else {
                    if (item1 !== item2) { return false; }
                }
            }
        };

        // Compare properties
        if (type === '[object Array]') {
            for (var i = 0; i < valueLen; i++) {
                if (compare(value[i], other[i]) === false) { return false; }
            }
        } else {
            for (var key in value) {
                if (value.hasOwnProperty(key)) {
                    if (compare(value[key], other[key]) === false) { return false; }
                }
            }
        }

        // If nothing failed, return true
        return true;

    };
}