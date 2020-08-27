import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import * as GridRedux from '../../Redux/ActionsReducers/GridRedux';
import * as LayoutRedux from '../../Redux/ActionsReducers/LayoutRedux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import { ApiBase } from './ApiBase';
import { InternalApi } from '../InternalApi';
import { IUIConfirmation, AdaptableAlert } from '../../Utilities/Interface/IMessage';
import { Report } from '../../PredefinedConfig/ExportState';
import { SystemState } from '../../PredefinedConfig/SystemState';
import { ChartData } from '../../PredefinedConfig/ChartState';
import { ChartVisibility } from '../../PredefinedConfig/Common/ChartEnums';
import { Action } from 'redux';
import { StrategyParams } from '../../View/Components/SharedProps/StrategyViewPopupProps';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableMenuItem } from '../../PredefinedConfig/Common/Menu';
import { SelectedCellInfo } from '../../PredefinedConfig/Selection/SelectedCellInfo';
import { SelectedRowInfo } from '../../PredefinedConfig/Selection/SelectedRowInfo';
import { UpdatedRowInfo, ChangeDirection } from '../../Utilities/Services/Interface/IDataService';
import Helper from '../../Utilities/Helpers/Helper';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';
import { GridCell } from '../../PredefinedConfig/Selection/GridCell';
import { DataChangedInfo } from '../../PredefinedConfig/Common/DataChangedInfo';
import StringExtensions from '../../Utilities/Extensions/StringExtensions';
import { ADAPTABLE_ID } from '../../Utilities/Constants/GeneralConstants';
import LoggingHelper from '../../Utilities/Helpers/LoggingHelper';
import { DashboardTab } from '../../PredefinedConfig/DashboardState';
import ArrayExtensions from '../../Utilities/Extensions/ArrayExtensions';
import { ActionColumn } from '../../PredefinedConfig/ActionColumnState';
import { IAdaptable, AdaptableOptions, Layout } from '../../types';
import { IValidationService } from '../../Utilities/Services/Interface/IValidationService';
import { IStrategyService } from '../../Utilities/Services/StrategyService';
import { IReportService } from '../../Utilities/Services/Interface/IReportService';
import { ILayoutService } from '../../Utilities/Services/Interface/ILayoutService';
import { ICalculatedColumnExpressionService } from '../../Utilities/Services/Interface/ICalculatedColumnExpressionService';
import { IChartService } from '../../Utilities/Services/Interface/IChartService';
import { SystemFilterId } from '../../PredefinedConfig/FilterState';

export class InternalApiImpl extends ApiBase implements InternalApi {
  public getSystemState(): SystemState {
    return this.getAdaptableState().System;
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

  public setFunctionDropdownMenuItems(menuItems: AdaptableMenuItem[]): void {
    this.dispatchAction(GridRedux.SetFunctionDropdownMenuItems(menuItems));
  }

  public setFunctionButtonMenuItems(menuItems: AdaptableMenuItem[]): void {
    this.dispatchAction(GridRedux.SetFunctionButtonMenuItems(menuItems));
  }

  public setSelectedCells(selectedCellInfo: SelectedCellInfo): void {
    this.dispatchAction(GridRedux.GridSetSelectedCells(selectedCellInfo));
  }

  public setSelectedRows(selectedRowInfo: SelectedRowInfo): void {
    this.dispatchAction(GridRedux.GridSetSelectedRows(selectedRowInfo));
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
  public isQuickFilterActive(): boolean {
    return this.adaptable.isQuickFilterActive();
  }

  public setTreeModeOn(): void {
    this.dispatchAction(GridRedux.SetTreeModeOn());
  }

  public setTreeModeOff(): void {
    this.dispatchAction(GridRedux.SetTreeModeOff());
  }

  public isGridInTreeMode(): boolean {
    return this.getAdaptableState().Grid.IsGridInTreeMode;
  }

  public addAdaptableColumn(AdaptableColumn: AdaptableColumn): void {
    this.dispatchAction(GridRedux.GridAddColumn(AdaptableColumn));
  }
  public addAdaptableColumns(AdaptableColumns: AdaptableColumn[]): void {
    this.dispatchAction(GridRedux.GridAddColumns(AdaptableColumns));
  }
  public removeAdaptableColumn(colId: string): void {
    const col = this.getAdaptableState().Grid.Columns.find(c => c.ColumnId === colId);
    if (col) {
      this.dispatchAction(GridRedux.GridRemoveColumn(col));
    }
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

  setToolbarTitle(): string {
    let toolbarTitle: string = this.adaptable.api.dashboardApi.getDashboardState().HomeToolbarTitle;
    if (StringExtensions.IsNullOrEmpty(toolbarTitle)) {
      toolbarTitle = this.adaptable.adaptableOptions.adaptableId;
      if (toolbarTitle == ADAPTABLE_ID) {
        toolbarTitle = 'Adaptable ';
      }
    }
    return toolbarTitle;
  }

  setLastAppliedShortCut(gridCell: GridCell | undefined): void {
    this.dispatchAction(SystemRedux.SetLastAppliedShortcut(gridCell));
  }

  updateCurrentDraftLayout(layout: Layout): void {
    this.dispatchAction(LayoutRedux.LayoutUpdateCurrentDraft(layout));
  }

  setDefaultDashboardTab(): void {
    const dashboardTabs:
      | DashboardTab[]
      | undefined = this.adaptable.api.dashboardApi.getDashboardState().Tabs;
    if (ArrayExtensions.IsNull(dashboardTabs)) {
      LoggingHelper.LogAdaptableInfo('Creating a default Dashboard tab');
      this.dispatchAction(DashboardRedux.DashboardCreateDefaultTab());
    }
  }

  public getAdaptableInstance(): IAdaptable {
    return this.adaptable;
  }

  public getAdaptableOptions(): AdaptableOptions {
    return this.adaptable.adaptableOptions;
  }

  public getValidationService(): IValidationService {
    return this.adaptable.ValidationService;
  }
  public getStrategyService(): IStrategyService {
    return this.adaptable.StrategyService;
  }

  public getReportService(): IReportService {
    return this.adaptable.ReportService;
  }
  public getLayoutService(): ILayoutService {
    return this.adaptable.LayoutService;
  }
  public getChartService(): IChartService {
    return this.adaptable.ChartService;
  }
  public getCalculatedColumnExpressionService(): ICalculatedColumnExpressionService {
    return this.adaptable.CalculatedColumnExpressionService;
  }

  // General way to get to store from inside Adaptable...
  public dispatchReduxAction(action: Action): void {
    this.dispatchAction(action);
  }
}
