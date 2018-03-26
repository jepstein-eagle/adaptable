import { IAdaptableBlotterObject } from "../../Core/Interface/Interfaces";

export interface ICustomSort extends IAdaptableBlotterObject {
    ColumnId: string;
    CustomSortItems: string[]
}