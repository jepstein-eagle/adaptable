import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { AlertDefinition } from '../../PredefinedConfig/AlertState';
import { AdaptableFunctionName, AdaptableMenuItem } from '../../types';
import { IStrategy } from '../../Strategy/Interface/IStrategy';
import Helper from '../Helpers/Helper';
import { TeamSharingImportInfo } from '../../PredefinedConfig/TeamSharingState';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';

export interface IStrategyService {
  createAlertDescription(alertDefinition: AlertDefinition): string;

  isStrategyAvailable(adaptableFunctionName: AdaptableFunctionName): boolean;

  setStrategiesEntitlements(): void;

  createStrategyFunctionMenus(): void;

  getTeamSharingAction(
    adaptableFunctionName: AdaptableFunctionName
  ): TeamSharingImportInfo<AdaptableObject> | undefined;
}

export class StrategyService implements IStrategyService {
  constructor(private adaptable: IAdaptable) {
    this.adaptable = adaptable;
  }

  public createAlertDescription(alert: AlertDefinition): string {
    return (
      this.adaptable.api.scopeApi.getScopeDescription(alert.Scope) +
      ' ' +
      this.adaptable.api.predicateApi.predicateToString(alert.Predicate)
    );
  }

  public setStrategiesEntitlements(): void {
    this.adaptable.strategies.forEach((strat: IStrategy) => {
      strat.setStrategyEntitlement();
    });
  }

  public createStrategyFunctionMenus(): void {
    const dropdownMenuItems: AdaptableMenuItem[] = [];
    const butonnMenuItems: AdaptableMenuItem[] = [];
    this.adaptable.strategies.forEach((strat: IStrategy) => {
      const dropdownMenuItem: AdaptableMenuItem | undefined = strat.addStrategyMenuItem(
        'FunctionMenu'
      );
      if (Helper.objectExists(dropdownMenuItem)) {
        if (
          dropdownMenuItems.findIndex(m => m.FunctionName == dropdownMenuItem.FunctionName) == -1
        ) {
          dropdownMenuItems.push(dropdownMenuItem);
        }
      }

      const butonnMenuItem: AdaptableMenuItem | undefined = strat.addStrategyMenuItem(
        'FunctionButton'
      );
      if (Helper.objectExists(butonnMenuItem)) {
        if (butonnMenuItems.findIndex(m => m.FunctionName == butonnMenuItem.FunctionName) == -1) {
          butonnMenuItems.push(butonnMenuItem);
        }
      }
    });

    // store the main menu as we will re-use (and it never changes)
    this.adaptable.api.internalApi.setFunctionDropdownMenuItems(dropdownMenuItems);
    this.adaptable.api.internalApi.setFunctionButtonMenuItems(butonnMenuItems);
  }

  public isStrategyAvailable(adaptableFunctionName: AdaptableFunctionName): boolean {
    let strategy: IStrategy | undefined = this.adaptable.strategies.get(adaptableFunctionName);
    if (!strategy) {
      return false;
    }
    return strategy.isStrategyAvailable();
  }

  public getTeamSharingAction(
    adaptableFunctionName: AdaptableFunctionName
  ): TeamSharingImportInfo<AdaptableObject> | undefined {
    let strategy: IStrategy | undefined = this.adaptable.strategies.get(adaptableFunctionName);
    if (!strategy) {
      return undefined;
    }
    return strategy.getTeamSharingAction();
  }
}
