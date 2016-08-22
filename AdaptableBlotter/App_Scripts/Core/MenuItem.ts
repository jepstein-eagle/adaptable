export class MenuItem implements IMenuItem {

    constructor(public Label:string, public StrategyId : string, public Action: string ){
    }

    isEnabled() : boolean{
        return true;
    }
}

export class MenuItemShowPopup extends MenuItem {

    constructor(public Label:string, public StrategyId : string, public Action: string )
    {
        super(Label,StrategyId,Action)
    }
}