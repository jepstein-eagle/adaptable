export interface ISystemStatusApi {
  
  /**
   * Sets which coloured System Status button is displayed in the Home Toolbar
   * @param statusMessage The message to show when the button is clicked
   * @param statusColour The colour of the buttton - also influences the type of message (i.e. red: error, amber: warning, green: info)
   */
  Set(statusMessage: string, statusColour: "Red" | "Amber" | "Green"|"Blue"): void;
  SetRed(statusMessage: string): void;
  SetAmber(statusMessage: string): void;
  SetGreen(statusMessage: string): void;
  SetBlue(statusMessage: string): void;
  /**
 * Clears any System Status messages - and sets teh button to green
 */
  Clear(): void;
}
