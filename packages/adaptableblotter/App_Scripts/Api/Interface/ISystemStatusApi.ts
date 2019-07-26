export interface ISystemStatusApi {
  /**
   * Sets which coloured System Status button is displayed in the Home Toolbar
   * @param statusMessage The message to show when the button is clicked
   * @param messageType The colour of the button - also influences the type of message (i.e. red: error, amber: warning, green: info)
   */

  setSystemStatus(
    statusMessage: string,
    messageType: 'Error' | 'Warning' | 'Success' | 'Info'
  ): void;
  setErrorSystemStatus(statusMessage: string): void;
  setWarningSystemStatus(statusMessage: string): void;
  setSuccessSystemStatus(statusMessage: string): void;
  setInfoSystemStatus(statusMessage: string): void;
  /**
   * Clears any System Status messages (and sets the button to green)
   */
  clearSystemStatus(): void;
}
