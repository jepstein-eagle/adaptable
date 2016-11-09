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

}

export module EnumEx {

    export function getNamesAndValues<T extends number>(e: any) {
        return EnumEx.getNames(e).map(n => ({ name: n, value: e[n] as T }));
    }

    export function getNames(e: any) {
        return EnumEx.getObjValues(e).filter(v => typeof v === "string") as string[];
    }

    export function getValues<T extends number>(e: any) {
        return EnumEx.getObjValues(e).filter(v => typeof v === "number") as T[];
    }

    export function getObjValues(e: any): (number | string)[] {
        return Object.keys(e).map(k => e[k]);
    }
}