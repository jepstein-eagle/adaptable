import * as SystemRedux from '../Redux/ActionsReducers/SystemRedux'
import { ApiBase } from "./ApiBase";
import { ISystemStatus } from "./Interface/Interfaces";
import { StatusColour } from "../Utilities/Enums";

export interface ISystemStatusApi {
 
    // System Status
  /**
   * Sets which coloured System Status button is displayed in the Home Toolbar
   * @param statusMessage The message to show when the button is clicked
   * @param statusColour The colour of the buttton - also influences the type of message (i.e. red: error, amber: warning, green: info)
   */
  Set(statusMessage: string, statusColour: "Red" | "Amber" | "Green"): void

  SetRed(statusMessage: string): void
  SetAmber(statusMessage: string): void
  SetGreen(statusMessage: string): void

    /**
   * Clears any System Status messages - and sets teh button to green
   */
  Clear(): void
}



export class SystemStatusApi extends ApiBase implements ISystemStatusApi {

      // System Status api Methods
  public  Set(statusMessage: string, statusColour: "Red" | "Amber" | "Green"): void {
    let systemStatus: ISystemStatus = { StatusMessage: statusMessage, StatusColour: statusColour }
    this.dispatchAction(SystemRedux.SystemSetHealthStatus(systemStatus))
  }
  public  SetRed(statusMessage: string): void {
    let systemStatus: ISystemStatus = { StatusMessage: statusMessage, StatusColour: StatusColour.Red }
    this.dispatchAction(SystemRedux.SystemSetHealthStatus(systemStatus))
  }
  public  SetAmber(statusMessage: string): void {
    let systemStatus: ISystemStatus = { StatusMessage: statusMessage, StatusColour: StatusColour.Amber }
    this.dispatchAction(SystemRedux.SystemSetHealthStatus(systemStatus))
  }
  public  SetGreen(statusMessage: string): void {
    let systemStatus: ISystemStatus = { StatusMessage: statusMessage, StatusColour: StatusColour.Green }
    this.dispatchAction(SystemRedux.SystemSetHealthStatus(systemStatus))
  }

  public  Clear(): void {
    this.dispatchAction(SystemRedux.SystemClearHealthStatus())
  }

}