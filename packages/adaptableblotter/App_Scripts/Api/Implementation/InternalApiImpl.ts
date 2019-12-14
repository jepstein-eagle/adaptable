import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import * as GridRedux from '../../Redux/ActionsReducers/GridRedux';
import { ApiBase } from './ApiBase';
import { InternalApi } from '../InternalApi';
import { IUIConfirmation, AdaptableAlert } from '../../Utilities/Interface/IMessage';
import { ExportDestination, LiveReportTrigger } from '../../PredefinedConfig/Common/Enums';
import { Report } from '../../PredefinedConfig/ExportState';
import { SystemState } from '../../PredefinedConfig/SystemState';
import { Calendar } from '../../PredefinedConfig/CalendarState';
import { ChartData } from '../../PredefinedConfig/ChartState';
import { ChartVisibility } from '../../PredefinedConfig/Common/ChartEnums';
import { Action } from 'redux';
import { StrategyParams } from '../../View/Components/SharedProps/StrategyViewPopupProps';
import { AdaptableBlotterColumn } from '../../PredefinedConfig/Common/AdaptableBlotterColumn';
import { AdaptableBlotterMenuItem } from '../../PredefinedConfig/Common/Menu';
import { SelectedCellInfo } from '../../Utilities/Interface/Selection/SelectedCellInfo';
import { SelectedRowInfo } from '../../Utilities/Interface/Selection/SelectedRowInfo';
import { ColumnSort } from '../../PredefinedConfig/LayoutState';
import { UpdatedRowInfo, ChangeDirection } from '../../Utilities/Services/Interface/IDataService';
import Helper from '../../Utilities/Helpers/Helper';
import { LiveReport } from '../Events/LiveReportUpdated';

export class InternalApiImpl extends ApiBase implements InternalApi {
  // System Redux Actions
  public startLiveReport(
    report: Report,
    pageName: string,
    exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull
  ): void {
    this.dispatchAction(SystemRedux.ReportStartLive(report, pageName, exportDestination));
    // now raise the event
    this.blotter.ReportService.PublishLiveReportUpdatedEvent(
      exportDestination,
      LiveReportTrigger.ExportStarted
    );
  }
  public stopLiveReport(
    report: Report,
    exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull
  ): void {
    this.dispatchAction(SystemRedux.ReportStopLive(report, exportDestination));
    // now raise the event
    this.blotter.ReportService.PublishLiveReportUpdatedEvent(
      exportDestination,
      LiveReportTrigger.ExportStopped
    );
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

  public getLiveReports(): LiveReport[] {
    return this.getSystemState().CurrentLiveReports;
  }

  public getAdaptableAlerts(): AdaptableAlert[] {
    return this.getSystemState().AdaptableAlerts;
  }

  // Popup Redux Actions
  public showPopupConfirmation(confirmation: IUIConfirmation): void {
    this.dispatchAction(PopupRedux.PopupShowConfirmation(confirmation));
  }

  public showLoadingScreen(): void {
    this.dispatchAction(PopupRedux.PopupShowLoading());
  }

  public hideLoadingScreen(): void {
    this.dispatchAction(PopupRedux.PopupHideLoading());
  }

  public showPopupScreen(
    strategyId: string,
    componentName: string,
    popupParams?: StrategyParams
  ): void {
    this.dispatchAction(PopupRedux.PopupShowScreen(strategyId, componentName, popupParams));
  }

  public setColumns(columns: AdaptableBlotterColumn[]): void {
    this.dispatchAction(GridRedux.GridSetColumns(columns));
  }

  public setMainMenuItems(menuItems: AdaptableBlotterMenuItem[]): void {
    this.dispatchAction(GridRedux.SetMainMenuItems(menuItems));
  }

  public setSelectedCells(selectedCellInfo: SelectedCellInfo): void {
    this.dispatchAction(GridRedux.GridSetSelectedCells(selectedCellInfo));
  }

  public setSelectedRows(selectedRowInfo: SelectedRowInfo): void {
    this.dispatchAction(GridRedux.GridSetSelectedRows(selectedRowInfo));
  }

  public showQuickFilterBar(): void {
    this.dispatchAction(GridRedux.QuickFilterBarShow());
  }

  public setGlue42On(): void {
    this.dispatchAction(GridRedux.SetGlue42On());
    this.blotter.ReportService.PublishLiveReportUpdatedEvent(
      ExportDestination.Glue42,
      LiveReportTrigger.Connected
    );
  }

  public setGlue42Off(): void {
    this.dispatchAction(GridRedux.SetGlue42Off());
    this.blotter.ReportService.PublishLiveReportUpdatedEvent(
      ExportDestination.Glue42,
      LiveReportTrigger.Disconnected
    );
  }

  public setIPushPullOn(): void {
    this.dispatchAction(GridRedux.SetIPushPullOn());
    this.blotter.ReportService.PublishLiveReportUpdatedEvent(
      ExportDestination.iPushPull,
      LiveReportTrigger.Connected
    );
  }

  public setIPushPullOff(): void {
    this.dispatchAction(GridRedux.SetIPushPullOff());
    this.blotter.ReportService.PublishLiveReportUpdatedEvent(
      ExportDestination.iPushPull,
      LiveReportTrigger.Disconnected
    );
  }

  public setPivotModeOn(): void {
    this.dispatchAction(GridRedux.SetPivotModeOn());
  }

  public setPivotModeOff(): void {
    this.dispatchAction(GridRedux.SetPivotModeOff());
  }

  public isGridInPivotMode(): boolean {
    return this.getBlotterState().Grid.IsGridInPivotMode;
  }

  public addAdaptableBlotterColumn(adaptableBlotterColumn: AdaptableBlotterColumn): void {
    this.dispatchAction(GridRedux.GridAddColumn(adaptableBlotterColumn));
  }

  public setColumnSorts(columnSorts: ColumnSort[]): void {
    this.dispatchAction(GridRedux.GridSetSort(columnSorts));
  }

  public getUpdatedRowInfos(): any[] {
    return this.getSystemState().UpdatedRowInfos;
  }

  public isRowInUpdatedRowInfo(primaryKeyValue: any, changeDirection: ChangeDirection): boolean {
    let foundUpdatedRowInfo:
      | UpdatedRowInfo
      | undefined = this.getSystemState().UpdatedRowInfos.find(
      uri => uri.primaryKeyValue == primaryKeyValue && uri.changeDirection == changeDirection
    );
    return Helper.objectExists(foundUpdatedRowInfo);
  }

  // General way to get to store from inside the Blotter...
  public dispatchReduxAction(action: Action): void {
    this.dispatchAction(action);
  }
}
