import { ApiBase } from "./ApiBase";
import { ISystemApi } from './Interface/ISystemApi';
import { SystemState } from '../Redux/ActionsReducers/Interface/IState';
import { ICalendar } from "../Utilities/Interface/BlotterObjects/ICalendar";
import { IChartData } from "../Utilities/Interface/BlotterObjects/Charting/IChartData";
import { ChartVisibility } from "../Utilities/ChartEnums";
export declare class SystemApi extends ApiBase implements ISystemApi {
    GetState(): SystemState;
    GetAvailableCalendars(): ICalendar[];
    SetChartData(chartData: IChartData): void;
    SetChartVisibility(chartVisbility: ChartVisibility): void;
}
