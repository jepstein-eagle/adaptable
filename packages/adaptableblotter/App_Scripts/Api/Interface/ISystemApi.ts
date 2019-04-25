import { SystemState } from "../../Redux/ActionsReducers/Interface/IState";
import { ICalendar } from "../../Utilities/Interface/BlotterObjects/ICalendar";
export interface ISystemApi {
  GetState(): SystemState;
  GetAvailableCalendars(): ICalendar[];
 
}
