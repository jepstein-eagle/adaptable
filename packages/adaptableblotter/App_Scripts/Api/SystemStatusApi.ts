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
 * You are also able to provide the Adaptable state (through the System Status section of Predefined Config) with a `DefaultStatusMessage` and `DefaultStatusType` to display when there is nothing specific to show.
 *
 *  **Further Resources**
 *
 * [Demo Site](https://demo.adaptableblotter.com/alertsmessages/aggridsystemstatusdemo/) | [System Status State](_predefinedconfig_systemstatusstate_.systemstatusstate.html) | [FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360029895931-Alert-Functions-FAQ) | [User Guide](https://adaptabletools.zendesk.com/hc/en-us/articles/360002754957-Run-Time-Access)
 *
 */
export interface SystemStatusApi {
  /**
   * Retrieves the System Status section from the Adaptable State
   */
  getSystemStatusState(): SystemStatusState;

  /**
   * Sets a System Status messages.
   *
   * This will appear in the System Status toolbar, tool panel (and popup).
   *
   * Additionally it will colour, as appropriate, the *SystemStatus* button (which is an option to display in the Home Toolbar)
   *
   * The (optional) `statusFurtherInformation` param allows further details to be provided if required.
   */
  setSystemStatus(
    statusMessage: string,
    messageType: 'Error' | 'Warning' | 'Success' | 'Info',
    statusFurtherInformation?: string
  ): void;

  /**
   * Sets System Status to **Error** with an accompany message to display when the button is clicked.
   *
   * The (optional) `statusFurtherInformation` param allows further details to be provided if required.
   */
  setErrorSystemStatus(statusMessage: string, statusFurtherInformation?: string): void;

  /**
   * Sets System Status to **Warning** with an accompany message to display when the button is clicked.
   *
   * The (optional) `statusFurtherInformation` param allows further details to be provided if required.
   */
  setWarningSystemStatus(statusMessage: string, statusFurtherInformation?: string): void;

  /**
   * Sets System Status to **Success** with an accompanying message to display when the button is clicked.
   *
   * The (optional) `statusFurtherInformation` param allows further details to be provided if required.
   */
  setSuccessSystemStatus(statusMessage: string, statusFurtherInformation?: string): void;

  /**
   * Sets System Status to **Info** with an accompany message to display when the button is clicked.
   *
   * The (optional) `statusFurtherInformation` param allows further details to be provided if required.
   */
  setInfoSystemStatus(statusMessage: string, statusFurtherInformation?: string): void;
  /**
   * Clears the System Status message
   */
  clearSystemStatus(): void;

  /**
   * Sets the System Status message to be the `DefaultStatusMessage` (and associated `DefaultStatusType`) if they have been supplied.
   */
  setDefaultMessage(): void;

  /**
   * Opens the System Status popup
   */
  showSystemStatusPopup(): void;
}
