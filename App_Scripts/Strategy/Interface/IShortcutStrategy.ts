import {  IStrategy } from './IStrategy';
import { DataType ,MathOperation } from '../../Core/Enums';
import { IConfigEntity , ICellInfo } from '../../Core/Interface/IAdaptableBlotter'

export interface IShortcut extends IConfigEntity{
    ShortcutKey: string;
    ShortcutResult: any;
    ShortcutOperation: MathOperation
    DataType: DataType;
    IsDynamic: boolean
}

export interface IShortcutStrategy extends IStrategy {
    ApplyShortcut(shortcut: IShortcut, cellInfo: ICellInfo, keyEventString: string, newValue: any): void

}




