import { DashboardState } from '../PredefinedConfig/DashboardState';

/**
 * Provides access to the Dashboard state
 *
 *  **Further Resources**
 *
 * [Demo Site](https://demo.adaptableblotter.com/dashboard/aggriddashboardtoolbarsdemo/) | [State](_predefinedconfig_dashboardstate_.dashboardstate.html) | [FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360029743092-Dashboard-FAQ) | [Videos] (https://adaptabletools.zendesk.com/hc/en-us/articles/360030944511-Dashboard-Videos) | [User Guide](https://adaptabletools.zendesk.com/hc/en-us/articles/360002755177-Styling-Functions)
 *
 */
export interface DashboardApi {
  /**
   * Retrieves the Dashboard section from the Adaptable Blotter State
   */
  GetState(): DashboardState;

  /**
   * Sets which toolbars should be available in the Adaptable Blotter
   *
   * @param availableToolbars toolbars to make available
   */
  SetAvailableToolbars(availableToolbars: string[]): void;
  /**
   * Sets which toolbars should be visibile in the Adaptable Blotter
   *
   * @param visibleToolbars toolbars to show
   */
  SetVisibleToolbars(visibleToolbars: string[]): void;

  /**
   * Makes the given toolbar visible
   *
   * @param visibleToolbar toolbar to show
   */
  ShowToolbar(visibleToolbar: string): void;

  /**
   * Hides the given toolbar
   *
   * @param visibleToolbar toolbar to hide
   */
  HideToolbar(visibleToolbar: string): void;

  /**
   * Sets which Function Buttons are visible
   *
   * @param functionButtons buttons to show
   */
  SetVisibleButtons(functionButtons: string[]): void;

  /**
   * Sets whether the Dashboard is Visible, Hiden or Minimised
   *
   * @param dashboardVisibility visibility option to set
   */
  SetVisibility(dashboardVisibility: 'Minimised' | 'Visible' | 'Hidden'): void;

  /**
   * Shows the Dashboard (ie. sets Visibility to 'Visible')
   */
  Show(): void;

  /**
   * Hides the Dashboard (ie. sets Visibility to 'Hidden')
   */
  Hide(): void;

  /**
   * Minimises the Dashboard (ie. sets Visibility to 'Minimised' so that only a button is visibile)
   */
  Minimise(): void;

  /**
   * Makes the System Status button visible.
   */
  ShowSystemStatusButton(): void;

  /**
   * Hides the System Status button
   */
  HideSystemStatusButton(): void;

  /**
   * Shows the Grid Info button - which opens the GridInfo screen.
   *
   * The GridInfo Screen shows information about the current Blotter (e.g. visible rows and columns, any calculated columns etc.)
   */
  ShowGridInfoButton(): void;

  /**
   * Hides the Grid Info button - which opens the GridInfo screen.
   *
   * The GridInfo Screen shows information about the current Blotter (e.g. visible rows and columns, any calculated columns etc.)
   */
  HideGridInfoButton(): void;

  /**
   * Shows the Functions Dropdown.
   *
   * The Functions dropdown appears on the left of the Home Toolbar and lists all the functions available to the user.
   */
  ShowFunctionsDropdown(): void;

  /**
   * Hides the Functions Dropdown.
   *
   * The Functions dropdown appears on the left of the Home Toolbar and lists all the functions available to the user.
   */
  HideFunctionsDropdown(): void;

  /**
   * Shows the Columns Dropdown.
   *
   * The Columns dropdown appears on the right of the Home Toolbar and lists all the columns in the grid.
   */
  ShowColumnsDropdown(): void;

  /**
   * Hides the Columns Dropdown.
   *
   * The Columns dropdown appears on the right of the Home Toolbar and lists all the columns in the grid.
   */
  HideColumnsDropdown(): void;

  /**
   * Shows the Toolbars Dropdown.
   *
   * The Toolbars dropdown appears on the right of the Home Toolbar and lists all the available Toolbars.
   */
  ShowToolbarsDropdown(): void;

  /**
   * Hides the Toolbars Dropdown.
   *
   * The Toolbars dropdown appears on the right of the Home Toolbar and lists all the available Toolbars.
   */
  HideToolbarsDropdown(): void;

  /**
   * Sets the title of the Home Toolbar - the one on the left of the Dashboard
   *
   * If no value is set, the title of the Home Toolbar will be the ​​blotterId​​ property in AdaptableBlotterOptions
   */
  SetHomeToolbarTitle(title: string): void;
  /**
   * This is deprecated.  Use the method of the same name in Application Api
   */
  SetApplicationToolbarTitle(title: string): void;

  /**
   * Opens the Dashboard popup screen
   */
  showDashboardPopup(): void;
}
