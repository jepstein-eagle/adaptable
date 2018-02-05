import { IMenuItem } from '../Core/Interface/IMenu';
import { PopupShow } from '../Redux/ActionsReducers/PopupRedux'
import * as Redux from 'redux';
import { IEntitlement } from './Interface/IAdaptableBlotter';
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux'

export class MenuReduxActionItem implements IMenuItem {

    constructor(public Label: string,
        public StrategyId: string,
        public Action: Redux.Action,
        public GlyphIcon: string) {
        this.IsEnabled = true;
    }

    public IsEnabled: boolean;
   // public MenuType: MenuType.ReduxAction
}

export class MenuItemShowPopup implements IMenuItem {
    constructor(public Label: string,
        public StrategyId: string,
        private ComponentName: string,
        public GlyphIcon: string,
        private Entitlment: IEntitlement,
        private PopupParams?: string) {
        this.IsEnabled = true;
        this.Action = PopupRedux.PopupShow(
            ComponentName,
            Entitlment ? Entitlment.AccessLevel == "ReadOnly" : false,
            this.PopupParams)
    }

    public IsEnabled: boolean;
    public Action: Redux.Action;
}