import { IDataChangedInfo } from "../../../Api/Interface/IDataChangedInfo";
import { IEvent } from "../../Interface/IEvent";
export declare enum ChangeDirection {
    Up = "Up",
    Down = "Down",
    Ignore = "Ignore"
}
export interface IDataService {
    CreateDataChangedEvent(dataChangedInfo: IDataChangedInfo): void;
    OnDataSourceChanged(): IEvent<IDataService, IDataChangedInfo>;
    GetPreviousColumnValue(columnId: string, identifierValue: any, newValue: number, changeDirection: ChangeDirection): number;
}
