import { IUIConfirmation } from '../../Utilities/Interface/IMessage';
import { IMenuItem } from '../../Utilities/Interface/IMenu';
import { ExportDestination } from '../../PredefinedConfig/Common/Enums';
import { ILiveReport } from '../../Utilities/Interface/Reports/ILiveReport';
import { SystemState } from '../../PredefinedConfig/ISystemState/SystemState';
import { IReport } from '../../PredefinedConfig/IUserState/ExportState';
import { ICalendar } from '../../PredefinedConfig/IUserState/CalendarState';
import { IChartData } from '../../PredefinedConfig/IUserState/ChartState';
import { ChartVisibility } from '../../PredefinedConfig/Common/ChartEnums';

export interface IInternalApi {
  // System Redux
  getSystemState(): SystemState;
  startLiveReport(
    report: IReport,
    workbookName: string,
    exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull
  ): void;
  getAvailableCalendars(): ICalendar[];
  setChartData(chartData: IChartData): void;
  setChartVisibility(chartVisbility: ChartVisibility): void;
  getSystemReports(): IReport[];
  getLiveReports(): ILiveReport[];

  // Menu Redux
  clearColumnContextMenu(): void;
  addColumnContextMenuItem(menuItem: IMenuItem): void;

  // Popup Redux
  showPopupConfirmation(confirmation: IUIConfirmation): void;
}
