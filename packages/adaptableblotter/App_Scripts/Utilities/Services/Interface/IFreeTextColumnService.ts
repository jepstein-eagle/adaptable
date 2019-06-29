import { DataChangedInfo } from '../../Interface/DataChangedInfo';
import { FreeTextColumn } from '../../../PredefinedConfig/RunTimeState/FreeTextColumnState';

export interface IFreeTextColumnService {
  GetFreeTextValue(column: FreeTextColumn, record: any): any;

  CheckIfDataChangingColumnIsFreeText(dataChangedEvent: DataChangedInfo): void;

  CheckIfDataChangingColumnIsFreeTextBatch(dataChangedEvents: DataChangedInfo[]): void;
}
