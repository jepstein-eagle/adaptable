import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { AdaptableBlotterLogger } from '../Helpers/AdaptableBlotterLogger';
import { IFreeTextColumnService } from './Interface/IFreeTextColumnService';
import { IFreeTextColumn } from '../Api/Interface/IAdaptableBlotterObjects';
import { ArrayExtensions } from '../Extensions/ArrayExtensions';
import { FreeTextStoredValue } from '../../View/UIInterfaces';

export class FreeTextColumnService implements IFreeTextColumnService {
    constructor(private blotter: IAdaptableBlotter) {
    }


    GetFreeTextValue(freeTextColumn: IFreeTextColumn, record: any): any {
        try {
            if (this.blotter.isGroupRecord(record)) {
                return null;
            }
            if (ArrayExtensions.IsNotNullOrEmpty(freeTextColumn.FreeTextStoredValues)) {
                let pkValue: any = this.blotter.getPrimaryKeyValueFromRecord(record);
                let freeTextStoredValue: FreeTextStoredValue = freeTextColumn.FreeTextStoredValues.find(fdx => fdx.PrimaryKey == pkValue)
                if (freeTextStoredValue) {
                    return freeTextStoredValue.FreeText;
                }
            }
            return freeTextColumn.DefaultValue;
        }
        catch (e) {
            AdaptableBlotterLogger.LogError(e);
            return null;
        }
    }


}
