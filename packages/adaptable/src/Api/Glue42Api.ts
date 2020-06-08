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

  loginToGlue42(userName: string, password: string): void;

  logoutFromGlue42(): void;

  setGlue42LoginErrorMessage(loginErrorMessage: string): void;

  getGlue42ThrottleTime(): number | undefined;

  setGlue42ThrottleTime(throttleTime: number): void;

  getCurrentLiveGlue42Report(): Glue42Report | undefined;

  setGlue42AvailableOn(): void;

  setGlue42AvailableOff(): void;

  setGlue42RunningOn(): void;

  setGlue42RunningOff(): void;

  getGlue42Schedules(): Glue42Schedule[];

  startLiveData(glue42Report: Glue42Report): void;

  stopLiveData(): void;

  clearGlue42InternalState(): void;

  sendSnapshotToDo(glue42Report: Glue42Report): void;
}
