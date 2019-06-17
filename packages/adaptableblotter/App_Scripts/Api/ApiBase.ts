import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { Action } from 'redux';
import { AdaptableBlotterState } from '../Redux/Store/Interface/IAdaptableStore';
import { LoggingHelper } from '../Utilities/Helpers/LoggingHelper';

// Base class for the API - provides checking dispatching methods
export abstract class ApiBase {
  /**
   * Constructor for all the api classes
   * @param blotter our core IAdaptableBlotter object
   */
  constructor(protected blotter: IAdaptableBlotter) {
    this.blotter = blotter;
  }

  /**
   * Base api Helper method to ensure that the AdaptableBlotterObject being mutated is not null or undefined
   * @param item the AdaptableBlotterObject being checked
   * @param name the name of the object if it has one (e.g. if its a search)
   * @param type the actual type of the object being checked
   */
  public checkItemExists(item: any, name: string, type: string): boolean {
    if (!item) {
      LoggingHelper.LogAdaptableBlotterError('No ' + type + ' found with the name: ' + name);
      return false;
    }
    return true;
  }

  /**
   * Base api Helper method that sends an action to the Store using a Redux Action
   * @param action the Action to be dispatched - uses Redux
   */
  public dispatchAction(action: Action): void {
    this.blotter.adaptableBlotterStore.TheStore.dispatch(action);
  }

  /**
   * Returns the entire State from the Store - a simple 'getState()' call
   */
  public getBlotterState(): AdaptableBlotterState {
    return this.blotter.adaptableBlotterStore.TheStore.getState();
  }
}
