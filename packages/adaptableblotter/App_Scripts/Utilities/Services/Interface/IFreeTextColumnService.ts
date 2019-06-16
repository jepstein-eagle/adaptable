import { IDataChangedInfo } from '../../Interface/IDataChangedInfo';
import { IFreeTextColumn } from '../../../PredefinedConfig/IUserState/FreeTextColumnState';

export interface IFreeTextColumnService {
  GetFreeTextValue(column: IFreeTextColumn, record: any): any;

  CheckIfDataChangingColumnIsFreeText(dataChangedEvent: IDataChangedInfo): void;

  CheckIfDataChangingColumnIsFreeTextBatch(dataChangedEvents: IDataChangedInfo[]): void;
}
