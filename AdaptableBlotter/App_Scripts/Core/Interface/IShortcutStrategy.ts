import { IStrategyActionReturn, IStrategy, ICellInfo } from './IStrategy';
import { ColumnType } from '../Enums';
import { ShortcutAction } from '../Enums';

export interface IShortcut {
    ShortcutKey: string;
    ShortcutResult: any;
    ShortcutAction: ShortcutAction
    ColumnType: ColumnType;
    IsLive: boolean,
    IsPredefined: boolean,
    IsDynamic: boolean
}

export interface IShortcutStrategy extends IStrategy {
    ApplyShortcut(shortcut: IShortcut, cellInfo: ICellInfo, keyEventString: string, newValue: any): void

}




