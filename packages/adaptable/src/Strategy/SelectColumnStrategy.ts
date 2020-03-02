import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import * as GridRedux from '../Redux/ActionsReducers/GridRedux';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { ISelectColumnStrategy } from './Interface/ISelectColumnStrategy';
import { AdaptableColumn } from '../types';

export class SelectColumnStrategy extends AdaptableStrategyBase implements ISelectColumnStrategy {
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.StateManagementStrategyId, adaptable);
  }

  public addColumnMenuItems(column: AdaptableColumn): AdaptableMenuItem[] | undefined {
    if (this.canCreateMenuItem('Full')) {
      return [
        this.createColumnMenuItemReduxAction(
          'Select Column',
          'tab-unselected',
          GridRedux.GridSelectColumn(column.ColumnId)
        ),
      ];
    }
  }
}
