import { IStrategyActionReturn, IStrategy, ICellInfo } from './IStrategy';
import { DataType } from '../Enums';
import { ShortcutAction } from '../Enums';
import { IConfigEntity } from './IAdaptableBlotter'

export interface IShortcut extends IConfigEntity{
    ShortcutKey: string;
    ShortcutResult: any;
    ShortcutAction: ShortcutAction
    DataType: DataType;
    IsPredefined: boolean,
    IsDynamic: boolean
}

export interface IShortcutStrategy extends IStrategy {
    ApplyShortcut(shortcut: IShortcut, cellInfo: ICellInfo, keyEventString: string, newValue: any): void

}




