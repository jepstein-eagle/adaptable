import * as React from "react";
import * as PopupRedux from '../../../Redux/ActionsReducers/PopupRedux'
import { IColumn } from "../../../Core/Interface/IColumn";
import { IUserFilter, IGridSort, IColumnFilter } from "../../../Core/Api/Interface/IAdaptableBlotterObjects";
import { IAdaptableBlotter } from "../../../Core/Interface/IAdaptableBlotter";
import { AccessLevel } from "../../../Core/Enums";

//Warning : FilterForm needs to be changed if we add properties since it uses the same interface
export interface StrategyViewPopupProps<View> extends React.ClassAttributes<View> {
    PopupParams: string,
    onClearPopupParams: () => PopupRedux.PopupClearParamAction,
    TeamSharingActivated: boolean

    cssClassName: string
    AccessLevel: AccessLevel,
                  
    Columns: IColumn[],
    UserFilters: IUserFilter[],
    SystemFilters: string[],
    ColumnFilters: IColumnFilter[],
    ModalContainer: HTMLElement,
    ColorPalette: string[],
    GridSorts: IGridSort[],
    Blotter: IAdaptableBlotter
}
