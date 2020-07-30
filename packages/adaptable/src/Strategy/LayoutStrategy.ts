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

export class LayoutStrategy extends AdaptableStrategyBase implements ILayoutStrategy {
  public CurrentLayout: string;
  protected LayoutState: LayoutState;

  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.LayoutStrategyId, adaptable);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    if (this.canCreateMenuItem('ReadOnly')) {
      return this.createMainMenuItemShowPopup({
        Label: StrategyConstants.LayoutStrategyFriendlyName,
        ComponentName: ScreenPopups.LayoutPopup,
        Icon: StrategyConstants.LayoutGlyph,
      });
    }
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
