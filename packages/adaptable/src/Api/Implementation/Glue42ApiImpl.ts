import { ApiBase } from './ApiBase';
import * as Glue42Redux from '../../Redux/ActionsReducers/Glue42Redux';
import { Glue42State } from '../../PredefinedConfig/Glue42State';
import { Glue42Api } from '../Glue42Api';

export class Glue42ApiImpl extends ApiBase implements Glue42Api {
  public getGlue42State(): Glue42State | undefined {
    return this.getAdaptableState().Glue42;
  }

  public isGlue42RunLiveData(): boolean {
    let glue42State: Glue42State = this.getGlue42State();
    if (glue42State) {
      return glue42State.RunLiveData;
    }
    return false;
  }

  public isGlue42Available(): boolean {
    return this.getAdaptableState().Grid.IsGlue42Available;
  }

  public getGlue42ThrottleTime(): number | undefined {
    return this.getGlue42State().ThrottleTime;
  }

  public setGlue42ThrottleTime(throttleTime: number): void {
    this.dispatchAction(Glue42Redux.Glue42SetThrottleTime(throttleTime));
  }
}
