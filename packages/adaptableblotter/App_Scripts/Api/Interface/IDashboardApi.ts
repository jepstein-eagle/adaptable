import { DashboardState } from '../../PredefinedConfig/IUserState/DashboardState';

export interface IDashboardApi {
  GetState(): DashboardState;
  SetAvailableToolbars(availableToolbars: string[]): void;
  SetVisibleToolbars(visibleToolbars: string[]): void;
  ShowToolbar(visibleToolbar: string): void;
  HideToolbar(visibleToolbar: string): void;
  SetVisibleButtons(functionButtons: string[]): void;
  // Number has to be a decimal between 0 and 1
  SetZoom(zoom: Number): void;
  SetVisibility(dashboardVisibility: 'Minimised' | 'Visible' | 'Hidden'): void;
  Show(): void;
  Hide(): void;
  ShowSystemStatusButton(): void;
  HideSystemStatusButton(): void;
  // The About Screen shows information about the current Blotter (e.g. visible rows and columns, any calculated columns etc.)
  ShowAboutButton(): void;
  HideAboutButton(): void;
  // The Functions dropdown appears on the left of the Home Toolbar and lists all the functions available to the user.
  ShowFunctionsDropdown(): void;
  HideFunctionsDropdown(): void;
  // The Columns dropdown appears on the right of the Home Toolbar and lists all the columns in the grid.
  ShowColumnsDropdown(): void;
  HideColumnsDropdown(): void;
  // If no value is set, the title of the Home Toolbar will be the ​​blotterId​​ property in IAdaptableBlotterOptions
  SetHomeToolbarTitle(title: string): void;
  SetApplicationToolbarTitle(title: string): void;
  UseSingleColourForButtons(): void;
  UseMultipleColourForButtons(): void;
  UseExtraSmallButtons(): void;
  UseDefaultSizeButtons(): void;
  Minimise(): void;
}
