import { IUIConfirmation } from '../../Utilities/Interface/IMessage';
import { IMenuItem } from '../../Utilities/Interface/IMenu';
import { ExportDestination } from '../../PredefinedConfig/Common/Enums';
import { ILiveReport } from '../../Utilities/Interface/Reports/ILiveReport';
import { SystemState } from '../../PredefinedConfig/InternalState/SystemState';
import { Report } from '../../PredefinedConfig/RunTimeState/ExportState';
import { Calendar } from '../../PredefinedConfig/RunTimeState/CalendarState';
import { ChartData } from '../../PredefinedConfig/RunTimeState/ChartState';
import { ChartVisibility } from '../../PredefinedConfig/Common/ChartEnums';

export interface IInternalApi {
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

  // Menu Redux
  clearColumnContextMenu(): void;
  addColumnContextMenuItem(menuItem: IMenuItem): void;

  // Popup Redux
  showPopupConfirmation(confirmation: IUIConfirmation): void;
}
