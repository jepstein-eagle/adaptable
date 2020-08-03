import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { IPercentBarStrategy } from './Interface/IPercentBarStrategy';
import { PercentBarState, PercentBar } from '../PredefinedConfig/PercentBarState';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { MenuItemShowPopup } from '../Utilities/MenuItem';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import { TeamSharingImportInfo } from '../PredefinedConfig/TeamSharingState';
import * as PercentBarRedux from '../Redux/ActionsReducers/PercentBarRedux';

export class PercentBarStrategy extends AdaptableStrategyBase implements IPercentBarStrategy {
  protected PercentBarState: PercentBarState;
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.PercentBarStrategyId, adaptable);

    this.adaptable.api.eventApi.on('AdaptableReady', () => {
      const percentBars = this.adaptable.api.percentBarApi.getAllPercentBar();
      percentBars.forEach(percentBar => {
        if (percentBar.Ranges) {
          return;
        }

        percentBar.Ranges = [];

        if (percentBar.NegativeValue !== undefined) {
          percentBar.Ranges.push({
            Min: percentBar.NegativeValue,
            Max: 0,
            Color: percentBar.NegativeColor,
          });
        }

        if (percentBar.PositiveValue !== undefined) {
          percentBar.Ranges.push({
            Min: 0,
            Max: percentBar.PositiveValue,
            Color: percentBar.PositiveColor,
          });
        }

        this.adaptable.api.percentBarApi.editPercentBar(percentBar);
      });
    });
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    if (this.canCreateMenuItem('ReadOnly')) {
      return this.createMainMenuItemShowPopup({
        Label: StrategyConstants.PercentBarStrategyFriendlyName,
        ComponentName: ScreenPopups.PercentBarPopup,
        Icon: StrategyConstants.PercentBarGlyph,
      });
    }
  }

  public addColumnMenuItems(column: AdaptableColumn): AdaptableMenuItem[] | undefined {
    if (this.canCreateMenuItem('Full') && column.DataType == 'Number') {
      let percentBarExists: boolean = ArrayExtensions.ContainsItem(
        this.PercentBarState.PercentBars.map(f => f.ColumnId),
        column.ColumnId
      );
      let label = percentBarExists ? 'Edit ' : 'Create ';

      let popupParam: StrategyParams = {
        columnId: column.ColumnId,
        action: percentBarExists ? 'Edit' : 'New',
        source: 'ColumnMenu',
      };

      return [
        this.createColumnMenuItemShowPopup(
          label + StrategyConstants.PercentBarStrategyFriendlyName,
          ScreenPopups.PercentBarPopup,
          StrategyConstants.PercentBarGlyph,
          popupParam
        ),
      ];
    }
  }

  public addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined {
    let menuItemShowPopup: MenuItemShowPopup = undefined;
    if (this.canCreateMenuItem('Full')) {
      let percentBarExists: boolean = ArrayExtensions.ContainsItem(
        this.PercentBarState.PercentBars.map(f => f.ColumnId),
        menuInfo.Column.ColumnId
      );
      if (menuInfo.Column && percentBarExists) {
        let popUpParams: StrategyParams = {
          source: 'ContextMenu',
        };
        menuItemShowPopup = this.createMainMenuItemShowPopup({
          Label: 'Edit Percent Bar',
          ComponentName: ScreenPopups.PercentBarPopup,
          Icon: StrategyConstants.PercentBarGlyph,
          PopupParams: popUpParams,
        });
      }
    }
    return menuItemShowPopup;
  }

  protected InitState() {
    if (this.PercentBarState != this.GetPercentBarState()) {
      if (this.adaptable.isInitialised) {
        // if we have made any changes then first delete them all
        this.PercentBarState.PercentBars.forEach(pb => {
          this.adaptable.removePercentBar(pb);
        });

        this.GetPercentBarState().PercentBars.forEach(pb => {
          this.adaptable.editPercentBar(pb);
        });
        this.adaptable.redraw();
      }
      this.PercentBarState = this.GetPercentBarState();
    }
  }

  protected GetPercentBarState(): PercentBarState {
    return this.adaptable.api.percentBarApi.getPercentBarState();
  }

  public getTeamSharingAction(): TeamSharingImportInfo<PercentBar> {
    return {
      FunctionEntities: this.GetPercentBarState().PercentBars,
      AddAction: PercentBarRedux.PercentBarAdd,
      EditAction: PercentBarRedux.PercentBarEdit,
    };
  }

  public getSpecialColumnReferences(specialColumnId: string): string | undefined {
    let percentBars: PercentBar[] = this.GetPercentBarState().PercentBars.filter(
      (pb: PercentBar) => pb.ColumnId == specialColumnId
    );

    return ArrayExtensions.IsNotNullOrEmpty(percentBars)
      ? percentBars.length + ' Percent Bars'
      : undefined;
  }
}
