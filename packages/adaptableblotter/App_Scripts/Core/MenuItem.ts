import { IMenuItem } from './Interface/IMenu';
import * as Redux from 'redux';
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux'

export class MenuItemDoReduxAction implements IMenuItem {

    constructor(public Label: string,
        public StrategyId: string,
        public Action: Redux.Action,
        public GlyphIcon: string,
         public IsVisible: boolean ) {
    }
}

export class MenuItemShowPopup implements IMenuItem {
    constructor(public Label: string,
        public StrategyId: string,
        private ComponentName: string,
        public GlyphIcon: string,
        public IsVisible: boolean,
        private PopupParams?: string,
      ) {
        this.Action = PopupRedux.PopupShowScreen(
           StrategyId,
            ComponentName,
             this.PopupParams)
    }
    public Action: Redux.Action;
}