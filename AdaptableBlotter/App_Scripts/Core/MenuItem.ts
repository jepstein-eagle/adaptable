//Just a normal menuitem class. if user click on it we 
//will pass back the action to the strategy and it will decide what to do
export class MenuItem implements IMenuItem {

    constructor(public Label:string, public StrategyId : string, public Action: string ){
        this.IsEnabled = true;
    }

    public IsEnabled : boolean;
}

//This menu item is different. If user click on it the AdaptableBlotterView dispatch directly 
//a message to show a popup with the react component name stored in the Action param 
export class MenuItemShowPopup extends MenuItem {

    constructor(public Label:string, public StrategyId : string, public Action: string )
    {
        super(Label,StrategyId,Action)
    }
}