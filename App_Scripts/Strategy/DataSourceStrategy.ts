import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { DataSourceState, GridState } from '../Redux/ActionsReducers/Interface/IState'
import { StringExtensions } from '../Core/Extensions/StringExtensions'
import { basename } from 'path';
import { Server } from 'https';
import { IDataSourceStrategy } from './Interface/IDataSourceStrategy';
import { SearchChangedTrigger } from '../Core/Enums';

export class DataSourceStrategy extends AdaptableStrategyBase implements IDataSourceStrategy {
    private DataSourceState: DataSourceState

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.DataSourceStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.DataSourceStrategyName, ScreenPopups.DataSourcePopup, StrategyGlyphs.DataSourceGlyph);
    }

    protected InitState() {
        if (this.DataSourceState != this.GetDataSourceState()) {
            this.DataSourceState = this.GetDataSourceState();

            this.publishServerSearch(SearchChangedTrigger.DataSource)
        }
    }

    private GetDataSourceState(): DataSourceState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().DataSource;
    }
    

}