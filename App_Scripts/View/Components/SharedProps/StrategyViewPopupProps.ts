import * as React from "react";
import { DistinctCriteriaPairValue } from '../../../Core/Enums'
import * as PopupRedux from '../../../Redux/ActionsReducers/PopupRedux'
import { IRawValueDisplayValuePair } from "../../UIInterfaces";
import { IColumn } from "../../../Core/Interface/IColumn";
import { IUserFilter } from "../../../Strategy/Interface/IUserFilterStrategy";
import { IGridSort } from "../../../Core/Interface/Interfaces";

//Warning : FilterForm needs to be changed if we add properties since it uses the same interface
export interface StrategyViewPopupProps<View> extends React.ClassAttributes<View> {
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>
    PopupParams: string,
    onClearPopupParams: () => PopupRedux.PopupClearParamAction,
    TeamSharingActivated: boolean

    Columns: IColumn[],
    UserFilters: IUserFilter[],
    SystemFilters: string[],
    ModalContainer: HTMLElement,
    ColorPalette: string[],
    GridSorts: IGridSort[]
}
