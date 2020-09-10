import { ICellValidationStrategy } from './Interface/ICellValidationStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import * as CellValidationRedux from '../Redux/ActionsReducers/CellValidationRedux';
import { TeamSharingImportInfo } from '../PredefinedConfig/TeamSharingState';
import { CellValidationRule } from '../PredefinedConfig/CellValidationState';
import ArrayExtensions from '../Utilities/Extensions/ArrayExtensions';

export class CellValidationStrategy extends AdaptableStrategyBase
  implements ICellValidationStrategy {
  constructor(adaptable: IAdaptable) {
    super(
      StrategyConstants.CellValidationStrategyId,
      StrategyConstants.CellValidationStrategyFriendlyName,
      StrategyConstants.CellValidationGlyph,
      ScreenPopups.CellValidationPopup,
      adaptable
    );
  }

  public addColumnMenuItems(column: AdaptableColumn): AdaptableMenuItem[] | undefined {
    if (this.canCreateMenuItem('Full') && !column.ReadOnly) {
      let popupParam: StrategyParams = {
        column: column,
        action: 'New',
        source: 'ColumnMenu',
      };
      return [
        this.createColumnMenuItemShowPopup(
          'Create Cell Validation Rule',
          ScreenPopups.CellValidationPopup,
          StrategyConstants.CellValidationGlyph,
          popupParam
        ),
      ];
    }
  }

  public getTeamSharingAction(): TeamSharingImportInfo<CellValidationRule> {
    return {
      FunctionEntities: this.adaptable.api.cellValidationApi.getAllCellValidation(),
      AddAction: CellValidationRedux.CellValidationAdd,
      EditAction: CellValidationRedux.CellValidationEdit,
    };
  }

  public getSpecialColumnReferences(specialColumnId: string, references: string[]): void {
    const abColumn: AdaptableColumn = this.adaptable.api.columnApi.getColumnFromId(specialColumnId);
    let cellValidations: CellValidationRule[] = this.adaptable.api.cellValidationApi
      .getAllCellValidation()
      .filter((cs: CellValidationRule) =>
        this.adaptable.api.scopeApi.isColumnInScopeColumns(abColumn, cs.Scope)
      );

    if (ArrayExtensions.IsNotNullOrEmpty(cellValidations)) {
      references.push(cellValidations.length + ' Cell Validations');
    }
  }
}
