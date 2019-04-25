import { ApiBase } from "./ApiBase";
import { ISystemApi } from './Interface/ISystemApi';
import { SystemState } from '../Redux/ActionsReducers/Interface/IState';
import { ICalendar } from "../Utilities/Interface/BlotterObjects/ICalendar";

export class SystemApi extends ApiBase implements ISystemApi {


  public GetState(): SystemState {
    return this.getBlotterState().System;
  }

  public GetAvailableCalendars(): ICalendar[] {
    return this.GetState().AvailableCalendars;
  }

}