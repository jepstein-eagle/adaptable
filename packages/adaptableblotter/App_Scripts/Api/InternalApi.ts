import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux'
import * as SystemRedux from '../Redux/ActionsReducers/SystemRedux'
import { ApiBase } from "./ApiBase";
import { IInternalApi } from './Interface/IInternalApi';
import { IUIConfirmation } from '../Utilities/Interface/IMessage';
import { IMenuItem } from '../Utilities/Interface/IMenu';
import { ExportDestination } from '../Utilities/Enums';
import { SystemState } from '../Redux/ActionsReducers/Interface/IState';
import { ICalendar } from '../Utilities/Interface/BlotterObjects/ICalendar';
import { IChartData } from '../Utilities/Interface/BlotterObjects/Charting/IChartData';
import { ChartVisibility } from '../Utilities/ChartEnums';
import { IReport } from '../Utilities/Interface/BlotterObjects/IReport';
import { ILiveReport } from '../Utilities/Interface/Reports/ILiveReport';

export class InternalApi extends ApiBase implements IInternalApi {

  // System Redux Actions
  public ReportStartLive(reportName: string, workbookName: string, exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull): void {
    this.dispatchAction(
      SystemRedux.ReportStartLive(reportName, workbookName, exportDestination));
  }


  public GetSystemState(): SystemState {
    return this.getBlotterState().System;
  }

  public GetAvailableCalendars(): ICalendar[] {
    return this.GetSystemState().AvailableCalendars;
  }

  public SetChartData(chartData: IChartData): void {
    this.dispatchAction(SystemRedux.ChartSetChartData(chartData));
  }

  public SetChartVisibility(chartVisbility: ChartVisibility): void {
    this.dispatchAction(SystemRedux.ChartSetChartVisibility(chartVisbility));
  }

  public getSystemReports(): IReport[] {
    return this.GetSystemState().SystemReports;
  }

  public getLiveReports(): ILiveReport[] {
    return this.GetSystemState().CurrentLiveReports;
  }

  // Menu Redux Actions
  public ColumnContextMenuClear(): void {
    this.dispatchAction(MenuRedux.ClearColumnContextMenu());
  }

  public ColumnContextMenuAddItem(menuItem: IMenuItem): void {
    this.dispatchAction(MenuRedux.AddItemColumnContextMenu(menuItem));
  }


  // Popup Redux Actions
  public PopupShowConfirmation(confirmation: IUIConfirmation): void {
    this.dispatchAction(PopupRedux.PopupShowConfirmation(confirmation));
  }
}