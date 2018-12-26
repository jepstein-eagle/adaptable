import { LoggingHelper } from '../Helpers/LoggingHelper';
import { IFreeTextColumnService } from './Interface/IFreeTextColumnService';
import { IFreeTextColumn } from '../../Api/Interface/IAdaptableBlotterObjects';
import { ArrayExtensions } from '../Extensions/ArrayExtensions';
import { FreeTextStoredValue } from '../../View/UIInterfaces';
import { IAdaptableBlotter } from '../../Api/Interface/IAdaptableBlotter';
import { IDataChangedEvent } from './Interface/IAuditService';
import * as FreeTextColumnRedux from '../../Redux/ActionsReducers/FreeTextColumnRedux'

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
            LoggingHelper.LogError(e);
            return null;
        }
    }

    CheckIfDataChangingColumnIsFreeText(dataChangedEvent: IDataChangedEvent): void {
        let freeTextColumn: IFreeTextColumn = this.blotter.AdaptableBlotterStore.TheStore.getState().FreeTextColumn.FreeTextColumns.find(fc => fc.ColumnId == dataChangedEvent.ColumnId);
        if (freeTextColumn) {
            let freeTextStoredValue: FreeTextStoredValue = { PrimaryKey: dataChangedEvent.IdentifierValue, FreeText: dataChangedEvent.NewValue }
            this.blotter.AdaptableBlotterStore.TheStore.dispatch<FreeTextColumnRedux.FreeTextColumnAddEditStoredValueAction>(FreeTextColumnRedux.FreeTextColumnAddEditStoredValue(freeTextColumn, freeTextStoredValue));
        }
    }

    CheckIfDataChangingColumnIsFreeTextBatch(dataChangedEvents: IDataChangedEvent[]): void {
        if (ArrayExtensions.IsNotNullOrEmpty(this.blotter.AdaptableBlotterStore.TheStore.getState().FreeTextColumn.FreeTextColumns)) {
            dataChangedEvents.forEach(dc => {
                this.CheckIfDataChangingColumnIsFreeText(dc);
            })
        }
    }


}
