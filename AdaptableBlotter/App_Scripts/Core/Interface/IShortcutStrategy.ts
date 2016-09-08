import {IStrategyActionReturn,IStragegy} from './IStrategy';
import {ColumnType} from '../Enums';

export interface IShortcut {
    ShortcutId : number
    ShortcutKey: string;
    ShortcutResult: any;
    ColumnType: ColumnType;
    IsLive : Boolean,
    IsPredefined : Boolean
}


// here we will do the apply shortcut
export interface IShortcutStrategy extends IStragegy {
    ApplyShortcut(keyPressed: string) : void;
}
