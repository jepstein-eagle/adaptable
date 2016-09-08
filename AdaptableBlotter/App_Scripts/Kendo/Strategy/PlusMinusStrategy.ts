import {PlusMinusState} from '../../Redux/ActionsReducers/Interface/IState';
import {IPlusMinusStrategy} from '../../Core/Interface/IPlusMinusStrategy';
import {MenuItemShowPopup} from '../../Core/MenuItem';
import {AdaptableStrategyBase} from '../../Core/AdaptableStrategyBase';
import * as StrategyIds from '../../Core/StrategyIds'
import {IMenuItem} from '../../Core/Interface/IStrategy';

import {IAdaptableBlotter} from '../../Core/Interface/IAdaptableBlotter';

export class PlusMinusStrategy extends AdaptableStrategyBase implements IPlusMinusStrategy {
    private menuItemConfig: IMenuItem;
    private PlusMinusState: PlusMinusState
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.PlusMinusStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Configure Plus/Minus", this.Id, 'PlusMinusConfig');
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitPlusMinus())
        blotter.OnKeyDown().Subscribe((sender, key) => this.handleKeyDown(key))
    }

    private InitPlusMinus(){
        if (this.PlusMinusState != this.blotter.AdaptableBlotterStore.TheStore.getState().PlusMinus) {
            this.PlusMinusState = this.blotter.AdaptableBlotterStore.TheStore.getState().PlusMinus;
        }
    }

    private handleKeyDown(key: string){
        
    }

    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }
}


