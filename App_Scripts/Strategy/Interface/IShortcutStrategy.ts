import {  IStrategy } from './IStrategy';
import { DataType ,MathOperation } from '../../Core/Enums';
import { IAdaptableBlotterObject, ICellInfo } from '../../Core/Interface/Interfaces';

export interface IShortcut extends IAdaptableBlotterObject{
    ShortcutKey: string;
    ShortcutResult: any;
    ShortcutOperation: MathOperation
    DataType: DataType;
    IsDynamic: boolean
}

export interface IShortcutStrategy extends IStrategy {
    ApplyShortcut(cellInfo: ICellInfo, newValue: any): void

}




