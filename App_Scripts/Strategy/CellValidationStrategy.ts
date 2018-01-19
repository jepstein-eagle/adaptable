import { ICellValidationStrategy, ICellValidationRule } from '../Core/Interface/ICellValidationStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyConstants from '../Core/StrategyConstants'
import { IMenuItem } from '../Core/Interface/IStrategy';
import {  LeafExpressionOperator } from '../Core/Enums';
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter';
import { CellValidationState } from '../Redux/ActionsReducers/Interface/IState';
import { IRangeExpression } from '../Core/Interface/IExpression';
import { IUserFilter } from '../Core/Interface/IExpression';
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'

export class CellValidationStrategy extends AdaptableStrategyBase implements ICellValidationStrategy {

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.CellValidationStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup("Cell Validation", 'CellValidationConfig',  "flag");
    }

    protected addColumnMenuItems(columnId: string): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(
            MenuRedux.AddItemColumnContextMenu(this.createMenuItemShowPopup(
                "Create Cell Validation Rule",
                "CellValidationConfig",
                 "flag",
                "New|" + columnId)))
    }
}


