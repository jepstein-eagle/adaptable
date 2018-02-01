import { IStrategyActionReturn, IStrategy, ICellInfo } from './IStrategy';
import { DataType ,ShortcutAction } from '../../Core/Enums';
import { IConfigEntity } from '../../Core/Interface/IAdaptableBlotter'

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




