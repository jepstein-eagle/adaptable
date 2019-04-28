import { SystemState } from "../../Redux/ActionsReducers/Interface/IState";
import { ICalendar } from "../../Utilities/Interface/BlotterObjects/ICalendar";
import { IChartData } from "../../Utilities/Interface/BlotterObjects/Charting/IChartData";
import { ChartVisibility } from "../../Utilities/ChartEnums";
export interface ISystemApi {
    GetState(): SystemState;
    GetAvailableCalendars(): ICalendar[];
    SetChartData(chartData: IChartData): void;
    SetChartVisibility(chartVisbility: ChartVisibility): void;
}
