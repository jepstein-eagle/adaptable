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
 * [Demo Site](https://demo.adaptabletools.com/dashboard/aggriddashboardtoolbarsdemo/) | [State](_src_predefinedconfig_dashboardstate_.dashboardstate.html) | [FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360029743092-Dashboard-FAQ) | [Videos](https://adaptabletools.zendesk.com/hc/en-us/articles/360030944511-Dashboard-Videos) | [User Guide](https://adaptabletools.zendesk.com/hc/en-us/articles/360002755177-Styling-Functions)
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
