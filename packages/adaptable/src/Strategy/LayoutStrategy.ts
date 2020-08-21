import { ILayoutStrategy } from './Interface/ILayoutStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { LayoutState, Layout } from '../PredefinedConfig/LayoutState';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import * as LayoutRedux from '../Redux/ActionsReducers/LayoutRedux';
import { TeamSharingImportInfo } from '../PredefinedConfig/TeamSharingState';
import ArrayExtensions from '../Utilities/Extensions/ArrayExtensions';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';

export class LayoutStrategy extends AdaptableStrategyBase implements ILayoutStrategy {
  public CurrentLayout: string;
  protected LayoutState: LayoutState;

  constructor(adaptable: IAdaptable) {
    super(
      StrategyConstants.LayoutStrategyId,
      StrategyConstants.LayoutStrategyFriendlyName,
      StrategyConstants.LayoutGlyph,
      ScreenPopups.LayoutPopup,
      adaptable
    );
  }

  public addColumnMenuItems(column: AdaptableColumn): AdaptableMenuItem[] | undefined {
    let returnColumnMenuItems: AdaptableMenuItem[] = [];
    if (this.canCreateMenuItem('Full')) {
      returnColumnMenuItems.push(
        this.createColumnMenuItemShowPopup(
          'Edit Layout',
          ScreenPopups.LayoutPopup,
          StrategyConstants.LayoutGlyph,
          {
            action: 'Edit',
            source: 'ColumnMenu',
          }
        )
      );
      returnColumnMenuItems.push(
        this.createColumnMenuItemClickFunction('Select Column', 'tab-unselected', () => {
          this.adaptable.api.columnApi.selectColumn(column.ColumnId);
        })
      );
      returnColumnMenuItems.push(
        this.createColumnMenuItemClickFunction('Select Whole Grid', 'tab-unselected', () => {
          this.adaptable.api.columnApi.selectAll();
        })
      );
      if (this.canCreateMenuItem('Full') && column.Hideable) {
        returnColumnMenuItems.push(
          this.createColumnMenuItemClickFunction('Hide Column', 'hide-column', () => {
            this.adaptable.api.columnApi.hideColumn(column.ColumnId);
          })
        );
      }
    }

    return returnColumnMenuItems;
  }

  public getTeamSharingAction(): TeamSharingImportInfo<Layout> {
    return {
      FunctionEntities: this.adaptable.api.layoutApi.getAllLayout(),
      AddAction: LayoutRedux.LayoutAdd,
      EditAction: LayoutRedux.LayoutSave,
    };
  }

  public getSpecialColumnReferences(specialColumnId: string): string | undefined {
    let layouts: Layout[] = this.adaptable.api.layoutApi
      .getAllLayout()
      .filter((layout: Layout) => layout.Columns.includes(specialColumnId));

    return ArrayExtensions.IsNotNullOrEmpty(layouts)
      ? 'Layouts:' +
          layouts
            .map(l => {
              return l.Name;
            })
            .join(',')
      : undefined;
  }
}
