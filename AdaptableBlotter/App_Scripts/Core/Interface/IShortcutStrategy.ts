import {IStrategyActionReturn,IStrategy} from './IStrategy';
import {ColumnType} from '../Enums';
import {ShortcutAction} from '../Enums';

export interface IShortcut {
    ShortcutId : number
    ShortcutKey: string;
    ShortcutResult: any;
    ShortcutAction: ShortcutAction
    ColumnType: ColumnType;
    IsLive : Boolean,
    IsPredefined : Boolean,
    IsDynamic: Boolean
}


