import { IStrategy } from './IStrategy';
import { IColumn } from '../../Core/Interface/IAdaptableBlotter'

export interface ILayoutStrategy extends IStrategy {
    CurrentLayout: string;
}


export interface ILayout {
    Name: string;
    Columns: IColumn[];
}



