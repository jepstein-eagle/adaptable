import { ApiBase } from "./ApiBase";
import { ISystemApi } from './Interface/ISystemApi';
import { SystemState } from '../Redux/ActionsReducers/Interface/IState';
import { ICalendar } from "../Utilities/Interface/BlotterObjects/ICalendar";
import * as SystemRedux from '../Redux/ActionsReducers/SystemRedux'
import { IChartData } from "../Utilities/Interface/BlotterObjects/Charting/IChartData";
import { ChartVisibility } from "../Utilities/ChartEnums";

export class SystemApi extends ApiBase implements ISystemApi {


  public GetState(): SystemState {
    return this.getBlotterState().System;
  }

  public GetAvailableCalendars(): ICalendar[] {
    return this.GetState().AvailableCalendars;
  }

  public SetChartData(chartData: IChartData): void {
       this.dispatchAction(SystemRedux.ChartSetChartData(chartData));
}

  public SetChartVisibility(chartVisbility: ChartVisibility): void {
       this.dispatchAction(SystemRedux.ChartSetChartVisibility(chartVisbility));
}

}