export interface ISystemStatusApi {
  /**
   * Sets which coloured System Status button is displayed in the Home Toolbar
   * @param statusMessage The message to show when the button is clicked
   * @param messageType the type of message - which will also influence the colour of the button shown (i.e. red: error, amber: warning, green: info)
   */
  setSystemStatus(
    statusMessage: string,
    messageType: 'Error' | 'Warning' | 'Success' | 'Info'
  ): void;

  /**
   * Sets System Status to ERROR with an accompany message to display when the button is clicked.
   * @param statusMessage The message to show when the button is clicked
   */
  setErrorSystemStatus(statusMessage: string): void;

  /**
   * Sets System Status to WARNING with an accompany message to display when the button is clicked.
   * @param statusMessage The message to show when the button is clicked
   */
  setWarningSystemStatus(statusMessage: string): void;

  /**
   * Sets System Status to SUCCESS with an accompany message to display when the button is clicked.
   * @param statusMessage The message to show when the button is clicked
   */
  setSuccessSystemStatus(statusMessage: string): void;

  /**
   * Sets System Status to INFO with an accompany message to display when the button is clicked.
   * @param statusMessage The message to show when the button is clicked
   */
  setInfoSystemStatus(statusMessage: string): void;
  /**
   * Clears any System Status messages (and sets the button to green)
   */
  clearSystemStatus(): void;
}
