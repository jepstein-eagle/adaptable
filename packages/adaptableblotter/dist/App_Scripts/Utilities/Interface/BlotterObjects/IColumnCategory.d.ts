import { IAdaptableBlotterObject } from './IAdaptableBlotterObject';
export interface IColumnCategory extends IAdaptableBlotterObject {
    ColumnCategoryId: string;
    ColumnIds: string[];
}
