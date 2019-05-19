import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { DataSourceState } from '../Redux/ActionsReducers/Interface/IState';
import { IDataSourceStrategy } from './Interface/IDataSourceStrategy';
import { SearchChangedTrigger, StateChangedTrigger } from '../Utilities/Enums';

export class DataSourceStrategy extends AdaptableStrategyBase implements IDataSourceStrategy {
  private DataSourceState: DataSourceState;

  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.DataSourceStrategyId, blotter);
  }

  protected addPopupMenuItem() {
    this.createMenuItemShowPopup(
      StrategyConstants.DataSourceStrategyName,
      ScreenPopups.DataSourcePopup,
      StrategyConstants.DataSourceGlyph
    );
  }

  protected InitState() {
    if (this.DataSourceState != this.GetDataSourceState()) {
      this.DataSourceState = this.GetDataSourceState();

      this.publishSearchChanged(SearchChangedTrigger.DataSource);
    }
  }

  private GetDataSourceState(): DataSourceState {
    return this.blotter.api.dataSourceApi.getDataSourceState();
  }
}
