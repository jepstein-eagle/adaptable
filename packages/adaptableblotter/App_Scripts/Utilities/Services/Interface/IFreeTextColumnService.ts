import { IFreeTextColumn } from '../../Interface/BlotterObjects/IFreeTextColumn';
import { IDataChangedInfo } from '../../Interface/IDataChangedInfo';

export interface IFreeTextColumnService {
  GetFreeTextValue(column: IFreeTextColumn, record: any): any;

  CheckIfDataChangingColumnIsFreeText(dataChangedEvent: IDataChangedInfo): void;

  CheckIfDataChangingColumnIsFreeTextBatch(dataChangedEvents: IDataChangedInfo[]): void;
}
