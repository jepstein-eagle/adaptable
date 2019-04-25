import { ApiBase } from "./ApiBase";
import { ISystemApi } from './Interface/ISystemApi';
import { SystemState } from '../Redux/ActionsReducers/Interface/IState';
import { ICalendar } from "../Utilities/Interface/BlotterObjects/ICalendar";
export declare class SystemApi extends ApiBase implements ISystemApi {
    GetState(): SystemState;
    GetAvailableCalendars(): ICalendar[];
}
