import { ConditionalStyleState } from '../Redux/ActionsReducers/Interface/IState';
import { IConditionalStyleStrategy } from './Interface/IConditionalStyleStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'
import { StateChangedTrigger } from '../Utilities/Enums';
import { IColumn } from '../Core/Interface/IColumn';
import { IDataChangedEvent } from '../Utilities/Services/Interface/IAuditService';

export abstract class ConditionalStyleStrategy extends AdaptableStrategyBase implements IConditionalStyleStrategy {
    protected ConditionalStyleState: ConditionalStyleState
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.ConditionalStyleStrategyId, blotter)
        this.blotter.AuditService.OnDataSourceChanged().Subscribe((sender, eventText) => this.handleDataSourceChanged(eventText))
        this.blotter.onGridDataBound().Subscribe((sender, blotter) => this.handleGridDataBound(blotter))
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.ConditionalStyleStrategyName, ScreenPopups.ConditionalStylePopup, StrategyConstants.ConditionalStyleGlyph);
    }

    protected InitState() {
        if (this.ConditionalStyleState != this.blotter.AdaptableBlotterStore.TheStore.getState().ConditionalStyle) {
            this.ConditionalStyleState = this.blotter.AdaptableBlotterStore.TheStore.getState().ConditionalStyle;

            this.InitStyles();

            if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.ConditionalStyle, this.ConditionalStyleState)
            }
        }
    }

    public addContextMenuItem(column: IColumn): void {
        if (this.canCreateContextMenuItem(column, this.blotter)) {
            this.createContextMenuItemShowPopup(
                "Create " + StrategyConstants.ConditionalStyleStrategyName,
                ScreenPopups.ConditionalStylePopup,
                StrategyConstants.ConditionalStyleGlyph,
                "New|" + column.ColumnId)
        }
    }

    // Called when a single piece of data changes, ie. usually the result of an inline edit
    protected abstract handleDataSourceChanged(dataChangedEvent: IDataChangedEvent): void;

    // Called when we have re-bound the grid e.g. after sorting a column or even after a smart edit or plus / minus :(
    private handleGridDataBound(blotter: IAdaptableBlotter) {
        if (this.ConditionalStyleState != null && this.ConditionalStyleState.ConditionalStyles.length > 0) {
            this.InitStyles();
        }
    }

    public abstract InitStyles(): void;

}


