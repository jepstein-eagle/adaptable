import { IMenuItem } from '../Core/Interface/IMenu';
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
        private Entitlement: IEntitlement,
        private PopupParams?: string) {
        this.IsEnabled = true;
        this.Action = PopupRedux.PopupShow(
            ComponentName,
            Entitlement ? Entitlement.AccessLevel == "ReadOnly" : false,
            this.PopupParams)
    }

    public IsEnabled: boolean;
    public Action: Redux.Action;
}