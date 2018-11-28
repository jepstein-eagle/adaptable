import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { IFreeTextColumnService } from './Interface/IFreeTextColumnService';
import { IFreeTextColumn } from '../../Api/Interface/IAdaptableBlotterObjects';
export declare class FreeTextColumnService implements IFreeTextColumnService {
    private blotter;
    constructor(blotter: IAdaptableBlotter);
    GetFreeTextValue(freeTextColumn: IFreeTextColumn, record: any): any;
}
