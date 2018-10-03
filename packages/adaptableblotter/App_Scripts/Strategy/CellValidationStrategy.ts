import { ICellValidationStrategy } from './Interface/ICellValidationStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { CellValidationState } from '../Redux/ActionsReducers/Interface/IState';
import { StateChangedTrigger } from '../Core/Enums';

export class CellValidationStrategy extends AdaptableStrategyBase implements ICellValidationStrategy {

    private CellValidationState: CellValidationState

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.CellValidationStrategyId, blotter)
      }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyIds.CellValidationStrategyName, ScreenPopups.CellValidationPopup, StrategyIds.CellValidationGlyph);
    }

    protected InitState() {
        if (this.CellValidationState != this.blotter.AdaptableBlotterStore.TheStore.getState().CellValidation) {
            this.CellValidationState = this.blotter.AdaptableBlotterStore.TheStore.getState().CellValidation;
       
            if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.CellValidation, this.CellValidationState)
            }
        }
    }

    public addContextMenuItem(columnId: string): void {
        if (this.canCreateContextMenuItem(columnId, this.blotter)) {
            this.createContextMenuItemShowPopup(
                "Create Cell Validation Rule",
                ScreenPopups.CellValidationPopup,
                StrategyIds.CellValidationGlyph,
                "New|" + columnId)
            }
    }
}



