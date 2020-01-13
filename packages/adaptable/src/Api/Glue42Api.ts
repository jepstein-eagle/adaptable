import { Glue42State } from '../PredefinedConfig/Glue42State';

/**
 * Provides full and comprehensive run-time access to the Glue42 state.
 *
 */
export interface Glue42Api {
  /**
   * Retrieves the Glue42 section of Adaptable State
   */
  getGlue42State(): Glue42State | undefined;

  isGlue42Available(): boolean;

  isGlue42RunLiveData(): boolean;

  getGlue42ThrottleTime(): number | undefined;

  setGlue42ThrottleTime(throttleTime: number): void;
}
