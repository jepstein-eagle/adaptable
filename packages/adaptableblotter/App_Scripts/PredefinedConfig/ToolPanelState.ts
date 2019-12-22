import { RunTimeState } from './RunTimeState';

export type AdaptableToolPanels = AdaptableToolPanel[];

export type AdaptableToolPanel =
  | 'AdvancedSearch'
  | 'Alert'
  | 'BulkUpdate'
  | 'CellSummary'
  | 'Chart'
  | 'ColumnFilter'
  | 'Dashboard'
  | 'Export'
  | 'Layout'
  | 'QuickSearch'
  | 'SmartEdit'
  | 'SystemStatus'
  | 'Theme';

export interface ToolPanelState extends RunTimeState {
  AvailableToolPanels?: AdaptableToolPanels;
  VisibleToolPanels?: AdaptableToolPanels;
}
