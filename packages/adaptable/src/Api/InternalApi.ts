import { IUIConfirmation, AdaptableAlert } from '../Utilities/Interface/IMessage';
import { SystemState } from '../PredefinedConfig/SystemState';
import { Report } from '../PredefinedConfig/ExportState';
import { Calendar } from '../PredefinedConfig/CalendarState';
import { ChartData } from '../PredefinedConfig/ChartState';
import { ChartVisibility } from '../PredefinedConfig/Common/ChartEnums';
import { Action } from 'redux';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { SelectedCellInfo } from '../PredefinedConfig/Selection/SelectedCellInfo';
import { SelectedRowInfo } from '../PredefinedConfig/Selection/SelectedRowInfo';
import { ChangeDirection } from '../Utilities/Services/Interface/IDataService';
import { AdaptableFunctionName } from '../PredefinedConfig/Common/Types';
import { GridCell } from '../PredefinedConfig/Selection/GridCell';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { IValidationService } from '../Utilities/Services/Interface/IValidationService';
import { IStrategyService } from '../Utilities/Services/StrategyService';
import { IFilterService } from '../Utilities/Services/Interface/IFilterService';
import { IReportService } from '../Utilities/Services/Interface/IReportService';
import { ILayoutService } from '../Utilities/Services/Interface/ILayoutService';
import { ICalculatedColumnExpressionService } from '../Utilities/Services/Interface/ICalculatedColumnExpressionService';
import { AdaptableOptions } from '../AdaptableOptions/AdaptableOptions';
import { IChartService } from '../Utilities/Services/Interface/IChartService';
/**
 * This set of api methods is designed for **internal use of Adaptable** only.
 *
 * None of these methods should be invoked by users of Adaptable and no guarantee is made regarding performance or any after affects if used 'externally'.
 */
export interface InternalApi {
  // System Redux
  getSystemState(): SystemState;
  getAvailableCalendars(): Calendar[];
  setChartData(chartData: ChartData): void;
  setChartVisibility(chartVisbility: ChartVisibility): void;
  getSystemReports(): Report[];
  getAdaptableAlerts(): AdaptableAlert[];
  showPopupConfirmation(confirmation: IUIConfirmation): void;

  showLoadingScreen(): void;
  hideLoadingScreen(): void;

  showPopupScreen(
    functionName: AdaptableFunctionName,
    componentName: string,
    popupParams?: StrategyParams,
    popupProps?: { [key: string]: any }
  ): void;

  hidePopupScreen(): void;

  setColumns(columns: AdaptableColumn[]): void;

  setMainMenuItems(menuItems: AdaptableMenuItem[]): void;

  setSelectedCells(selectedCellInfo: SelectedCellInfo): void;

  setSelectedRows(selectedRowInfo: SelectedRowInfo): void;

  showQuickFilterBar(): void;

  setPivotModeOn(): void;

  setPivotModeOff(): void;

  isGridInPivotMode(): boolean;
  isQuickFilterActive(): boolean;

  setTreeModeOn(): void;

  setTreeModeOff(): void;

  isGridInTreeMode(): boolean;

  addAdaptableColumn(AdaptableColumn: AdaptableColumn): void;

  getUpdatedRowInfos(): any[];

  isRowInUpdatedRowInfo(primaryKeyValue: any, changeDirection: ChangeDirection): boolean;

  setGridCells(gridCells: GridCell[], internalUpdate: boolean, validateChange: boolean): void;

  setGridCell(gridCell: GridCell, internalUpdate: boolean, validateChange: boolean): void;

  setToolbarTitle(): string;

  setLastAppliedShortCut(gridCell: GridCell | undefined): void;

  setDefaultDashboardTab(): void;

  displayActionColumns(): void;

  getAdaptableInstance(): IAdaptable;

  getAdaptableOptions(): AdaptableOptions;

  getValidationService(): IValidationService;
  getStrategyService(): IStrategyService;
  getFilterService(): IFilterService;
  getReportService(): IReportService;
  getLayoutService(): ILayoutService;
  getChartService(): IChartService;
  getCalculatedColumnExpressionService(): ICalculatedColumnExpressionService;

  // for general store accessibilty - not sure that this is right but...
  dispatchReduxAction(action: Action): void;
}
