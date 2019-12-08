import { ApiBase } from './ApiBase';
import * as ApplicationRedux from '../../Redux/ActionsReducers/ApplicationRedux';

import {
  ApplicationToolbarButton,
  ApplicationState,
  ApplicationDataEntry,
} from '../../PredefinedConfig/ApplicationState';
import { ApplicationApi } from '../ApplicationAPI';

export class ApplicationApiImpl extends ApiBase implements ApplicationApi {
  public getApplicationState(): ApplicationState {
    return this.getBlotterState().Application;
  }

  public getApplicationToolbarButtons(): ApplicationToolbarButton[] {
    return this.getApplicationState().ApplicationToolbarButtons;
  }

  /**
   * Renders the Application Toolbar with the element it is given.
   *
   * @param element the element to be rendered - presumably a <div> but can be anything which is easily renderable.
   */
  public getApplicationToolbarContentsDivId(): string {
    return 'ab-ApplicationToolbar__contents';
  }

  public getApplicationToolbarContentsDiv(): HTMLElement | null {
    return document.getElementById(this.getApplicationToolbarContentsDivId());
  }

  public getApplicationDataEntries(): ApplicationDataEntry[] {
    return this.getApplicationState().ApplicationDataEntries;
  }

  public addApplicationDataEntry(keyValuePair: ApplicationDataEntry): void {
    this.dispatchAction(ApplicationRedux.ApplicationDataEntryAdd(keyValuePair));
  }

  public createApplicationDataEntry(key: string, value: any): void {
    let applicationDataEntry: ApplicationDataEntry = {
      Key: key,
      Value: value,
    };
    this.addApplicationDataEntry(applicationDataEntry);
  }

  public editApplicationDataEntry(applicationDataEntry: ApplicationDataEntry): void {
    this.dispatchAction(ApplicationRedux.ApplicationDataEntryEdit(applicationDataEntry));
  }

  public deleteApplicationDataEntry(applicationDataEntry: ApplicationDataEntry): void {
    this.dispatchAction(ApplicationRedux.ApplicationDataEntryDelete(applicationDataEntry));
  }

  public getApplicationDataEntryByKey(key: string): ApplicationDataEntry | undefined {
    let entries = this.getApplicationState().ApplicationDataEntries;
    return entries.find(e => e.Key === key);
  }

  public getApplicationDataEntriesByValue(value: any): ApplicationDataEntry[] {
    let entries = this.getApplicationState().ApplicationDataEntries;
    return entries.filter(e => e.Value === value);
  }

  public SetApplicationToolbarTitle(title: string): void {
    this.dispatchAction(ApplicationRedux.ApplicationSetApplicationToolbarTitle(title));
  }
}
