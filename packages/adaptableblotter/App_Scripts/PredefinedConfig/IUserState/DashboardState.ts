import { IUserState } from './IUserState';
export interface DashboardState extends IUserState {
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
