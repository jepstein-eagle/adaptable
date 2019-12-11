import { RunTimeState } from './RunTimeState';

export type AdaptableBlotterToolPanels = AdaptableBlotterToolPanel[];

export type AdaptableBlotterToolPanel =
  | 'AdvancedSearch'
  | 'Alert'
  // | 'Bulk Update'
  | 'CellSummary'
  | 'Chart'
  | 'ColumnFilter'
  | 'Dashboard'
  | 'Export'
  | 'Layout'
  // | 'SmartEdit'
  | 'QuickSearch'
  | 'SystemStatus'
  | 'Theme';

export interface ToolPanelState extends RunTimeState {
  AvailableToolPanels?: AdaptableBlotterToolPanels;
  VisibleToolPanels?: AdaptableBlotterToolPanels;
}
