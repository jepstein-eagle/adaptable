import { DashboardState, CustomToolbar } from '../PredefinedConfig/DashboardState';
import { AdaptableFunctionButtons } from '../PredefinedConfig/Common/Types';
import { ToolbarButton } from '../PredefinedConfig/Common/ToolbarButton';

/**
 * Functions relating to the AdapTable Dashboard.
 *
 * The Dashboard is the area above the grid which contains buttons, tabs, toolbars and Quick Search.
 *
 * **Note**: In v.6.1 (March 2020) the Dashboard has been signficantly updated and improved with some previous properties now deprecated.
 *
 * --------------
 *
 *  **Further AdapTable Help Resources**
 *
 * [Demo Site](https://demo.adaptabletools.com/dashboard) | [State](_src_predefinedconfig_dashboardstate_.dashboardstate.html)  | [ReadMe](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/Functions/dashboard_function.md)
 *
 *  --------------
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
   * Sets which Function Buttons are visible
   *
   * @param functionButtons buttons to show
   */
  setVisibleButtons(functionButtons: AdaptableFunctionButtons): void;

  /**
   * Sets the title of the Dashboard Header
   *
   * Note: This is the bit which can be double-clicked to put the Dashboard into floating mode
   *
   * If no value is set this property, the Dashboard will display the value of the `AdaptableId` property in AdaptableOptions
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

  /***
   * Collapses the Dashboard so only the Dashboard Header is visible - and not the contents of any Toolbars
   */
  collapseDashboard(): void;

  /***
   * Expands the Dashboard so that Toolbars in the Active Tab are fully visible
   */
  expandDashboard(): void;

  /***
   * Floats the Dashboard so only the Dashboard Header is visible (in reduced size) - and it can be dragged to a new location
   */
  floatDashboard(): void;

  /***
   * Docks the Dashboard so that it 'snaps back' into its customary position above the grid.
   */
  dockDashboard(): void;

  /**
   * Returns the current Active Tab (if there is one)
   */
  getActiveTab(): number | undefined;

  /**
   * Sets the Active Tab in the Dashboard Header
   *
   * @param tabIndex the tab index to set
   */
  setActiveTab(tabIndex: number): void;

  /**
   * Opens the Dashboard popup screen
   */
  showDashboardPopup(): void;
}
