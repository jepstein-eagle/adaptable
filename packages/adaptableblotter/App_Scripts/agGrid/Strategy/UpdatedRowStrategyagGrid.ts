import { UpdatedRowStrategy } from '../../Strategy/UpdatedRowStrategy';
import { Adaptable } from '../Adaptable';
import { IUpdatedRowStrategy } from '../../Strategy/Interface/IUpdatedRowStrategy';
import { UpdatedRowState } from '../../PredefinedConfig/UpdatedRowState';
import ArrayExtensions from '../../Utilities/Extensions/ArrayExtensions';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { ChangeDirection } from '../../Utilities/Services/Interface/IDataService';

export class UpdatedRowStrategyagGrid extends UpdatedRowStrategy implements IUpdatedRowStrategy {
  constructor(adaptable: Adaptable) {
    super(adaptable);
  }

  public initStyles(): void {
    let columns = this.adaptable.api.gridApi.getColumns();
    let theadaptable = this.adaptable as Adaptable;
    let updatedRowState: UpdatedRowState = this.adaptable.api.updatedRowApi.getUpdatedRowState();
    if (ArrayExtensions.IsNotNullOrEmpty(columns) && updatedRowState.EnableUpdatedRow) {
      for (let column of columns) {
        let cellClassRules: any = {};

        cellClassRules[StyleConstants.UPDATED_ROW_UP_STYLE] = function(params: any) {
          let nodePrimaryKeyValue = theadaptable.getPrimaryKeyValueFromRowNode(params.node);
          return theadaptable.api.internalApi.isRowInUpdatedRowInfo(
            nodePrimaryKeyValue,
            ChangeDirection.Up
          );
        };

        cellClassRules[StyleConstants.UPDATED_ROW_DOWN_STYLE] = function(params: any) {
          let nodePrimaryKeyValue = theadaptable.getPrimaryKeyValueFromRowNode(params.node);
          return theadaptable.api.internalApi.isRowInUpdatedRowInfo(
            nodePrimaryKeyValue,
            ChangeDirection.Down
          );
        };

        cellClassRules[StyleConstants.UPDATED_ROW_NEUTRAL_STYLE] = function(params: any) {
          let nodePrimaryKeyValue = theadaptable.getPrimaryKeyValueFromRowNode(params.node);
          return theadaptable.api.internalApi.isRowInUpdatedRowInfo(
            nodePrimaryKeyValue,
            ChangeDirection.Neutral
          );
        };

        theadaptable.setCellClassRules(cellClassRules, column.ColumnId, 'UpdatedRow');
      }
    }

    // Redraw the adaptable to be on safe side (its rare use case)
    //  this.adaptable.redraw();
  }
}
