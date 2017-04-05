import { FontSize } from '../Core/Enums'

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

     export function getCssFontSizeFromFontSizeEnum(fontSize: FontSize): string {
        switch (fontSize) {
            case FontSize.XLarge:
                return "x-large";
            case FontSize.Large:
                return "large";
            case FontSize.Medium:
                return "medium";
            case FontSize.Small:
                return "small";
            case FontSize.XSmall:
                return "x-small";
        }
    }
}

export module StringExtensions {

    export function IsNull(stringToCheck: string) {
        return stringToCheck == null;
    }

    export function IsNotNull(stringToCheck: string) {
        return !StringExtensions.IsNull(stringToCheck);
    }

    export function IsEmpty(stringToCheck: string) {
        return stringToCheck == "";
    }

     export function IsNotEmpty(stringToCheck: string) {
        return !StringExtensions.IsEmpty(stringToCheck);
    }

    export function IsNullOrEmpty(stringToCheck: string) {
        return StringExtensions.IsNull(stringToCheck) || StringExtensions.IsEmpty(stringToCheck);
    }

    export function IsNotNullOrEmpty(stringToCheck: string) {
        return !StringExtensions.IsNullOrEmpty(stringToCheck);
    }
   
    export function PlaceSpaceBetweenCapitalisedWords(stringToCheck: string) {
        return  stringToCheck.replace(/([A-Z])/g, ' $1').trim()
    }

   
}