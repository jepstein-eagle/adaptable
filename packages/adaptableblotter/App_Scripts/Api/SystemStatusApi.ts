import { SystemStatusState } from '../PredefinedConfig/SystemStatusState';

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
   * The (optional) statusFurtherInformation allows further details to be provided if required.
   */
  setInfoSystemStatus(statusMessage: string, statusFurtherInformation?: string): void;
  /**
   * Clears any System Status messages (and sets the type to the default type - 'success' unless overriden)
   */
  clearSystemStatus(): void;

  /**
   * Opens the System Status popup
   */
  showSystemStatusPopup(): void;
}
