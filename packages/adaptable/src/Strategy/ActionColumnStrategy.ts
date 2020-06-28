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
    this.adaptable.api.actionColumnApi.getAllActionColumn().forEach((ac: ActionColumn) => {
      this.adaptable.addActionColumnToGrid(ac);
    });
  }
}
