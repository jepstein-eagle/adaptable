import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux';
import * as SystemRedux from '../Redux/ActionsReducers/SystemRedux';
import { ApiBase } from './ApiBase';
import { IInternalApi } from './Interface/IInternalApi';
import { IUIConfirmation, AdaptableAlert } from '../Utilities/Interface/IMessage';
import { ExportDestination } from '../PredefinedConfig/Common/Enums';
import { ILiveReport } from '../Utilities/Interface/Reports/ILiveReport';
import { Report } from '../PredefinedConfig/RunTimeState/ExportState';
import { SystemState } from '../PredefinedConfig/InternalState/SystemState';
import { Calendar } from '../PredefinedConfig/RunTimeState/CalendarState';
import { ChartData } from '../PredefinedConfig/RunTimeState/ChartState';
import { ChartVisibility } from '../PredefinedConfig/Common/ChartEnums';
import { Action } from 'redux';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';

export class InternalApi extends ApiBase implements IInternalApi {
  // System Redux Actions
  public startLiveReport(
    report: Report,
    workbookName: string,
    exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull
  ): void {
    this.dispatchAction(SystemRedux.ReportStartLive(report, workbookName, exportDestination));
  }

  public getSystemState(): SystemState {
    return this.getBlotterState().System;
  }

  public getAvailableCalendars(): Calendar[] {
    return this.getSystemState().AvailableCalendars;
  }

  public setChartData(chartData: ChartData): void {
    this.dispatchAction(SystemRedux.ChartSetChartData(chartData));
  }

  public setChartVisibility(chartVisbility: ChartVisibility): void {
    this.dispatchAction(SystemRedux.ChartSetChartVisibility(chartVisbility));
  }

  public getSystemReports(): Report[] {
    return this.getSystemState().SystemReports;
  }

  public getLiveReports(): ILiveReport[] {
    return this.getSystemState().CurrentLiveReports;
  }

  public getAdaptableAlerts(): AdaptableAlert[] {
    return this.getSystemState().AdaptableAlerts;
  }

  // Popup Redux Actions
  public showPopupConfirmation(confirmation: IUIConfirmation): void {
    this.dispatchAction(PopupRedux.PopupShowConfirmation(confirmation));
  }

  public showPopupScreen(
    strategyId: string,
    componentName: string,
    popupParams?: StrategyParams
  ): void {
    this.dispatchAction(PopupRedux.PopupShowScreen(strategyId, componentName, popupParams));
  }

  // General way to get to store from inside the Blotter...
  public dispatchReduxAction(action: Action): void {
    this.dispatchAction(action);
  }
}
