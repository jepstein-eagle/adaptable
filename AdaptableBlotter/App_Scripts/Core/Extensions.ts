export module EnumExtensions {

    export function getNamesAndValues<T extends number>(e: any) {
        return EnumExtensions.getNames(e).map(n => ({ name: n, value: e[n] as T }));
    }

    export function getNames(e: any) {
        return EnumExtensions.getObjValues(e).filter(v => typeof v === "string") as string[];
    }

    export function getValues<T extends number>(e: any) {
        return EnumExtensions.getObjValues(e).filter(v => typeof v === "number") as T[];
    }

    export function getObjValues(e: any): (number | string)[] {
        return Object.keys(e).map(k => e[k]);
    }
}