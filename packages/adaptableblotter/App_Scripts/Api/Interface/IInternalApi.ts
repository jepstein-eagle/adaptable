import { IUIConfirmation, AdaptableAlert } from '../../Utilities/Interface/IMessage';
import { ExportDestination } from '../../PredefinedConfig/Common/Enums';
import { ILiveReport } from '../../Utilities/Interface/Reports/ILiveReport';
import { SystemState } from '../../PredefinedConfig/InternalState/SystemState';
import { Report } from '../../PredefinedConfig/RunTimeState/ExportState';
import { Calendar } from '../../PredefinedConfig/RunTimeState/CalendarState';
import { ChartData } from '../../PredefinedConfig/RunTimeState/ChartState';
import { ChartVisibility } from '../../PredefinedConfig/Common/ChartEnums';
import { Action } from 'redux';
import { StrategyParams } from '../../View/Components/SharedProps/StrategyViewPopupProps';

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
  getAdaptableAlerts(): AdaptableAlert[];
  /**
   * Shows a Confirmation Popup
   */
  showPopupConfirmation(confirmation: IUIConfirmation): void;

  /**
   * Shows a Strategy Popup
   */
  showPopupScreen(strategyId: string, componentName: string, popupParams?: StrategyParams): void;

  // for general store accessibilty - not sure that this is right but...
  dispatchReduxAction(action: Action): void;
}
