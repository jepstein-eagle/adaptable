import { RunTimeState } from './RunTimeState';

export type AdaptableBlotterToolPanels = AdaptableBlotterToolPanel[];

export type AdaptableBlotterToolPanel =
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
  AvailableToolPanels?: AdaptableBlotterToolPanels;
  VisibleToolPanels?: AdaptableBlotterToolPanels;
}
