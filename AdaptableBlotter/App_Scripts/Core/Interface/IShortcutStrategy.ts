import {IStrategyActionReturn,IStragegy} from './IStrategy';


export interface IShortcut {
    ShortcutId : number
    ShortcutKey: string;
    ShortcutResult: any;
    IsLive : Boolean,
    IsPredefined : Boolean
}


// here we will do the apply shortcut
export interface IShortcutStrategy extends IStragegy {
    ApplyShortcut(keyPressed: string) : void;
}
