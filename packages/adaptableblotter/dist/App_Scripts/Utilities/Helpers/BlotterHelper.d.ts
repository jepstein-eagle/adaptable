import { IAdaptableBlotterOptions } from '../Interface/BlotterOptions/IAdaptableBlotterOptions';
import { IColumn } from '../Interface/IColumn';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
export declare module BlotterHelper {
    function AssignBlotterOptions(blotterOptions: IAdaptableBlotterOptions): IAdaptableBlotterOptions;
    function CheckPrimaryKeyExists(blotter: IAdaptableBlotter, columns: IColumn[]): void;
    function IsConfigServerEnabled(blotterOptions: IAdaptableBlotterOptions): boolean;
}
