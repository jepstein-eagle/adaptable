export interface ISystemStatusApi {
  /**
   * Sets which coloured System Status button is displayed in the Home Toolbar
   * @param statusMessage The message to show when the button is clicked
   * @param statusColour The colour of the buttton - also influences the type of message (i.e. red: error, amber: warning, green: info)
   */
  setSystemStatus(statusMessage: string, statusColour: 'Red' | 'Amber' | 'Green' | 'Blue'): void;
  setRedSystemStatus(statusMessage: string): void;
  setAmberSystemStatus(statusMessage: string): void;
  setGreenSystemStatus(statusMessage: string): void;
  setBlueSystemStatus(statusMessage: string): void;
  /**
   * Clears any System Status messages - and sets teh button to green
   */
  clearSystemStatus(): void;
}
