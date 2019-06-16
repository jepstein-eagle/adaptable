import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux';
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux';
import * as SystemRedux from '../Redux/ActionsReducers/SystemRedux';
import { ApiBase } from './ApiBase';
import { IInternalApi } from './Interface/IInternalApi';
import { IUIConfirmation } from '../Utilities/Interface/IMessage';
import { IMenuItem } from '../Utilities/Interface/IMenu';
import { ExportDestination } from '../PredefinedConfig/Common Objects/Enums';
import { ILiveReport } from '../Utilities/Interface/Reports/ILiveReport';
import { IReport } from '../PredefinedConfig/IUserState Interfaces/ExportState';
import { SystemState } from '../PredefinedConfig/ISystemState Interfaces/SystemState';
import { ICalendar } from '../PredefinedConfig/IUserState Interfaces/CalendarState';
import { IChartData } from '../PredefinedConfig/IUserState Interfaces/ChartState';
import { ChartVisibility } from '../PredefinedConfig/Common Objects/ChartEnums';

export class InternalApi extends ApiBase implements IInternalApi {
  // System Redux Actions
  public startLiveReport(
    report: IReport,
    workbookName: string,
    exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull
  ): void {
    this.dispatchAction(SystemRedux.ReportStartLive(report, workbookName, exportDestination));
  }

  public getSystemState(): SystemState {
    return this.getBlotterState().System;
  }

  public getAvailableCalendars(): ICalendar[] {
    return this.getSystemState().AvailableCalendars;
  }

  public setChartData(chartData: IChartData): void {
    this.dispatchAction(SystemRedux.ChartSetChartData(chartData));
  }

  public setChartVisibility(chartVisbility: ChartVisibility): void {
    this.dispatchAction(SystemRedux.ChartSetChartVisibility(chartVisbility));
  }

  public getSystemReports(): IReport[] {
    return this.getSystemState().SystemReports;
  }

  public getLiveReports(): ILiveReport[] {
    return this.getSystemState().CurrentLiveReports;
  }

  // Menu Redux Actions
  public clearColumnContextMenu(): void {
    this.dispatchAction(MenuRedux.ClearColumnContextMenu());
  }

  public addColumnContextMenuItem(menuItem: IMenuItem): void {
    this.dispatchAction(MenuRedux.AddItemColumnContextMenu(menuItem));
  }

  // Popup Redux Actions
  public showPopupConfirmation(confirmation: IUIConfirmation): void {
    this.dispatchAction(PopupRedux.PopupShowConfirmation(confirmation));
  }
}
