import { LoggingHelper } from '../Helpers/LoggingHelper';
import { IFreeTextColumnService } from './Interface/IFreeTextColumnService';
import { DataChangedInfo } from '../../AdaptableOptions/CommonObjects/DataChangedInfo';
import { IAdaptable } from '../../types';
import { FreeTextColumn, FreeTextStoredValue } from '../../PredefinedConfig/FreeTextColumnState';
import ArrayExtensions from '../Extensions/ArrayExtensions';

export class FreeTextColumnService implements IFreeTextColumnService {
  constructor(private adaptable: IAdaptable) {
    this.adaptable = adaptable;
  }

  GetFreeTextValue(freeTextColumn: FreeTextColumn, record: any): any {
    try {
      if (this.adaptable.isGroupRowNode(record)) {
        return null;
      }
      if (ArrayExtensions.IsNotNullOrEmpty(freeTextColumn.FreeTextStoredValues)) {
        let pkValue: any = this.adaptable.getPrimaryKeyValueFromRowNode(record);
        let freeTextStoredValue:
          | FreeTextStoredValue
          | undefined = freeTextColumn.FreeTextStoredValues.find(fdx => fdx.PrimaryKey == pkValue);
        if (freeTextStoredValue) {
          return freeTextStoredValue.FreeText;
        }
      }
      return freeTextColumn.DefaultValue;
    } catch (e) {
      LoggingHelper.LogAdaptableError(e);
      return null;
    }
  }

  CheckIfDataChangingColumnIsFreeText(dataChangedEvent: DataChangedInfo): void {
    let freeTextColumn: FreeTextColumn = this.adaptable.api.freeTextColumnApi
      .getAllFreeTextColumn()
      .find(fc => fc.ColumnId == dataChangedEvent.ColumnId);
    if (freeTextColumn) {
      let freeTextStoredValue: FreeTextStoredValue = {
        PrimaryKey: dataChangedEvent.PrimaryKeyValue,
        FreeText: dataChangedEvent.NewValue,
      };
      this.adaptable.api.freeTextColumnApi.addEditFreeTextColumnStoredValue(
        freeTextColumn,
        freeTextStoredValue
      );
    }
  }
}
