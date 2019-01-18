import * as React from "react";
import { IColumn } from '../../Utilities/Interface/IColumn';
export interface ColumnInfoState {
    SelectedColumn: IColumn;
    ShowSelector: boolean;
}
export declare let ColumnInfoPopup: React.ComponentClass<any, any>;
