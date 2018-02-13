import { IMenuItem } from '../Core/Interface/IMenu';
import * as Redux from 'redux';
import { IEntitlement } from './Interface/IAdaptableBlotter';
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux'

export class MenuItemDoReduxAction implements IMenuItem {

    constructor(public Label: string,
        public StrategyId: string,
        public Action: Redux.Action,
        public GlyphIcon: string,
        public IsReadOnly: boolean,
        public IsVisible: boolean ) {
    }

    ; 
}

export class MenuItemShowPopup implements IMenuItem {
    constructor(public Label: string,
        public StrategyId: string,
        private ComponentName: string,
        public GlyphIcon: string,
        public IsReadOnly: boolean,
        public IsVisible: boolean,
        private PopupParams?: string,
      ) {
        this.Action = PopupRedux.PopupShow(
            ComponentName,
            this.IsReadOnly,
            this.PopupParams)
    }
    public Action: Redux.Action;
}