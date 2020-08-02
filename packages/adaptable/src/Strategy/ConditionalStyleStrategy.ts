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
    super(StrategyConstants.ConditionalStyleStrategyId, adaptable);
    this.adaptable.DataService.on('DataChanged', (dataChangedInfo: DataChangedInfo) => {
      this.handleDataSourceChanged(dataChangedInfo);
    });
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    if (this.canCreateMenuItem('ReadOnly')) {
      return this.createMainMenuItemShowPopup({
        Label: StrategyConstants.ConditionalStyleStrategyFriendlyName,
        ComponentName: ScreenPopups.ConditionalStylePopup,
        Icon: StrategyConstants.ConditionalStyleGlyph,
      });
    }
  }

  public addColumnMenuItems(column: AdaptableColumn): AdaptableMenuItem[] | undefined {
    if (this.canCreateMenuItem('Full') && !column.IsSparkline) {
      let popupParam: StrategyParams = {
        columnId: column.ColumnId,
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

  public getSpecialColumnReferences(specialColumnId: string): string | undefined {
    let conditionalStyles: ConditionalStyle[] = this.adaptable.api.conditionalStyleApi
      .getAllConditionalStyle()
      .filter((cs: ConditionalStyle) => cs.ColumnId == specialColumnId);

    return ArrayExtensions.IsNotNullOrEmpty(conditionalStyles)
      ? conditionalStyles.length + ' Conditional Styles'
      : undefined;
  }

  // Called when a single piece of data changes, ie. usually the result of an inline edit
  protected abstract handleDataSourceChanged(dataChangedEvent: DataChangedInfo): void;

  public abstract initStyles(): void;
}
