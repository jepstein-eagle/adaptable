import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IActionColumnStrategy } from './Interface/IActionColumnStrategy';
import { ActionColumn } from '../PredefinedConfig/ActionColumnState';

export class ActionColumnStrategy extends AdaptableStrategyBase implements IActionColumnStrategy {
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.ActionColumnStrategyId, adaptable);
  }

  public addActionColumnsToGrid(): void {
    const actionColumns: ActionColumn[] = this.adaptable.api.actionColumnApi.getAllActionColumn();
    this.adaptable.addActionColumnsToGrid(actionColumns);
  }
}
