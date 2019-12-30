import { ApplicationState, ApplicationDataEntry } from '../PredefinedConfig/ApplicationState';
/**
 * Provides an `ApplicationDataEntry` array allowing developers to store their own data in Adaptable State (as Key / Value Pairs).
 *
 *  **Further Resources**
 *
 * [State](_predefinedconfig_applicationstate_.applicationstate.html) | [FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360008819192-Adaptable-Blotter-State-FAQ)
 *
 */
export interface ApplicationApi {
  /**
   * Retrieves the Application section from Adaptable State
   */
  getApplicationState(): ApplicationState;

  /**
   * Retrieves all the Key Value Pairs in the Application state
   */
  getApplicationDataEntries(): ApplicationDataEntry[];

  /**
   * Adds a new Application Data Entry
   *
   * @param applicationDataEntry Application Data Entry to add
   */
  addApplicationDataEntry(applicationDataEntry: ApplicationDataEntry): void;

  /**
   * Creates a new Application Data Entry with the given key and value
   *
   * @param key the Application Data Entry key
   *
   * @param value the Application Data Entry value
   */
  createApplicationDataEntry(key: string, value: any): void;

  /**
   * Edits a given Application Data Entry
   *
   * @param applicationDataEntry Application Data Entry to edit
   */
  editApplicationDataEntry(applicationDataEntry: ApplicationDataEntry): void;

  /**
   * Deletes a given Application Data Entry
   *
   * @param applicationDataEntry Application Data Entry to delete
   */
  deleteApplicationDataEntry(applicationDataEntry: ApplicationDataEntry): void;

  /**
   * Gets the Application Data Entry which has the given key
   *
   * @param key the Key of the Application Data Entry to retrieve
   */
  getApplicationDataEntryByKey(key: string): ApplicationDataEntry | undefined;

  /**
   * Gets the Application Data Entry which has the given value
   *
   * @param value the Value of the Application Data Entry to retrieve
   */
  getApplicationDataEntriesByValue(value: any): ApplicationDataEntry[];
}
