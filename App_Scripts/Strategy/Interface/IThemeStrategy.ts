import {IStrategy} from './IStrategy';
import { IAdaptableBlotterObject } from '../../Core/Interface/Interfaces';

export interface IThemeStrategy extends IStrategy {
}

export interface IUserTheme extends IAdaptableBlotterObject {
    Name: string;
    Url: string
  }
