import * as SystemRedux from '../Redux/ActionsReducers/SystemRedux'
import { ApiBase } from "./ApiBase";
import { StatusColour } from "../Utilities/Enums";
import { ISystemStatusApi } from './Interface/ISystemStatusApi';
import { ISystemStatus } from "../Utilities/Interface/ISystemStatus";

export class SystemStatusApi extends ApiBase implements ISystemStatusApi {

      // System Status api Methods
  public  Set(statusMessage: string, statusColour: "Blue"| "Red" | "Amber" | "Green"): void {
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
  public  SeBlue(statusMessage: string): void {
    let systemStatus: ISystemStatus = { StatusMessage: statusMessage, StatusColour: StatusColour.Blue }
    this.dispatchAction(SystemRedux.SystemSetHealthStatus(systemStatus))
  }

  public  Clear(): void {
    this.dispatchAction(SystemRedux.SystemClearHealthStatus())
  }

}