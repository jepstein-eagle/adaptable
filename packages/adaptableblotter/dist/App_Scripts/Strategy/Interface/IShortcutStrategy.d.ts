import { IStrategy } from './IStrategy';
import { ICellInfo } from '../../Api/Interface/Interfaces';
export interface IShortcutStrategy extends IStrategy {
    ApplyShortcut(cellInfo: ICellInfo, newValue: any): void;
}
