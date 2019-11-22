import { Action } from 'redux';
import { IAdaptableBlotter } from '../../BlotterInterfaces/IAdaptableBlotter';
import { AdaptableBlotterState } from '../../PredefinedConfig/AdaptableBlotterState';
import { LoggingHelper } from '../../Utilities/Helpers/LoggingHelper';

import Helper from '../../Utilities/Helpers/Helper';

// Base class for the API - provides checking dispatching methods
export abstract class ApiBase {
  /**
   * Constructor for all the api classes which simply takes and assigns an instance of the Adaptable Blotter
   * @param blotter the core IAdaptableBlotter object
   */
  constructor(protected blotter: IAdaptableBlotter) {
    this.blotter = blotter;
  }

  /**
   * Base api helper method which ensure that the Adaptable Blotter Object being used in the function is not null or undefined
   *
   * If it does not exist then we log an error and the api method should stop
   * @param item the AdaptableBlotterObject being checked
   * @param name the name of the object if it has one (e.g. if its a search)
   * @param type the actual type of the object being checked
   */
  protected checkItemExists(item: any, name: string, type: string): boolean {
    if (Helper.objectNotExists(item)) {
      LoggingHelper.LogAdaptableBlotterError(`No ${type} found with the name: ${name}`);
      return false;
    }
    return true;
  }

  protected checkArrayExists(array: any): boolean {
    if (!Array.isArray(array)) {
      LoggingHelper.LogAdaptableBlotterError(`Item passed to API function was not an array`);
      return false;
    }
    return true;
  }

  /**
   * Base api Helper method that dispatches a *Redux Action* to the Store
   * @param action the Redux Action to be dispatched
   */
  protected dispatchAction(action: Action): void {
    this.blotter.adaptableBlotterStore.TheStore.dispatch(action);
  }

  /**
   * Returns the entire State from the Store
   *
   * This is a simple *getState()* call
   */
  public getBlotterState(): AdaptableBlotterState {
    return this.blotter.adaptableBlotterStore.TheStore.getState();
  }
}
