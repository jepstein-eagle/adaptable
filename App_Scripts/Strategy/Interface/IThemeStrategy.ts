import {IStrategy} from './IStrategy';
import { IAdaptableBlotterObject } from '../../Core/Interface/Interfaces';

export interface IThemeStrategy extends IStrategy {
}

export interface IPredefinedTheme extends IAdaptableBlotterObject {
    Name: string;
    Location: string
  }
