import { IStrategy } from './IStrategy';
import { IColumn } from '../../Core/Interface/IAdaptableBlotter'
import { IConfigEntity } from './IAdaptableBlotter'

export interface ILayoutStrategy extends IStrategy {
    CurrentLayout: string;
}


export interface ILayout extends IConfigEntity{
    Name: string;
    Columns: string[];
}



