import { IAdaptableBlotterOptions } from '../../Api/Interface/IAdaptableBlotterOptions';
import { IColumn } from '../../Api/Interface/IColumn';
import { IAdaptableBlotter } from '../../Api/Interface/IAdaptableBlotter';
export declare module BlotterHelper {
    function AssignBlotterOptions(blotterOptions: IAdaptableBlotterOptions): IAdaptableBlotterOptions;
    function CheckPrimaryKeyExists(blotter: IAdaptableBlotter, columns: IColumn[]): void;
}
