import { IUIConfirmation, AdaptableAlert } from '../Utilities/Interface/IMessage';
import { ExportDestination } from '../PredefinedConfig/Common/Enums';
import { SystemState } from '../PredefinedConfig/SystemState';
import { Report } from '../PredefinedConfig/ExportState';
import { Calendar } from '../PredefinedConfig/CalendarState';
import { ChartData } from '../PredefinedConfig/ChartState';
import { ChartVisibility } from '../PredefinedConfig/Common/ChartEnums';
import { Action } from 'redux';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { SelectedCellInfo } from '../Utilities/Interface/Selection/SelectedCellInfo';
import { SelectedRowInfo } from '../Utilities/Interface/Selection/SelectedRowInfo';
import { ChangeDirection } from '../Utilities/Services/Interface/IDataService';
import { LiveReport } from './Events/LiveDataChanged';
import { AdaptableFunctionName } from '../PredefinedConfig/Common/Types';
import { ColumnSort } from '../PredefinedConfig/Common/ColumnSort';
/**
 * This set of api methods is designed for **internal use of Adaptable** only.
 *
 * None of these methods should be invoked by users of Adaptable and no guarantee is made regarding performance or any after affects if used 'externally'.
 */
export interface InternalApi {
  // System Redux
  getSystemState(): SystemState;
  startLiveReport(
    report: Report,
    pageName: string,
    exportDestination: ExportDestination.OpenfinExcel | ExportDestination.Glue42
  ): void;
  stopLiveReport(
    report: Report,
    exportDestination: ExportDestination.OpenfinExcel | ExportDestination.Glue42
  ): void;
  getAvailableCalendars(): Calendar[];
  setChartData(chartData: ChartData): void;
  setChartVisibility(chartVisbility: ChartVisibility): void;
  getSystemReports(): Report[];
  getLiveReports(): LiveReport[];
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

  setGlue42AvailableOn(): void;

  setGlue42AvailableOff(): void;

  setPivotModeOn(): void;

  setPivotModeOff(): void;

  isGridInPivotMode(): boolean;

  addAdaptableColumn(AdaptableColumn: AdaptableColumn): void;

  setColumnSorts(columnSorts: ColumnSort[]): void;

  getUpdatedRowInfos(): any[];

  isRowInUpdatedRowInfo(primaryKeyValue: any, changeDirection: ChangeDirection): boolean;

  getCurrentLiveReports(): LiveReport[];

  isLiveReportRunning(): boolean;

  isOpenFinAvailable(): boolean;

  // for general store accessibilty - not sure that this is right but...
  dispatchReduxAction(action: Action): void;
}
