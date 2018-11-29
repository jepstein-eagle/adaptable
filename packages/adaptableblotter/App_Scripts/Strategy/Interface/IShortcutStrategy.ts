import {  IStrategy } from './IStrategy';
import { DataType ,MathOperation } from '../../Utilities/Enums';
import {  ICellInfo } from '../../Core/Interface/Interfaces';


export interface IShortcutStrategy extends IStrategy {
    ApplyShortcut(cellInfo: ICellInfo, newValue: any): void

}




