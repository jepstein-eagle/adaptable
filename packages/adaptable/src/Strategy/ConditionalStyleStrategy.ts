import { IConditionalStyleStrategy } from './Interface/IConditionalStyleStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { DataChangedInfo } from '../PredefinedConfig/Common/DataChangedInfo';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import * as ConditionalStyleRedux from '../Redux/ActionsReducers/ConditionalStyleRedux';
import { TeamSharingImportInfo } from '../PredefinedConfig/TeamSharingState';
import { ConditionalStyle } from '../PredefinedConfig/ConditionalStyleState';
import { ConditionalStyleSharedEntity } from '../View/ConditionalStyle/ConditionalStyleSharedEntity';
import ArrayExtensions from '../Utilities/Extensions/ArrayExtensions';

export abstract class ConditionalStyleStrategy extends AdaptableStrategyBase
  implements IConditionalStyleStrategy {
  constructor(adaptable: IAdaptable) {
    super(
      StrategyConstants.ConditionalStyleStrategyId,
      StrategyConstants.ConditionalStyleStrategyFriendlyName,
      StrategyConstants.ConditionalStyleGlyph,
      ScreenPopups.ConditionalStylePopup,
      adaptable
    );
  }

  public addColumnMenuItems(column: AdaptableColumn): AdaptableMenuItem[] | undefined {
    if (this.canCreateMenuItem('Full') && !column.IsSparkline) {
      let popupParam: StrategyParams = {
        column: column,
        action: 'New',
        source: 'ColumnMenu',
      };
      return [
        this.createColumnMenuItemShowPopup(
          'Create ' + StrategyConstants.ConditionalStyleStrategyFriendlyName,
          ScreenPopups.ConditionalStylePopup,
          StrategyConstants.ConditionalStyleGlyph,
          popupParam
        ),
      ];
    }
  }

  public getTeamSharingAction(): TeamSharingImportInfo<ConditionalStyle> {
    return {
      FunctionEntities: this.adaptable.api.conditionalStyleApi.getAllConditionalStyle(),
      AddAction: ConditionalStyleRedux.ConditionalStyleAdd,
      EditAction: ConditionalStyleRedux.ConditionalStyleEdit,
    };
  }

  public getSharedQueryReferences(sharedQueryId: string): string | undefined {
    const conditionalStyles: ConditionalStyle[] = this.adaptable.api.conditionalStyleApi
      .getAllConditionalStyle()
      .filter(cs => cs.SharedQueryId == sharedQueryId);

    return ArrayExtensions.IsNotNullOrEmpty(conditionalStyles)
      ? conditionalStyles.length + ' Conditional Styles'
      : undefined;
  }

  public getSpecialColumnReferences(specialColumnId: string, references: string[]): void {
    const abColumn: AdaptableColumn = this.adaptable.api.columnApi.getColumnFromId(specialColumnId);
    let conditionalStyles: ConditionalStyle[] = this.adaptable.api.conditionalStyleApi
      .getAllConditionalStyle()
      .filter((cs: ConditionalStyle) =>
        this.adaptable.api.scopeApi.isColumnInScopeColumns(abColumn, cs.Scope)
      );
    if (ArrayExtensions.IsNotNullOrEmpty(conditionalStyles)) {
      references.push(conditionalStyles.length + ' Conditional Styles');
    }
  }

  public abstract initStyles(): void;
}
