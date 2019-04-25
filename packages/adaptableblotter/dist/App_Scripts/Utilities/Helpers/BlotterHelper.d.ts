import { IAdaptableBlotterOptions } from '../Interface/BlotterOptions/IAdaptableBlotterOptions';
import { IColumn } from '../Interface/IColumn';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { ILicenceInfo } from '../Interface/ILicenceInfo';
export declare module BlotterHelper {
    function isDemoSite(): boolean;
    function assignBlotterOptions(blotterOptions: IAdaptableBlotterOptions): IAdaptableBlotterOptions;
    function isValidPrimaryKey(blotter: IAdaptableBlotter, columns: IColumn[]): boolean;
    function isConfigServerEnabled(blotterOptions: IAdaptableBlotterOptions): boolean;
    function checkLicenceKey(licenceInfo: ILicenceInfo): void;
}
