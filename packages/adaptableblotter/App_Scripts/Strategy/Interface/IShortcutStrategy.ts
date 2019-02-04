import {  IStrategy } from './IStrategy';
import { ICellInfo } from "../../Utilities/Interface/ICellInfo";


export interface IShortcutStrategy extends IStrategy {
    ApplyShortcut(cellInfo: ICellInfo, newValue: any): void

}




