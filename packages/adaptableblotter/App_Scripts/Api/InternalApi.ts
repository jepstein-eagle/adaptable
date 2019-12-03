import { IUIConfirmation, AdaptableAlert } from '../Utilities/Interface/IMessage';
import { ExportDestination } from '../PredefinedConfig/Common/Enums';
import { ILiveReport } from '../Utilities/Interface/Reports/ILiveReport';
import { SystemState } from '../PredefinedConfig/SystemState';
import { Report } from '../PredefinedConfig/ExportState';
import { Calendar } from '../PredefinedConfig/CalendarState';
import { ChartData } from '../PredefinedConfig/ChartState';
import { ChartVisibility } from '../PredefinedConfig/Common/ChartEnums';
import { Action } from 'redux';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import { GridCell } from '../Utilities/Interface/Selection/GridCell';
import { AdaptableBlotterColumn } from '../Utilities/Interface/AdaptableBlotterColumn';
import { AdaptableBlotterMenuItem } from '../Utilities/MenuItem';
import { SelectedCellInfo } from '../Utilities/Interface/Selection/SelectedCellInfo';
import { SelectedRowInfo } from '../Utilities/Interface/Selection/SelectedRowInfo';
import { ColumnSort } from '../PredefinedConfig/LayoutState';
import { ChangeDirection } from '../Utilities/Services/Interface/IDataService';

/**
 * This set of api methods is designed for **internal use of the Adaptable Blotter** only.
 *
 * None of these methods should be invoked by users of the Adaptable Blotter and no guarantee is made regarding performance or any after affects if used 'externally'.
 */
export interface InternalApi {
  // System Redux
  getSystemState(): SystemState;
  startLiveReport(
    report: Report,
    workbookName: string,
    exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull
  ): void;
  getAvailableCalendars(): Calendar[];
  setChartData(chartData: ChartData): void;
  setChartVisibility(chartVisbility: ChartVisibility): void;
  getSystemReports(): Report[];
  getLiveReports(): ILiveReport[];
  getAdaptableAlerts(): AdaptableAlert[];
  showPopupConfirmation(confirmation: IUIConfirmation): void;

  showLoadingScreen(): void;
  hideLoadingScreen(): void;

  showPopupScreen(strategyId: string, componentName: string, popupParams?: StrategyParams): void;

  setColumns(columns: AdaptableBlotterColumn[]): void;

  setMainMenuItems(menuItems: AdaptableBlotterMenuItem[]): void;

  setSelectedCells(selectedCellInfo: SelectedCellInfo): void;

  setSelectedRows(selectedRowInfo: SelectedRowInfo): void;

  showQuickFilterBar(): void;

  setGlue42On(): void;

  setGlue42Off(): void;

  isGlue42Runing(): boolean;

  setIPushPullOn(): void;

  setIPushPullOff(): void;

  isIPushPullRunning(): boolean;

  setPivotModeOn(): void;

  setPivotModeOff(): void;

  isGridInPivotMode(): boolean;

  addAdaptableBlotterColumn(adaptableBlotterColumn: AdaptableBlotterColumn): void;

  setColumnSorts(columnSorts: ColumnSort[]): void;

  getUpdatedRowInfos(): any[];

  isRowInUpdatedRowInfo(primaryKeyValue: any, changeDirection: ChangeDirection): boolean;

  // for general store accessibilty - not sure that this is right but...
  dispatchReduxAction(action: Action): void;
}
