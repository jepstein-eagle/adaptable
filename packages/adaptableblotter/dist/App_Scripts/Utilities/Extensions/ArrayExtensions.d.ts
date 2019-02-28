import { SortOrder } from "../Enums";
export declare module ArrayExtensions {
    function GetLength(arrayToCheck: any[]): number;
    function CorrectLength(arrayToCheck: any[], requiredLength: number): boolean;
    function NotCorrectLength(arrayToCheck: any[], requiredLength: number): boolean;
    function AddItem(array: any[], itemToAdd: any): void;
    function ContainsItem(array: any[], itemToCheck: any): boolean;
    function NotContainsItem(array: any[], itemToCheck: any): boolean;
    function RetrieveDistinct(array: any[]): any[];
    function IsNull(arrayToCheck: any[]): boolean;
    function IsNotNull(arrayToCheck: any[]): boolean;
    function IsEmpty(arrayToCheck: any[]): boolean;
    function IsNotEmpty(arrayToCheck: any[]): boolean;
    function IsNullOrEmpty(arrayToCheck: any[]): boolean;
    function IsNotNullOrEmpty(arrayToCheck: any[]): boolean;
    function HasOneItem(arrayToCheck: any[]): boolean;
    function moveArray(array: any[], from: number, to: number): void;
    function areArraysEqual(arr1: any[], arr2: any[]): boolean;
    function areArraysNotEqual(arr1: any[], arr2: any[]): boolean;
    function areArraysEqualWithOrder(arr1: any[], arr2: any[]): boolean;
    function areArraysEqualWithOrderandProperties(value: any[], other: any[]): boolean;
    function sortArrayWithProperty(sortOrder: SortOrder, values: any[], sortProperty?: string): any[];
    function sortArray(values: any[], sortOrder?: SortOrder): any[];
    function groupArrayBy(array: Array<any>, prop: string): Array<any>;
}
