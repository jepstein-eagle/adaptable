import { ConditionalStyleState } from '../Redux/ActionsReducers/Interface/IState';
import { IConditionalStyleStrategy } from '../Strategy/Interface/IConditionalStyleStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService'
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'

export abstract class ConditionalStyleStrategy extends AdaptableStrategyBase implements IConditionalStyleStrategy {
    protected ConditionalStyleState: ConditionalStyleState
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ConditionalStyleStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup(StrategyNames.ConditionalStyleStrategyName, ScreenPopups.ConditionalStylePopup, StrategyGlyphs.ConditionalStyleGlyph);
        this.blotter.AuditService.OnDataSourceChanged().Subscribe((sender, eventText) => this.handleDataSourceChanged(eventText))
        this.blotter.onGridDataBound().Subscribe((sender, blotter) => this.handleGridDataBound(blotter))
    }

    protected InitState() {
        if (this.ConditionalStyleState != this.blotter.AdaptableBlotterStore.TheStore.getState().ConditionalStyle) {
            this.ConditionalStyleState = this.blotter.AdaptableBlotterStore.TheStore.getState().ConditionalStyle;

            this.InitStyles();
        }
    }

    protected addColumnMenuItems(columnId: string): void {
        if (!this.isReadOnlyStrategy()) {
            this.createMenuItemShowPopup(
                "Create " + StrategyNames.ConditionalStyleStrategyName,
                ScreenPopups.ConditionalStylePopup,
                StrategyGlyphs.ConditionalStyleGlyph,
                "New|" + columnId)
        }
    }

    // Called when a single piece of data changes, ie. usually the result of an inline edit
    protected abstract handleDataSourceChanged(dataChangedEvent: IDataChangedEvent): void;

    // Called when we have re-bound the grid e.g. after sorting a column or even after a smart edit or plus / minus :(
    private handleGridDataBound(blotter: IAdaptableBlotter) {
        if (this.ConditionalStyleState != null && this.ConditionalStyleState.ConditionalStyleConditions.length > 0) {
            this.InitStyles();
        }
    }

    protected abstract InitStyles(): void;

}


