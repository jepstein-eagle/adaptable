import * as React from "react";
import { IColumnFilterContext } from '../../../Strategy/Interface/IColumnFilterStrategy';
import { ContextMenuTab } from '../../../Core/Enums';
import { IRawValueDisplayValuePair } from "../../UIInterfaces";
export interface FilterFormState {
    ColumnValuePairs: Array<IRawValueDisplayValuePair>;
    ShowWaitingMessage: boolean;
    SelectedTab: ContextMenuTab;
}
export declare let FilterForm: React.ComponentClass<any, any>;
export declare const FilterFormReact: (FilterContext: IColumnFilterContext) => JSX.Element;
