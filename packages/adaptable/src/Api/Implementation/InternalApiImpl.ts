import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import * as GridRedux from '../../Redux/ActionsReducers/GridRedux';
import { ApiBase } from './ApiBase';
import { InternalApi } from '../InternalApi';
import { IUIConfirmation, AdaptableAlert } from '../../Utilities/Interface/IMessage';
import { ExportDestination } from '../../PredefinedConfig/Common/Enums';
import { Report } from '../../PredefinedConfig/ExportState';
import { SystemState } from '../../PredefinedConfig/SystemState';
import { Calendar } from '../../PredefinedConfig/CalendarState';
import { ChartData } from '../../PredefinedConfig/ChartState';
import { ChartVisibility } from '../../PredefinedConfig/Common/ChartEnums';
import { Action } from 'redux';
import { StrategyParams } from '../../View/Components/SharedProps/StrategyViewPopupProps';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableMenuItem } from '../../PredefinedConfig/Common/Menu';
import { SelectedCellInfo } from '../../Utilities/Interface/Selection/SelectedCellInfo';
import { SelectedRowInfo } from '../../Utilities/Interface/Selection/SelectedRowInfo';
import { UpdatedRowInfo, ChangeDirection } from '../../Utilities/Services/Interface/IDataService';
import Helper from '../../Utilities/Helpers/Helper';
import { LiveReport } from '../Events/LiveDataChanged';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';
import { ColumnSort } from '../../PredefinedConfig/Common/ColumnSort';
import { GridCell } from '../../Utilities/Interface/Selection/GridCell';
import { DataChangedInfo } from '../../AdaptableOptions/CommonObjects/DataChangedInfo';

export class InternalApiImpl extends ApiBase implements InternalApi {
  public startLiveReport(
    report: Report,
    pageName: string,
    exportDestination: ExportDestination.OpenfinExcel | ExportDestination.Glue42
  ): void {
    this.dispatchAction(SystemRedux.ReportStartLive(report, pageName, exportDestination));
  }

  public stopLiveReport(
    report: Report,
    exportDestination: ExportDestination.OpenfinExcel | ExportDestination.Glue42
  ): void {
    this.dispatchAction(SystemRedux.ReportStopLive(report, exportDestination));
  }

  public getSystemState(): SystemState {
    return this.getAdaptableState().System;
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
    functionName: AdaptableFunctionName,
    componentName: string,
    popupParams?: StrategyParams,
    popupProps?: { [key: string]: any }
  ): void {
    this.dispatchAction(
      PopupRedux.PopupShowScreen(functionName, componentName, popupParams, popupProps)
    );
  }

  public hidePopupScreen(): void {
    this.dispatchAction(PopupRedux.PopupHideScreen());
  }

  public setColumns(columns: AdaptableColumn[]): void {
    this.dispatchAction(GridRedux.GridSetColumns(columns));
  }

  public setMainMenuItems(menuItems: AdaptableMenuItem[]): void {
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

  public setGlue42AvailableOn(): void {
    this.dispatchAction(GridRedux.SetGlue42AvailableOn());
    this.adaptable.ReportService.PublishLiveLiveDataChangedEvent(
      ExportDestination.Glue42,
      'Connected'
    );
  }

  public setGlue42AvailableOff(): void {
    this.dispatchAction(GridRedux.SetGlue42AvailableOff());
    this.adaptable.ReportService.PublishLiveLiveDataChangedEvent(
      ExportDestination.Glue42,
      'Disconnected'
    );
  }

  public setPivotModeOn(): void {
    this.dispatchAction(GridRedux.SetPivotModeOn());
  }

  public setPivotModeOff(): void {
    this.dispatchAction(GridRedux.SetPivotModeOff());
  }

  public isGridInPivotMode(): boolean {
    return this.getAdaptableState().Grid.IsGridInPivotMode;
  }

  public addAdaptableColumn(AdaptableColumn: AdaptableColumn): void {
    this.dispatchAction(GridRedux.GridAddColumn(AdaptableColumn));
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

  public getCurrentLiveReports(): LiveReport[] {
    return this.getAdaptableState().System.CurrentLiveReports;
  }

  public isLiveReportRunning(): boolean {
    return this.getAdaptableState().Grid.IsLiveReportRunning;
  }

  public isOpenFinAvailable(): boolean {
    return false; // TODO
  }

  public setGridCells(
    gridCells: GridCell[],
    internalUpdate: boolean,
    validateChange: boolean
  ): void {
    gridCells.forEach(gc => {
      this.setGridCell(gc, internalUpdate, validateChange);
    });
  }

  public setGridCell(gridCell: GridCell, internalUpdate: boolean, validateChange: boolean): void {
    let dataChangedInfo: DataChangedInfo = this.createDataChangedInfoFromGridCell(gridCell);
    if (validateChange) {
      if (!this.adaptable.ValidationService.PerformCellValidation(dataChangedInfo)) {
        return;
      }
    }

    const onServerValidationCompleted = () => {
      this.adaptable.setValue(dataChangedInfo, internalUpdate);
    };

    const mimicPromise = this.adaptable.adaptableOptions.editOptions!.validateOnServer
      ? this.adaptable.ValidationService.PerformServerValidation(dataChangedInfo, {
          onServerValidationCompleted,
        })
      : onServerValidationCompleted;

    mimicPromise();
  }

  private createDataChangedInfoFromGridCell(gridCell: GridCell): DataChangedInfo {
    let currentValue = this.adaptable.getDisplayValue(gridCell.primaryKeyValue, gridCell.columnId);
    let currentRowNode = this.adaptable.getRowNodeForPrimaryKey(gridCell.primaryKeyValue);
    let dataChangedInfo: DataChangedInfo = {
      OldValue: currentValue,
      NewValue: gridCell.rawValue,
      ColumnId: gridCell.columnId,
      PrimaryKeyValue: gridCell.primaryKeyValue,
      RowNode: currentRowNode,
    };
    return dataChangedInfo;
  }

  // General way to get to store from inside Adaptable...
  public dispatchReduxAction(action: Action): void {
    this.dispatchAction(action);
  }
}
