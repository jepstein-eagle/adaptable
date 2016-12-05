import { SortOrder } from '../Core/Enums'

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

    export function sortArray(sortOrder: SortOrder, values: any[]): any[] {
        if (sortOrder == SortOrder.Ascending) {
            return values.sort()
        }
        else if (sortOrder == SortOrder.Descending) {
            return values.sort().reverse()
        }
    }

    export function sortArrayDisplayMember(sortOrder: SortOrder, values: any[], displayMember: string): any[] {
        let returnArray: any[]
        if (displayMember) {
            returnArray = values.sort((a, b) => (a[displayMember] < b[displayMember]) ? -1 : (a[displayMember] > b[displayMember]) ? 1 : 0)
        }
        else { returnArray = values.sort() }
        if (sortOrder == SortOrder.Ascending) {
            return returnArray
        }
        else if (sortOrder == SortOrder.Descending) {
            return returnArray.reverse()
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

