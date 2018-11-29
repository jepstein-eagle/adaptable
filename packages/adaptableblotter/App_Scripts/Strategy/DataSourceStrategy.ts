import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../api/Interface/IAdaptableBlotter';
import { DataSourceState, GridState } from '../Redux/ActionsReducers/Interface/IState'
import { StringExtensions } from '../Utilities/Extensions/StringExtensions'
import { basename } from 'path';
import { Server } from 'https';
import { IDataSourceStrategy } from './Interface/IDataSourceStrategy';
import { SearchChangedTrigger, StateChangedTrigger } from '../Utilities/Enums';

export class DataSourceStrategy extends AdaptableStrategyBase implements IDataSourceStrategy {
    private DataSourceState: DataSourceState

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.DataSourceStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.DataSourceStrategyName, ScreenPopups.DataSourcePopup, StrategyConstants.DataSourceGlyph);
    }

    protected InitState() {
        if (this.DataSourceState != this.GetDataSourceState()) {
            this.DataSourceState = this.GetDataSourceState();

            this.publishSearchChanged(SearchChangedTrigger.DataSource)

            if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.DataSource, this.DataSourceState)
            }
        }
    }

    private GetDataSourceState(): DataSourceState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().DataSource;
    }
    

}