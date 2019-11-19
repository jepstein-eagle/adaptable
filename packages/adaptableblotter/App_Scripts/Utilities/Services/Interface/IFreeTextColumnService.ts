import { DataChangedInfo } from '../../../BlotterOptions/CommonObjects/DataChangedInfo';
import { FreeTextColumn } from '../../../PredefinedConfig/FreeTextColumnState';

export interface IFreeTextColumnService {
  GetFreeTextValue(column: FreeTextColumn, record: any): any;

  CheckIfDataChangingColumnIsFreeText(dataChangedEvent: DataChangedInfo): void;
}
