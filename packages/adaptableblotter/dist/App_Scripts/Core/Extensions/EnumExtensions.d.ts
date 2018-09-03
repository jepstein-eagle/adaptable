export declare module EnumExtensions {
    function getNames(e: any): string[];
    function getValues<T extends number>(e: any): T[];
    function getObjValues(e: any): (number | string)[];
    function getCssFontSizeFromFontSizeEnum(fontSize: any): string;
}
