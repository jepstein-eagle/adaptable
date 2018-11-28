import * as React from "react";
import { IColumn } from '../../Core/Interface/IColumn';
export interface ColumnInfoState {
    SelectedColumn: IColumn;
    ShowSelector: boolean;
}
export declare let ColumnInfoPopup: React.ComponentClass<any, any>;
