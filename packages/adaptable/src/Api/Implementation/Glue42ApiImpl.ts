import { ApiBase } from './ApiBase';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import * as Glue42Redux from '../../Redux/ActionsReducers/Glue42Redux';
import { Glue42State, Glue42Report, Glue42Schedule } from '../../PredefinedConfig/Glue42State';
import { Glue42Api } from '../Glue42Api';

export class Glue42ApiImpl extends ApiBase implements Glue42Api {
  public getGlue42State(): Glue42State | undefined {
    return this.getAdaptableState().Glue42;
  }

  public isGlue42Running(): boolean {
    let glue42State: Glue42State = this.getGlue42State();
    if (glue42State) {
      return glue42State.IsGlue42Running;
    }
    return false;
  }

  public isGlue42Available(): boolean {
    return this.getAdaptableState().Glue42.IsGlue42Available;
  }

  public getGlue42ThrottleTime(): number | undefined {
    return this.getGlue42State().ThrottleTime;
  }

  public setGlue42ThrottleTime(throttleTime: number): void {
    this.dispatchAction(Glue42Redux.Glue42SetThrottleTime(throttleTime));
  }

  public getCurrentLiveGlue42Report(): Glue42Report | undefined {
    return undefined;
  }

  public setGlue42AvailableOn(): void {
    this.dispatchAction(Glue42Redux.SetGlue42AvailableOn());
  }

  public setGlue42AvailableOff(): void {
    this.dispatchAction(Glue42Redux.SetGlue42AvailableOff());
  }

  public getGlue42Schedules(): Glue42Schedule[] {
    return this.getGlue42State()!.Glue42Schedules;
  }

  public showGlue42Popup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.Glue42StrategyId,
      ScreenPopups.Glue42Popup
    );
  }
}
