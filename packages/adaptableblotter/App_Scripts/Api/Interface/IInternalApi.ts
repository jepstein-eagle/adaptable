import { IUIConfirmation } from '../../Utilities/Interface/IMessage';
import { ExportDestination } from '../../PredefinedConfig/Common/Enums';
import { ILiveReport } from '../../Utilities/Interface/Reports/ILiveReport';
import { SystemState } from '../../PredefinedConfig/InternalState/SystemState';
import { Report } from '../../PredefinedConfig/RunTimeState/ExportState';
import { Calendar } from '../../PredefinedConfig/RunTimeState/CalendarState';
import { ChartData } from '../../PredefinedConfig/RunTimeState/ChartState';
import { ChartVisibility } from '../../PredefinedConfig/Common/ChartEnums';
import { Action } from 'redux';

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

  // Popup Redux
  showPopupConfirmation(confirmation: IUIConfirmation): void;

  // for general store accessibilty - not sure that this is right but...
  dispatchReduxAction(action: Action): void;
}
