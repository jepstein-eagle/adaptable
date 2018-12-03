import { ICellValidationStrategy } from './Interface/ICellValidationStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../api/Interface/IAdaptableBlotter';
import { CellValidationState } from '../Redux/ActionsReducers/Interface/IState';
import { StateChangedTrigger } from '../Utilities/Enums';
import { IColumn } from '../api/Interface/IColumn';

export class CellValidationStrategy extends AdaptableStrategyBase implements ICellValidationStrategy {

    private CellValidationState: CellValidationState

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.CellValidationStrategyId, blotter)
      }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.CellValidationStrategyName, ScreenPopups.CellValidationPopup, StrategyConstants.CellValidationGlyph);
    }

    protected InitState() {
        if (this.CellValidationState != this.blotter.AdaptableBlotterStore.TheStore.getState().CellValidation) {
            this.CellValidationState = this.blotter.AdaptableBlotterStore.TheStore.getState().CellValidation;
       
            if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.CellValidation, this.CellValidationState)
            }
        }
    }

    public addContextMenuItem(column: IColumn): void {
        if (this.canCreateContextMenuItem(column, this.blotter)) {
            this.createContextMenuItemShowPopup(
                "Create Cell Validation Rule",
                ScreenPopups.CellValidationPopup,
                StrategyConstants.CellValidationGlyph,
                "New|" + column.ColumnId)
            }
    }
}



