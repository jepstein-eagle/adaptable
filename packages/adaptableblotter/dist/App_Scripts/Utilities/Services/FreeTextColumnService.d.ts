import { IFreeTextColumnService } from './Interface/IFreeTextColumnService';
import { IFreeTextColumn } from '../../api/Interface/IAdaptableBlotterObjects';
import { IAdaptableBlotter } from '../../api/Interface/IAdaptableBlotter';
export declare class FreeTextColumnService implements IFreeTextColumnService {
    private blotter;
    constructor(blotter: IAdaptableBlotter);
    GetFreeTextValue(freeTextColumn: IFreeTextColumn, record: any): any;
}
