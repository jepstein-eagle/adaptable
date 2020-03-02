import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import * as GridRedux from '../Redux/ActionsReducers/GridRedux';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { IHideColumnStrategy } from './Interface/IHideColumnStrategy';
import { AdaptableColumn } from '../types';

export class HideColumnStrategy extends AdaptableStrategyBase implements IHideColumnStrategy {
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.StateManagementStrategyId, adaptable);
  }

  public addColumnMenuItems(column: AdaptableColumn): AdaptableMenuItem[] | undefined {
    if (this.canCreateMenuItem('Full')) {
      return [
        this.createColumnMenuItemReduxAction(
          'Hide Column',
          'hide-column',
          GridRedux.GridHideColumn(column.ColumnId)
        ),
      ];
    }
  }
}
