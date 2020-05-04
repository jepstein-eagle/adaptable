import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { ICalculatedColumnStrategy } from './Interface/ICalculatedColumnStrategy';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import * as CalculatedColumnRedux from '../Redux/ActionsReducers/CalculatedColumnRedux';
import { TeamSharingImportInfo } from '../PredefinedConfig/TeamSharingState';
import {
  CalculatedColumn,
  CalculatedColumnSettings,
} from '../PredefinedConfig/CalculatedColumnState';
import { DataType } from '../PredefinedConfig/Common/Enums';

export class CalculatedColumnStrategy extends AdaptableStrategyBase
  implements ICalculatedColumnStrategy {
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.CalculatedColumnStrategyId, adaptable);
  }

  public addCalculatedColumnsToGrid(): void {
    this.adaptable.api.calculatedColumnApi.getAllCalculatedColumn().forEach(cc => {
      let hasChanged: boolean = false;

      let dataType: 'String' | 'Number' | 'Boolean' | 'Date';
      let filterable: boolean;
      let resizable: boolean;
      let groupable: boolean;
      let sortable: boolean;
      let pivotable: boolean;
      let aggregatable: boolean;

      if (cc.CalculatedColumnSettings == null || cc.CalculatedColumnSettings.DataType == null) {
        const cleanedExpression: string = this.adaptable.CalculatedColumnExpressionService.CleanExpressionColumnNames(
          cc.ColumnExpression,
          this.adaptable.api.gridApi.getColumns()
        );
        dataType = this.adaptable.CalculatedColumnExpressionService.GetCalculatedColumnDataType(
          cleanedExpression
        );
        hasChanged = true;
      } else {
        dataType = cc.CalculatedColumnSettings.DataType;
      }
      if (cc.CalculatedColumnSettings == null || cc.CalculatedColumnSettings.Filterable == null) {
        filterable = true;
        hasChanged = true;
      } else {
        filterable = cc.CalculatedColumnSettings.Filterable;
      }
      if (cc.CalculatedColumnSettings == null || cc.CalculatedColumnSettings.Resizable == null) {
        resizable = true;
        hasChanged = true;
      } else {
        resizable = cc.CalculatedColumnSettings.Resizable;
      }
      if (cc.CalculatedColumnSettings == null || cc.CalculatedColumnSettings.Groupable == null) {
        groupable = true;
        hasChanged = true;
      } else {
        groupable = cc.CalculatedColumnSettings.Groupable;
      }
      if (cc.CalculatedColumnSettings == null || cc.CalculatedColumnSettings.Sortable == null) {
        sortable = true;
        hasChanged = true;
      } else {
        sortable = cc.CalculatedColumnSettings.Sortable;
      }
      if (cc.CalculatedColumnSettings == null || cc.CalculatedColumnSettings.Pivotable == null) {
        pivotable = dataType == DataType.String;
        hasChanged = true;
      } else {
        pivotable = cc.CalculatedColumnSettings.Pivotable;
      }
      if (cc.CalculatedColumnSettings == null || cc.CalculatedColumnSettings.Aggregatable == null) {
        aggregatable = dataType == DataType.Number;
        hasChanged = true;
      } else {
        aggregatable = cc.CalculatedColumnSettings.Aggregatable;
      }
      if (hasChanged) {
        cc.CalculatedColumnSettings = {
          DataType: dataType,
          Filterable: filterable,
          Resizable: resizable,
          Groupable: groupable,
          Sortable: sortable,
          Pivotable: pivotable,
          Aggregatable: aggregatable,
        };
        this.adaptable.api.calculatedColumnApi.editCalculatedColumn(cc);
      }
    });

    this.adaptable.api.calculatedColumnApi.getAllCalculatedColumn().forEach(cc => {
      this.adaptable.addCalculatedColumnToGrid(cc);
    });
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    if (this.canCreateMenuItem('ReadOnly')) {
      return this.createMainMenuItemShowPopup({
        Label: StrategyConstants.CalculatedColumnStrategyFriendlyName,
        ComponentName: ScreenPopups.CalculatedColumnPopup,
        Icon: StrategyConstants.CalculatedColumnGlyph,
      });
    }
  }

  public addColumnMenuItems(column: AdaptableColumn): AdaptableMenuItem[] | undefined {
    if (this.canCreateMenuItem('Full')) {
      if (
        this.adaptable.api.calculatedColumnApi
          .getAllCalculatedColumn()
          .find(cc => cc.ColumnId == column.ColumnId)
      ) {
        let popupParam: StrategyParams = {
          columnId: column.ColumnId,
          action: 'Edit',
          source: 'ColumnMenu',
        };

        return [
          this.createColumnMenuItemShowPopup(
            'Edit ' + StrategyConstants.CalculatedColumnStrategyFriendlyName,
            ScreenPopups.CalculatedColumnPopup,
            StrategyConstants.CalculatedColumnGlyph,
            popupParam
          ),
        ];
      }
    }
  }

  public getTeamSharingAction(): TeamSharingImportInfo<CalculatedColumn> {
    return {
      FunctionEntities: this.adaptable.api.calculatedColumnApi.getAllCalculatedColumn(),
      AddAction: CalculatedColumnRedux.CalculatedColumnAdd,
      EditAction: CalculatedColumnRedux.CalculatedColumnEdit,
    };
  }
}
