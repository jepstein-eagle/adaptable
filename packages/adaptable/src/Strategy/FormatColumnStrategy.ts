import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { IFormatColumnStrategy } from './Interface/IFormatColumnStrategy';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import { TeamSharingImportInfo } from '../PredefinedConfig/TeamSharingState';
import * as FormatColumnRedux from '../Redux/ActionsReducers/FormatColumnRedux';
import { FormatColumn } from '../PredefinedConfig/FormatColumnState';

export abstract class FormatColumnStrategy extends AdaptableStrategyBase
  implements IFormatColumnStrategy {
  constructor(adaptable: IAdaptable) {
    super(
      StrategyConstants.FormatColumnStrategyId,
      StrategyConstants.FormatColumnStrategyFriendlyName,
      StrategyConstants.FormatColumnGlyph,
      ScreenPopups.FormatColumnPopup,
      adaptable
    );

    adaptable.adaptableStore.onAny((eventName: string) => {
      if (
        eventName == FormatColumnRedux.FORMAT_COLUMN_ADD ||
        eventName == FormatColumnRedux.FORMAT_COLUMN_EDIT ||
        eventName == FormatColumnRedux.FORMAT_COLUMN_DELETE
      ) {
        this.adaptable.applyFormatColumnDisplayFormats();
        this.adaptable.redraw();
      }
    });
  }

  public addColumnMenuItems(column: AdaptableColumn): AdaptableMenuItem[] | undefined {
    if (this.canCreateMenuItem('Full') && !column.IsSparkline) {
      let formatExists: boolean = false; // need some way of working out whether to edit or not, until then wont bother

      let label = formatExists ? 'Edit ' : 'Create ';

      let popupParam: StrategyParams = {
        column: column,
        action: formatExists ? 'Edit' : 'New',
        source: 'ColumnMenu',
      };

      return [
        this.createColumnMenuItemShowPopup(
          label + StrategyConstants.FormatColumnStrategyFriendlyName,
          ScreenPopups.FormatColumnPopup,
          StrategyConstants.FormatColumnGlyph,
          popupParam
        ),
      ];
    }
  }

  public getTeamSharingAction(): TeamSharingImportInfo<FormatColumn> {
    return {
      FunctionEntities: this.adaptable.api.formatColumnApi.getAllFormatColumn(),
      AddAction: FormatColumnRedux.FormatColumnAdd,
      EditAction: FormatColumnRedux.FormatColumnEdit,
    };
  }

  public getSpecialColumnReferences(specialColumnId: string): string | undefined {
    const abColumn: AdaptableColumn = this.adaptable.api.columnApi.getColumnFromId(specialColumnId);
    let formatColumns: FormatColumn[] = this.adaptable.api.formatColumnApi
      .getAllFormatColumn()
      .filter((fc: FormatColumn) =>
        this.adaptable.api.scopeApi.isColumnInScopeColumns(abColumn, fc.Scope)
      );

    return ArrayExtensions.IsNotNullOrEmpty(formatColumns)
      ? formatColumns.length + ' Format Column()'
      : undefined;
  }

  public abstract initStyles(): void;
}
