import { DashboardState, CustomToolbar } from '../PredefinedConfig/DashboardState';
import {
  AdaptableDashboardToolbars,
  AdaptableDashboardToolbar,
  AdaptableFunctionButtons,
} from '../PredefinedConfig/Common/Types';
import { ToolbarButton } from '../PredefinedConfig/Common/ToolbarButton';

/**
 * Provides access to the Dashboard state
 *
 *  **Further AdapTable Help Resources**
 *
 * [Demo Site](https://demo.adaptabletools.com/dashboard/aggriddashboardtoolbarsdemo/) | [State](_predefinedconfig_dashboardstate_.dashboardstate.html) | [FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360029743092-Dashboard-FAQ) | [Videos](https://adaptabletools.zendesk.com/hc/en-us/articles/360030944511-Dashboard-Videos) | [User Guide](https://adaptabletools.zendesk.com/hc/en-us/articles/360002755177-Styling-Functions)
 *
 */
export interface DashboardApi {
  /**
   * Retrieves the Dashboard section from Adaptable State
   */
  getDashboardState(): DashboardState;

  /**
   * Retrieves all the Custom toolbars in the Dashboard section of Adaptable State
   */
  getCustomToolbars(): CustomToolbar[] | undefined;

  /**
   * Sets which toolbars should be available in Adaptable
   *
   * @param availableToolbars toolbars to make available
   */
  setAvailableToolbars(availableToolbars: AdaptableDashboardToolbars): void;
  /**
   * Sets which toolbars should be visibile in Adaptable
   *
   * @param visibleToolbars toolbars to show
   */
  setVisibleToolbars(visibleToolbars: AdaptableDashboardToolbars): void;

  /**
   * Makes the given toolbar visible
   *
   * @param visibleToolbar toolbar to show
   */
  showToolbar(visibleToolbar: AdaptableDashboardToolbar): void;

  /**
   * Hides the given toolbar
   *
   * @param visibleToolbar toolbar to hide
   */
  hideToolbar(visibleToolbar: AdaptableDashboardToolbar): void;

  /**
   * Sets which Function Buttons are visible
   *
   * @param functionButtons buttons to show
   */
  setVisibleButtons(functionButtons: AdaptableFunctionButtons): void;

  /**
   * Sets whether the Dashboard is Visible, Hiden or Minimised
   *
   * @param dashboardVisibility visibility option to set
   */
  setVisibility(dashboardVisibility: 'Minimised' | 'Visible' | 'Hidden'): void;

  /**
   * Shows the Dashboard (ie. sets Visibility to 'Visible')
   */
  show(): void;

  /**
   * Hides the Dashboard (ie. sets Visibility to 'Hidden')
   */
  hide(): void;

  /**
   * Minimises the Dashboard (ie. sets Visibility to 'Minimised' so that only a button is visibile)
   */
  minimise(): void;

  /**
   * Makes the System Status button visible.
   */
  showSystemStatusButton(): void;

  /**
   * Hides the System Status button
   */
  hideSystemStatusButton(): void;

  /**
   * Shows the Grid Info button - which opens the GridInfo screen.
   *
   * The GridInfo Screen shows information about the current Blotter (e.g. visible rows and columns, any calculated columns etc.)
   */
  showGridInfoButton(): void;

  /**
   * Hides the Grid Info button - which opens the GridInfo screen.
   *
   * The GridInfo Screen shows information about the current Blotter (e.g. visible rows and columns, any calculated columns etc.)
   */
  hideGridInfoButton(): void;

  /**
   * Shows the Functions Dropdown.
   *
   * The Functions dropdown appears on the left of the Home Toolbar and lists all the functions available to the user.
   */
  showFunctionsDropdown(): void;

  /**
   * Hides the Functions Dropdown.
   *
   * The Functions dropdown appears on the left of the Home Toolbar and lists all the functions available to the user.
   */
  hideFunctionsDropdown(): void;

  /**
   * Shows the Columns Dropdown.
   *
   * The Columns dropdown appears on the right of the Home Toolbar and lists all the columns in the grid.
   */
  showColumnsDropdown(): void;

  /**
   * Hides the Columns Dropdown.
   *
   * The Columns dropdown appears on the right of the Home Toolbar and lists all the columns in the grid.
   */
  hideColumnsDropdown(): void;

  /**
   * Shows the Toolbars Dropdown.
   *
   * The Toolbars dropdown appears on the right of the Home Toolbar and lists all the available Toolbars.
   */
  showToolbarsDropdown(): void;

  /**
   * Hides the Toolbars Dropdown.
   *
   * The Toolbars dropdown appears on the right of the Home Toolbar and lists all the available Toolbars.
   */
  hideToolbarsDropdown(): void;

  /**
   * Sets the title of the Home Toolbar - the one on the left of the Dashboard
   *
   * If no value is set, the title of the Home Toolbar will be AdaptableId property in AdaptableOptions
   */
  setHomeToolbarTitle(title: string): void;

  /**
   * Returns the `div` element for the given Custom Toolbar
   * @param customToolbarName the name of the Custom Toolbar
   */
  getCustomToolbarContentsDiv(customToolbarName: string): HTMLElement | null;

  /**
   * Returns the Custom Toolbar which has the given name
   * @param customToolbarName the name of the Custom Toolbar
   */
  getCustomToolbarByName(customToolbarName: string): CustomToolbar;

  /**
   * Replaces the Toolbar Buttons in the Custom toolbar with the new set
   * @param customToolbarName the name of the Custom Toolbar
   * @param buttons the `ToolbarButtons` to add
   */
  setCustomToolbarButtons(customToolbarName: string, buttons: ToolbarButton[]): void;

  /**
   * Adds the Toolbar Buttons to the current collection in the Custom Toolbar
   * @param customToolbarName the name of the Custom Toolbar
   * @param buttons the `ToolbarButtons` to add
   */
  addCustomToolbarButtons(customToolbarName: string, buttons: ToolbarButton[]): void;

  /**
   * Clears all the Toolbar Buttons from the Custom Toolbar
   * @param customToolbarName the name of the Custom Toolbar
   */
  clearCustomToolbarButtons(customToolbarName: string): void;

  /**
   * Opens the Dashboard popup screen
   */
  showDashboardPopup(): void;
}
