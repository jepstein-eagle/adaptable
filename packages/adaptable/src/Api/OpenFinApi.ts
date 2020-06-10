import { OpenFinState, OpenFinReport, OpenFinSchedule } from '../PredefinedConfig/OpenFinState';

/**
 * Provides full and comprehensive run-time access to the OpenFin state.
 *
 */
export interface OpenFinApi {
  /**
   * Retrieves the OpenFin section of Adaptable State
   */
  getOpenFinState(): OpenFinState | undefined;

  isOpenFinAvailable(): boolean;

  isOpenFinRunning(): boolean;

  getOpenFinThrottleTime(): number | undefined;

  getCurrentLiveOpenFinReport(): OpenFinReport | undefined;

  setOpenFinAvailableOn(): void;

  setOpenFinAvailableOff(): void;

  setOpenFinRunningOn(): void;

  setOpenFinRunningOff(): void;

  getOpenFinSchedules(): OpenFinSchedule[];

  startLiveData(OpenFinReport: OpenFinReport): void;

  stopLiveData(): void;

  clearOpenFinInternalState(): void;
}
