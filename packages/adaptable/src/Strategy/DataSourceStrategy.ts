import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { IDataSourceStrategy } from './Interface/IDataSourceStrategy';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import * as DataSourceRedux from '../Redux/ActionsReducers/DataSourceRedux';
import { TeamSharingImportInfo } from '../PredefinedConfig/TeamSharingState';
import { DataSource } from '../PredefinedConfig/DataSourceState';

export class DataSourceStrategy extends AdaptableStrategyBase implements IDataSourceStrategy {
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.DataSourceStrategyId, adaptable);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    if (this.canCreateMenuItem('ReadOnly')) {
      return this.createMainMenuItemShowPopup({
        Label: StrategyConstants.DataSourceStrategyFriendlyName,
        ComponentName: ScreenPopups.DataSourcePopup,
        Icon: StrategyConstants.DataSourceGlyph,
      });
    }
  }

  public getTeamSharingAction(): TeamSharingImportInfo<DataSource> {
    return {
      FunctionEntities: this.adaptable.api.dataSourceApi.getAllDataSource(),
      AddAction: DataSourceRedux.DataSourceAdd,
      EditAction: DataSourceRedux.DataSourceEdit,
    };
  }
}
