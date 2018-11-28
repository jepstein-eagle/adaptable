import { IFreeTextColumnService } from './Interface/IFreeTextColumnService';
import { IFreeTextColumn } from '../../Api/Interface/IAdaptableBlotterObjects';
import { IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
export declare class FreeTextColumnService implements IFreeTextColumnService {
    private blotter;
    constructor(blotter: IAdaptableBlotter);
    GetFreeTextValue(freeTextColumn: IFreeTextColumn, record: any): any;
}
