import { SystemStatusState } from '../PredefinedConfig/SystemStatusState';

/**
 * Provides access to the System Status function and associated System Status state.
 *
 * The System Status function allows you to display a `StatusMessage` to the user with important information.
 *
 * Each message is associated with a `StatusType` that has a default colour (though you can change this through CSS Variables when you create a custom theme).
 *
 * The default Message Types are:
 *
 * - 'Info' (Blue)
 *
 * - 'Success' (Green)
 *
 * - 'Warning' (Amber)
 *
 * - 'Error' (Red)
 *
 * You are also able to provide the Adaptable Blotter state (through the System Status section of Predefined Config) with a `DefaultStatusMessage` and `DefaultStatusType` to display when there is nothing specific to show.
 *
 *  **Further Resources**
 *
 * [Demo Site](https://demo.adaptableblotter.com/alertsmessages/aggridsystemstatusdemo/) | [State](_predefinedconfig_systemstatusstate_.systemstatusstate.html) | [FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360029895931-Alert-Functions-FAQ) | [User Guide](https://adaptabletools.zendesk.com/hc/en-us/articles/360002754957-Messages-and-Alerts)
 *
 */
export interface SystemStatusApi {
  /**
   * Retrieves the System Status section from the Adaptable Blotter State
   */
  getSystemStatusState(): SystemStatusState;

  /**
   * Sets a System Status messages.
   *
   * This will appear in the System Status toolbar, tool panel (and popup).
   *
   * Additionally it will colour, as appropriate, the 'SystemStatus' button which is an option to display in the Home Toolbar
   *
   * The (optional) statusFurtherInformation allows further details to be provided if required.
   */
  setSystemStatus(
    statusMessage: string,
    messageType: 'Error' | 'Warning' | 'Success' | 'Info',
    statusFurtherInformation?: string
  ): void;

  /**
   * Sets System Status to ERROR with an accompany message to display when the button is clicked.
   *
   * The (optional) statusFurtherInformation allows further details to be provided if required.
   */
  setErrorSystemStatus(statusMessage: string, statusFurtherInformation?: string): void;

  /**
   * Sets System Status to WARNING with an accompany message to display when the button is clicked.
   *
   * The (optional) statusFurtherInformation allows further details to be provided if required.
   */
  setWarningSystemStatus(statusMessage: string, statusFurtherInformation?: string): void;

  /**
   * Sets System Status to SUCCESS with an accompanying message to display when the button is clicked.
   *
   * The (optional) statusFurtherInformation allows further details to be provided if required.
   */
  setSuccessSystemStatus(statusMessage: string, statusFurtherInformation?: string): void;

  /**
   * Sets System Status to INFO with an accompany message to display when the button is clicked.
   *
   * The (optional) statusFurtherInformation property allows further details to be provided if required.
   */
  setInfoSystemStatus(statusMessage: string, statusFurtherInformation?: string): void;
  /**
   * Clears any System Status messages (and sets the type to the default type - 'success')
   */
  clearSystemStatus(): void;

  /**
   * Sets the default message (and message Type) if they have been supplied.
   */
  setDefaultMessage(): void;

  /**
   * Opens the System Status popup
   */
  showSystemStatusPopup(): void;
}
