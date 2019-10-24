import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux';
import * as SystemRedux from '../Redux/ActionsReducers/SystemRedux';
import * as GridRedux from '../Redux/ActionsReducers/GridRedux';
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
import { GridCell } from '../Utilities/Interface/Selection/GridCell';
import { AdaptableBlotterColumn } from '../Utilities/Interface/AdaptableBlotterColumn';
import { AdaptableBlotterMenuItem } from '../Utilities/MenuItem';
import { SelectedCellInfo } from '../Utilities/Interface/Selection/SelectedCellInfo';
import { SelectedRowInfo } from '../Utilities/Interface/Selection/SelectedRowInfo';
import { ColumnSort } from '../PredefinedConfig/RunTimeState/LayoutState';

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

  public setValue(id: any, columnId: string, newValue: any): void {
    let gridCell: GridCell = {
      primaryKeyValue: id,
      columnId: columnId,
      value: newValue,
    };
    this.setGridCell(gridCell);
  }

  public setGridCell(gridCell: GridCell): void {
    this.blotter.setValue(gridCell);
  }

  public setColumns(columns: AdaptableBlotterColumn[]): void {
    this.dispatchAction(GridRedux.GridSetColumns(columns));
  }

  public setGridCellBatch(gridCells: GridCell[]): void {
    this.blotter.setValueBatch(gridCells);
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
  }

  public setGlue42Off(): void {
    this.dispatchAction(GridRedux.SetGlue42Off());
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

  // General way to get to store from inside the Blotter...
  public dispatchReduxAction(action: Action): void {
    this.dispatchAction(action);
  }
}
