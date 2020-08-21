import { Action } from 'redux';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { LoggingHelper } from '../../Utilities/Helpers/LoggingHelper';

import Helper from '../../Utilities/Helpers/Helper';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';
import { AccessLevel } from '../../PredefinedConfig/EntitlementState';

// Base class for the Api - provides checking dispatching methods
export abstract class ApiBase {
  /**
   * Constructor for all the api classes which simply takes and assigns an instance of Adaptable
   * @param adaptable the core IAdaptable object
   */
  constructor(protected adaptable: IAdaptable) {
    this.adaptable = adaptable;
  }

  /**
   * Base api helper method which ensure that Adaptable Object being used in the function is not null or undefined
   *
   * If it does not exist then we log an error and the api method should stop
   * @param item AdaptableObject being checked
   * @param name the name of the object if it has one (e.g. if its a search)
   * @param type the actual type of the object being checked
   */
  protected checkItemExists(item: any, name: string, type: string): boolean {
    if (Helper.objectNotExists(item)) {
      LoggingHelper.LogAdaptableError(`No ${type} found with the name: ${name}`);
      return false;
    }
    return true;
  }

  protected checkArrayExists(array: any): boolean {
    if (!Array.isArray(array)) {
      LoggingHelper.LogAdaptableError(`Item passed to Api function was not an array`);
      return false;
    }
    return true;
  }

  protected isCorrectlyEntitled(
    functionName: AdaptableFunctionName,
    minimumAccessLevel: AccessLevel,
    actionDescripton?: string
  ): boolean {
    const currentAccessLevel: AccessLevel = this.adaptable.api.entitlementsApi.getEntitlementAccessLevelByAdaptableFunctionName(
      functionName
    );
    if (minimumAccessLevel == 'Full' && currentAccessLevel == 'Full') {
      return true;
    }

    if (
      minimumAccessLevel == 'ReadOnly' &&
      (currentAccessLevel == 'Full' || currentAccessLevel == 'ReadOnly')
    ) {
      return true;
    }
    const actionText: string = actionDescripton
      ? 'action: "' + actionDescripton + '"'
      : 'api action';
    LoggingHelper.LogAdaptableWarning(
      'Cannot perform ' +
        actionText +
        ' as user has Entitlement of "' +
        currentAccessLevel +
        '" for function: "' +
        functionName +
        '"'
    );
    return false;
  }

  /**
   * Base api Helper method that dispatches a *Redux Action* to the Store
   * @param action the Redux Action to be dispatched
   */
  protected dispatchAction(action: Action): void {
    this.adaptable.AdaptableStore.TheStore.dispatch(action);
  }

  /**
   * Returns the entire State from the Store
   *
   * This is a simple *getState()* call
   */
  public getAdaptableState(): AdaptableState {
    return this.adaptable.AdaptableStore.TheStore.getState();
  }
}
