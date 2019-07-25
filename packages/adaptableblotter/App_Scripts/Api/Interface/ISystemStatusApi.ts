import { StatusColour } from '../../PredefinedConfig/Common/Enums';

export interface ISystemStatusApi {
  /**
   * Sets which coloured System Status button is displayed in the Home Toolbar
   * @param statusMessage The message to show when the button is clicked
   * @param statusColour The colour of the button - also influences the type of message (i.e. red: error, amber: warning, green: info)
   */

  // this did work but now system status colour returns a var colour so need to look at it

  // setSystemStatus(statusMessage: string, statusColour: 'Red' | 'Amber' | 'Green' | 'Blue'): void;
  setSystemStatus(statusMessage: string, statusColour: StatusColour): void;
  setRedSystemStatus(statusMessage: string): void;
  setAmberSystemStatus(statusMessage: string): void;
  setGreenSystemStatus(statusMessage: string): void;
  setBlueSystemStatus(statusMessage: string): void;
  /**
   * Clears any System Status messages (and sets the button to green)
   */
  clearSystemStatus(): void;
}
