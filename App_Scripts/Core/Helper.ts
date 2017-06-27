import { SortOrder } from '../Core/Enums'

export module Helper {
    export var MissingColumnMagicString = "[MISSING]";
    export function getCharFromKey(event: JQueryKeyEventObject): string;
    export function getCharFromKey(event: KeyboardEvent): string;
    export function getCharFromKey(event: JQueryKeyEventObject | KeyboardEvent): string {
        if (event.which == null) {
            return String.fromCharCode(event.keyCode) // IE
        } else if (event.which != 0 && event.charCode != 0) {
            return String.fromCharCode(event.which)   // the rest
        } else {
            return null // special key
        }
    }

    export function getStringRepresentionFromKey(event: JQueryKeyEventObject | KeyboardEvent): string {
        if (event.key == null) {
            return event.char // IE
        } else
            return event.key
    }

    export function moveArray(array: any[], from: number, to: number) {
        array.splice(to, 0, array.splice(from, 1)[0]);
    }

    export function cloneObject(obj: any): any {
        return JSON.parse(JSON.stringify(obj))
    }


    export function generateUid(): string {
        var d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
            c => {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
            });
        return uuid;
    }

    export function sortArrayWithProperty(sortOrder: SortOrder, values: any[], sortProperty?: string): any[] {
        let newValues = [].concat(values)
        let direction = 1
        if (sortOrder == SortOrder.Descending) {
            direction = -1
        }
        if (sortProperty) {
            return newValues.sort((a, b) => {
                let aSortProperty = a[sortProperty]
                let bSortProperty = b[sortProperty]
                if (typeof (aSortProperty) == "string" && typeof (bSortProperty) == "string") {
                    return aSortProperty.localeCompare(bSortProperty) * direction
                } else {
                    return (aSortProperty < bSortProperty) ? -1 * direction : (aSortProperty > bSortProperty) ? 1 * direction : 0
                }
            });
        }
        else {
            return newValues.sort((a, b) => (a < b) ? -1 * direction : (a > b) ? 1 * direction : 0);
        }
    }

    export function groupBy(array: Array<any>, prop: string): Array<any> {
        return array.reduce((acc, item) => {
            var key = item[prop];
            acc[key] = acc[key] || [];
            acc[key].push(item);
            return acc;
        }, {});
    }

    //This deliberately only checks contents equality and not positional so [1, 2, 3]== [1, 3, 2]
    export function areArraysEqual(arr1: any[], arr2: any[]) {
        if (arr1.length !== arr2.length) {
            return false;
        }
        return arr1.every(x => arr2.indexOf(x) != -1)
    }

    export function areArraysEqualWithOrder(arr1: any[], arr2: any[]) {
        if (arr1.length !== arr2.length) {
            return false;
        }
        return arr1.every((x, index) => arr2.indexOf(x) == index)
    }

    export function capitalize(string: string) {
        return (/[a-z]/.test(string) ? string : string.toLowerCase())
            .replace(/[\s\-_]*([^\s\-_])([^\s\-_]+)/g, replacer)
            .replace(/[A-Z]/g, ' $&')
            .trim();
    }
    function replacer(a: string, b: string, c: string) {
        return b.toUpperCase() + c;
    }

}

