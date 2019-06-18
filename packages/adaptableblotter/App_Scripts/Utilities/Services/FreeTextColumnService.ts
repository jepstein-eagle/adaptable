import { LoggingHelper } from '../Helpers/LoggingHelper';
import { IFreeTextColumnService } from './Interface/IFreeTextColumnService';
import { DataChangedInfo } from '../Interface/DataChangedInfo';
import { IAdaptableBlotter } from '../../types';
import {
  FreeTextColumn,
  FreeTextStoredValue,
} from '../../PredefinedConfig/RunTimeState/FreeTextColumnState';
import ArrayExtensions from '../Extensions/ArrayExtensions';

export class FreeTextColumnService implements IFreeTextColumnService {
  constructor(private blotter: IAdaptableBlotter) {
    this.blotter = blotter;
  }

  GetFreeTextValue(freeTextColumn: FreeTextColumn, record: any): any {
    try {
      if (this.blotter.isGroupRecord(record)) {
        return null;
      }
      if (ArrayExtensions.IsNotNullOrEmpty(freeTextColumn.FreeTextStoredValues)) {
        let pkValue: any = this.blotter.getPrimaryKeyValueFromRecord(record);
        let freeTextStoredValue: FreeTextStoredValue = freeTextColumn.FreeTextStoredValues.find(
          fdx => fdx.PrimaryKey == pkValue
        );
        if (freeTextStoredValue) {
          return freeTextStoredValue.FreeText;
        }
      }
      return freeTextColumn.DefaultValue;
    } catch (e) {
      LoggingHelper.LogAdaptableBlotterError(e);
      return null;
    }
  }

  CheckIfDataChangingColumnIsFreeText(dataChangedEvent: DataChangedInfo): void {
    let freeTextColumn: FreeTextColumn = this.blotter.api.freeTextColumnApi
      .getAllFreeTextColumn()
      .find(fc => fc.ColumnId == dataChangedEvent.ColumnId);
    if (freeTextColumn) {
      let freeTextStoredValue: FreeTextStoredValue = {
        PrimaryKey: dataChangedEvent.IdentifierValue,
        FreeText: dataChangedEvent.NewValue,
      };
      this.blotter.api.freeTextColumnApi.addEditFreeTextColumnStoredValue(
        freeTextColumn,
        freeTextStoredValue
      );
    }
  }

  CheckIfDataChangingColumnIsFreeTextBatch(dataChangedEvents: DataChangedInfo[]): void {
    if (
      ArrayExtensions.IsNotNullOrEmpty(this.blotter.api.freeTextColumnApi.getAllFreeTextColumn())
    ) {
      dataChangedEvents.forEach(dc => {
        this.CheckIfDataChangingColumnIsFreeText(dc);
      });
    }
  }
}
