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
 * You are also able to provide Adaptable state (through the System Status section of Predefined Config) with a `DefaultStatusMessage` and `DefaultStatusType` to display when there is nothing specific to show.
 *
 *  **Further AdapTable Help Resources**
 *
 * [Demo Site](https://demo.adaptabletools.com/alertsmessages/aggridsystemstatusdemo/) | [System Status State](_src_predefinedconfig_systemstatusstate_.systemstatusstate.html) | [System Status Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/system-status-function.md)
 *
 */
export interface SystemStatusApi {
  /**
   * Retrieves the System Status section from Adaptable State
   */
  getSystemStatusState(): SystemStatusState;

  /**
   * Sets a System Status messages.
   *
   * This will appear in the System Status toolbar, tool panel (and popup).
   *
   * Additionally it will colour, as appropriate, the *SystemStatus* button (which is an option to display in the Dashboard)
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
