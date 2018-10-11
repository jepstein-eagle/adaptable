import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Core/Constants/StrategyConstants'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { DataSourceState, GridState } from '../Redux/ActionsReducers/Interface/IState'
import { StringExtensions } from '../Core/Extensions/StringExtensions'
import { basename } from 'path';
import { Server } from 'https';
import { IDataSourceStrategy } from './Interface/IDataSourceStrategy';
import { SearchChangedTrigger, StateChangedTrigger } from '../Core/Enums';

export class DataSourceStrategy extends AdaptableStrategyBase implements IDataSourceStrategy {
    private DataSourceState: DataSourceState

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.DataSourceStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyIds.DataSourceStrategyName, ScreenPopups.DataSourcePopup, StrategyIds.DataSourceGlyph);
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