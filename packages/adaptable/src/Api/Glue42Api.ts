import { Glue42State, Glue42Report, Glue42Schedule } from '../PredefinedConfig/Glue42State';

/**
 * Provides full and comprehensive run-time access to the Glue42 Plugin.
 *
 * Use the Api to find out if Glue42 is available or running and much else.
 *
 * Note: as its part of a Plugin you need to access the Api as follows:
 *
 * ```ts
 * const glue42Api = adaptableApi.pluginsApi.getPluginApi('glue42');
 * ```
 *
 * --------------
 *
 *  **Further AdapTable Help Resources**
 *
 * [Glue42 Demo](https://demo.adaptabletools.com/partners/glue42demo/)
 *
 * --------------
 *
 * Note: Some of these methods are intended for internal use only - and have been noted as such.
 */
export interface Glue42Api {
  /**
   * Retrieves the Glue42 section of Adaptable State
   */
  getGlue42State(): Glue42State | undefined;

  /**
   * Returns true if the Glue42 plugin is loaded
   */
  isGlue42Available(): boolean;

  /**
   * Returns true if the Glue42 plugin is loaded AND the user has logged into Glue42
   */
  isGlue42Running(): boolean;

  /**
   * Logs in the User to Glue42 using the given UserName and Password
   * @param userName userName of Glue42 user
   * @param password password of Glue42 user
   */
  loginToGlue42(userName: string, password: string): void;

  /**
   * Logs out the currently logged in User from Glue42
   */
  logoutFromGlue42(): void;

  /**
   * Sets an Error Message returned from Glue42 if login fails
   *
   * For internal use only
   *
   * @param loginErrorMessage errorMessage to display
   */
  setGlue42LoginErrorMessage(loginErrorMessage: string): void;

  /**
   * Retrieves the Throttle time set in Glue42 PluginOptions
   */
  getGlue42ThrottleTime(): number | undefined;

  /**
   * Retrieves the current Live Report
   */
  getCurrentLiveGlue42Report(): Glue42Report | undefined;

  /**
   * Sets Glue42 Availability On
   *
   * For internal use only
   */
  setGlue42AvailableOn(): void;

  /**
   * Sets Glue42 Availability Off
   *
   * For internal use only
   */
  setGlue42AvailableOff(): void;

  /**
   * Sets Glue42 Running On
   *
   * For internal use only
   */
  setGlue42RunningOn(): void;

  /**
   * Sets Glue42 Running Off
   *
   * For internal use only
   */
  setGlue42RunningOff(): void;

  /**
   * Retrieves all the Glue42 Schedules in from the Schedule section of AdapTable State
   */
  getGlue42Schedules(): Glue42Schedule[];

  /**
   * Starts a "Live" report (ie. one which updates as the data ticks)
   *
   * Note: This is not available in AdapTable version 7
   *
   * @param glue42Report report to run in Live Data mode
   */
  startLiveData(glue42Report: Glue42Report): void;

  /**
   * Stops a "Live" report (ie. one which updates as the data ticks)
   *
   * Note: This is not available in AdapTable version 7
   *
   */
  stopLiveData(): void;

  /**
   * Clears all Gluee42 Internal State
   *
   * For internal use only
   */
  clearGlue42InternalState(): void;

  /**
   * Starts a Snapshot as opposed to a Live report
   *
   * Note: This is not available in AdapTable version 7
   *
   * @param glue42Report report to send as a Snapshot
   */
  sendSnapshotToDo(glue42Report: Glue42Report): void;
}
