import { Glue42State, Glue42Report, Glue42Schedule } from '../PredefinedConfig/Glue42State';

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

  isGlue42Running(): boolean;

  getGlue42ThrottleTime(): number | undefined;

  setGlue42ThrottleTime(throttleTime: number): void;

  getCurrentLiveGlue42Report(): Glue42Report | undefined;

  setGlue42AvailableOn(): void;

  setGlue42AvailableOff(): void;

  getGlue42Schedules(): Glue42Schedule[];
}
