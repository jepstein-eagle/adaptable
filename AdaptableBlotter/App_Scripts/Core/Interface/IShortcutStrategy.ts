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


