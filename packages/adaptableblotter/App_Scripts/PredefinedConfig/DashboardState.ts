import { RunTimeState } from './RunTimeState';
import { ButtonStyle } from './Common/ButtonStyle';
export interface DashboardState extends RunTimeState {
  AvailableToolbars?: string[];
  VisibleToolbars?: string[];
  VisibleButtons?: string[];
  DashboardVisibility?: 'Minimised' | 'Visible' | 'Hidden';
  ShowSystemStatusButton?: boolean;
  ShowGridInfoButton?: boolean;
  ShowFunctionsDropdown?: boolean;
  ShowColumnsDropdown?: boolean;
  ShowToolbarsDropdown?: boolean;
  HomeToolbarTitle?: string;
  ApplicationToolbarTitle?: string;
  MinimisedHomeToolbarButtonStyle?: ButtonStyle;
}
