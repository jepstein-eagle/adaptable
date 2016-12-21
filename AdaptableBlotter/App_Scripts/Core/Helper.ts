import { SortOrder, ColumnType } from '../Core/Enums'

export module Helper {
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

    export function sortStringArray(stringArray: string[]): string[] {
        var sortedSringArray: string[] = stringArray.sort((n1, n2) => {
            if (n1 > n2) {
                return 1;
            }
            if (n1 < n2) {
                return -1;
            }
            return 0;
        });
        return sortedSringArray;
    }

    export function sortNumericArray(numericArray: any[]): any[] {
        // Im sure this is overkill and can be done simpler...
        // also we dont want to have to do it when its already a number, only when its masked...
        let selectionMap: Map<number, any> = new Map<number, any>();
        numericArray.forEach(n => selectionMap.set(convertToNumber(n), n));
        var sortedMap = new Map([...selectionMap.entries()].sort((n1, n2) => n1[0] - n2[0]));
        return [...sortedMap.values()];
    }

    export function convertToNumber(itemToConvert: any): number {
        // Regex might need some work but hopefully it only allows numbers, full stopes and minus signs....
        return Number(itemToConvert.replace(/[^0-9\.\-]+/g, ""));
    }

    export function sortDateArray(dateArray: string[]): any[] {
        // assumes that the strings are dates underneath - if they arent then this will fail....
        return dateArray.sort((a, b) => +new Date(b) - +new Date(a));
    }

    export function sortArray(sortOrder: SortOrder, values: any[], dataType: ColumnType): any[] {
        let sortedValues: any[]

        if (dataType == ColumnType.Number) {
            sortedValues = sortNumericArray(values);
        } else if (dataType == ColumnType.Date) {
            sortedValues = sortDateArray(values);
        }
        else {
            sortedValues = sortStringArray(values);
        }

        if (sortOrder == SortOrder.Descending) {
            return sortedValues.reverse()
        } else {
            return sortedValues;
        }
    }

    export function sortArrayDisplayMember(sortOrder: SortOrder, values: any[], displayMember: string, dataType: ColumnType): any[] {
        if (displayMember) {
            let returnArray: any[] = values.sort((a, b) => (a[displayMember] < b[displayMember]) ? -1 : (a[displayMember] > b[displayMember]) ? 1 : 0);
            return (sortOrder == SortOrder.Descending) ? returnArray.reverse() : returnArray;
        }
        else {
            return sortArray(sortOrder, values, dataType);
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

}

