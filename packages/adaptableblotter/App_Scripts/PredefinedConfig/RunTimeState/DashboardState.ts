import { RunTimeState } from './RunTimeState';
export interface DashboardState extends RunTimeState {
  AvailableToolbars?: string[];
  VisibleToolbars?: string[];
  VisibleButtons?: string[];
  Zoom?: number;
  DashboardVisibility?: 'Minimised' | 'Visible' | 'Hidden';
  ShowSystemStatusButton?: boolean;
  ShowAboutButton?: boolean;
  ShowFunctionsDropdown?: boolean;
  ShowColumnsDropdown?: boolean;
  ShowToolbarsDropdown?: boolean;
  HomeToolbarTitle?: string;
  ApplicationToolbarTitle?: string;
  UseSingleColourForButtons?: boolean;
  UseExtraSmallButtons?: boolean;
}
