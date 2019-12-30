import { SystemStatusState } from '../PredefinedConfig/SystemStatusState';

/**
 * Provides access to the System Status function and associated System Status state.
 *
 * The System Status function allows you to send a message
 *
 *  **Further Resources**
 *
 * [Demo Site](https://demo.adaptableblotter.com/search/aggridadvancedsearchdemo/) | [State](_predefinedconfig_advancedsearchstate_.advancedsearchstate.html) | [FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360029895971-Advanced-Search-FAQ) | [Videos](https://adaptabletools.zendesk.com/hc/en-us/articles/360028637652-Advanced-Search-Videos) | [User Guide](https://adaptabletools.zendesk.com/hc/en-us/articles/360002755137-Search-Functions)
 *
 */
export interface SystemStatusApi {
  /**
   * Retrieves the System Status section from the Adaptable Blotter State
   */
  getSystemStatusState(): SystemStatusState;

  /**
   * Sets s System Status messages.
   *
   * This will appear in the System Status toolbar (and popup).
   *
   * Additionally it will colour, as appropriate, the 'SystemStatus' button which coloured System Status button in the Home Toolbar
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
