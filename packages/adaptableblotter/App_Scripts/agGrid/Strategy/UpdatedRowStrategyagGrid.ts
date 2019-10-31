import { UpdatedRowStrategy } from '../../Strategy/UpdatedRowStrategy';
import { AdaptableBlotter } from '../AdaptableBlotter';
import { IUpdatedRowStrategy } from '../../Strategy/Interface/IUpdatedRowStrategy';
import { UpdatedRowState } from '../../PredefinedConfig/RunTimeState/UpdatedRowState';
import ArrayExtensions from '../../Utilities/Extensions/ArrayExtensions';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { ChangeDirection } from '../../Utilities/Services/Interface/IDataService';

export class UpdatedRowStrategyagGrid extends UpdatedRowStrategy implements IUpdatedRowStrategy {
  constructor(blotter: AdaptableBlotter) {
    super(blotter);
  }

  public initStyles(): void {
    let columns = this.blotter.api.gridApi.getColumns();
    let theBlotter = this.blotter as AdaptableBlotter;
    let updatedRowState: UpdatedRowState = this.blotter.api.updatedRowApi.getUpdatedRowState();
    if (ArrayExtensions.IsNotNullOrEmpty(columns) && updatedRowState.EnableUpdatedRow) {
      for (let column of columns) {
        let cellClassRules: any = {};

        cellClassRules[StyleConstants.UPDATED_ROW_UP_STYLE] = function(params: any) {
          let nodePrimaryKeyValue = theBlotter.getPrimaryKeyValueFromRowNode(params.node);
          return theBlotter.api.internalApi.isRowInUpdatedRowInfo(
            nodePrimaryKeyValue,
            ChangeDirection.Up
          );
        };

        cellClassRules[StyleConstants.UPDATED_ROW_DOWN_STYLE] = function(params: any) {
          let nodePrimaryKeyValue = theBlotter.getPrimaryKeyValueFromRowNode(params.node);
          return theBlotter.api.internalApi.isRowInUpdatedRowInfo(
            nodePrimaryKeyValue,
            ChangeDirection.Down
          );
        };

        cellClassRules[StyleConstants.UPDATED_ROW_NEUTRAL_STYLE] = function(params: any) {
          let nodePrimaryKeyValue = theBlotter.getPrimaryKeyValueFromRowNode(params.node);
          return theBlotter.api.internalApi.isRowInUpdatedRowInfo(
            nodePrimaryKeyValue,
            ChangeDirection.Neutral
          );
        };

        theBlotter.setCellClassRules(cellClassRules, column.ColumnId, 'UpdatedRow');
      }
    }

    // Redraw the Blotter to be on safe side (its rare use case)
    //  this.blotter.redraw();
  }
}
