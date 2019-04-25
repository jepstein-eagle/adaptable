export declare module Helper {
    function getStringRepresentionFromKey(event: KeyboardEvent | any): string;
    function cloneObject(obj: any): any;
    function capitalize(string: string): string;
    function convertArrayToCsv(array: any[], separator?: string): string;
    function createDownloadedFile(content: any, fileName: string, mimeType: string): void;
    function copyToClipboard(text: string): boolean;
    function ReturnItemCount(items: any[], itemName: string): string;
    function IsInputNullOrEmpty(itemToCheck: any): boolean;
    function IsInputNotNullOrEmpty(itemToCheck: any): boolean;
    function areObjectsEqual(obj1: any, obj2: any): boolean;
    function StringifyValue(value: any): string;
    function RoundNumber(numberToRound: any, decimalPlaces: number): number;
    function RoundNumberTo4dp(numberToRound: any): number;
    function RoundValueIfNumeric(numberToRound: any, decimalPlaces: number): any;
}
