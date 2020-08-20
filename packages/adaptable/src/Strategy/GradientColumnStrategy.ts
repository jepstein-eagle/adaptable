import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { IGradientColumnStrategy } from './Interface/IGradientColumnStrategy';
import { GradientColumnState, GradientColumn } from '../PredefinedConfig/GradientColumnState';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { MenuItemShowPopup } from '../Utilities/MenuItem';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import * as GradientColumnRedux from '../Redux/ActionsReducers/GradientColumnRedux';
import { TeamSharingImportInfo } from '../PredefinedConfig/TeamSharingState';

export class GradientColumnStrategy extends AdaptableStrategyBase
  implements IGradientColumnStrategy {
  protected GradientColumnState: GradientColumnState;
  constructor(adaptable: IAdaptable) {
    super(
      StrategyConstants.GradientColumnStrategyId,
      StrategyConstants.GradientColumnStrategyFriendlyName,
      StrategyConstants.GradientColumnGlyph,
      ScreenPopups.GradientColumnPopup,
      adaptable
    );
  }

  public addColumnMenuItems(column: AdaptableColumn): AdaptableMenuItem[] | undefined {
    if (this.canCreateMenuItem('Full') && column.DataType == 'Number') {
      let GradientColumnExists: boolean = ArrayExtensions.ContainsItem(
        this.GradientColumnState.GradientColumns.map(f => f.ColumnId),
        column.ColumnId
      );
      let label = GradientColumnExists ? 'Edit ' : 'Create ';

      let popupParam: StrategyParams = {
        columnId: column.ColumnId,
        action: GradientColumnExists ? 'Edit' : 'New',
        source: 'ColumnMenu',
      };

      return [
        this.createColumnMenuItemShowPopup(
          label + StrategyConstants.GradientColumnStrategyFriendlyName,
          ScreenPopups.GradientColumnPopup,
          StrategyConstants.GradientColumnGlyph,
          popupParam
        ),
      ];
    }
  }

  public addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined {
    let menuItemShowPopup: MenuItemShowPopup = undefined;
    if (this.canCreateMenuItem('Full')) {
      let GradientColumnExists: boolean = ArrayExtensions.ContainsItem(
        this.GradientColumnState.GradientColumns.map(f => f.ColumnId),
        menuInfo.Column.ColumnId
      );
      if (menuInfo.Column && GradientColumnExists) {
        let popUpParams: StrategyParams = {
          source: 'ContextMenu',
        };
        menuItemShowPopup = this.createMainMenuItemShowPopup({
          Label: 'Edit Gradient Column',
          ComponentName: ScreenPopups.GradientColumnPopup,
          Icon: StrategyConstants.GradientColumnGlyph,
          PopupParams: popUpParams,
        });
      }
    }
    return menuItemShowPopup;
  }

  protected InitState() {
    if (this.GradientColumnState != this.GetGradientColumnState()) {
      if (this.adaptable.isInitialised) {
        // if we have made any changes then first delete them all
        this.GradientColumnState.GradientColumns.forEach(pb => {
          this.adaptable.removeGradientColumn(pb);
        });

        this.GetGradientColumnState().GradientColumns.forEach(pb => {
          this.adaptable.editGradientColumn(pb);
        });
        this.adaptable.redraw();
      }
      this.GradientColumnState = this.GetGradientColumnState();
    }
  }

  protected GetGradientColumnState(): GradientColumnState {
    return this.adaptable.api.gradientColumnApi.getGradientColumnState();
  }

  public getTeamSharingAction(): TeamSharingImportInfo<GradientColumn> {
    return {
      FunctionEntities: this.adaptable.api.gradientColumnApi.getAllGradientColumn(),
      AddAction: GradientColumnRedux.GradientColumnAdd,
      EditAction: GradientColumnRedux.GradientColumnEdit,
    };
  }

  public getSpecialColumnReferences(specialColumnId: string): string | undefined {
    let gradientColumns: GradientColumn[] = this.adaptable.api.gradientColumnApi
      .getAllGradientColumn()
      .filter((gc: GradientColumn) => gc.ColumnId == specialColumnId);

    return ArrayExtensions.IsNotNullOrEmpty(gradientColumns)
      ? gradientColumns.length + ' Gradient Columns'
      : undefined;
  }
}
