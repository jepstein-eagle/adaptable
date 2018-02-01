import { IStrategy } from './IStrategy';
import { IConfigEntity } from '../../Core/Interface/IAdaptableBlotter'

export interface ILayoutStrategy extends IStrategy {
    CurrentLayout: string;
}


export interface ILayout extends IConfigEntity{
    Name: string;
    Columns: string[];
}



