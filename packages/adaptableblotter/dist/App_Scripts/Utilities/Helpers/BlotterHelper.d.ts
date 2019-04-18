import { IAdaptableBlotterOptions } from '../Interface/BlotterOptions/IAdaptableBlotterOptions';
import { IColumn } from '../Interface/IColumn';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { ILicenceInfo } from '../Interface/ILicenceInfo';
export declare module BlotterHelper {
    function IsDemoSite(): boolean;
    function AssignBlotterOptions(blotterOptions: IAdaptableBlotterOptions): IAdaptableBlotterOptions;
    function CheckPrimaryKeyExists(blotter: IAdaptableBlotter, columns: IColumn[]): void;
    function IsConfigServerEnabled(blotterOptions: IAdaptableBlotterOptions): boolean;
    function CheckLicenceKey(licenceInfo: ILicenceInfo): void;
}
