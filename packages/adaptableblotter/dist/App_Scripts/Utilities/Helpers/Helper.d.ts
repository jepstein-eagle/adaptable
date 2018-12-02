import { SortOrder } from '../Enums';
export declare module Helper {
    function getStringRepresentionFromKey(event: KeyboardEvent | any): string;
    function cloneObject(obj: any): any;
    function sortArrayWithProperty(sortOrder: SortOrder, values: any[], sortProperty?: string): any[];
    function sortArray(values: any[], sortOrder?: SortOrder): any[];
    function groupBy(array: Array<any>, prop: string): Array<any>;
    function capitalize(string: string): string;
    function convertArrayToCsv(array: any[], separator?: string): string;
    function createDownloadedFile(content: any, fileName: string, mimeType: string): void;
    function copyToClipboard(text: string): boolean;
    function ReturnItemCount(items: any[], itemName: string): string;
    function IsInputNullOrEmpty(itemToCheck: any): boolean;
    function IsInputNotNullOrEmpty(itemToCheck: any): boolean;
    function ReadFileContents(fileName: string): string;
    function areObjectsEqual(obj1: any, obj2: any): boolean;
    function StringifyValue(value: any): string;
}
