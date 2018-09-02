import * as React from "react";
import { DistinctCriteriaPairValue } from '../../../Core/Enums'
import * as PopupRedux from '../../../Redux/ActionsReducers/PopupRedux'
import { IRawValueDisplayValuePair } from "../../UIInterfaces";
import { IColumn } from "../../../Core/Interface/IColumn";
import { IUserFilter, IGridSort } from "../../../Core/Api/Interface/AdaptableBlotterObjects";
import { IAdaptableBlotterOptions } from "../../../Core/Api/Interface/IAdaptableBlotterOptions";
import { BlotterApi } from "../../../Vendors/agGrid/BlotterApi";
import { IBlotterApi } from "../../../Core/Api/Interface/IBlotterApi";
import { IAdaptableBlotter } from "../../../Core/Interface/IAdaptableBlotter";

//Warning : FilterForm needs to be changed if we add properties since it uses the same interface
export interface StrategyViewPopupProps<View> extends React.ClassAttributes<View> {
    PopupParams: string,
    onClearPopupParams: () => PopupRedux.PopupClearParamAction,
    TeamSharingActivated: boolean

    cssClassName: string

    Columns: IColumn[],
    UserFilters: IUserFilter[],
    SystemFilters: string[],
    ModalContainer: HTMLElement,
    ColorPalette: string[],
    GridSorts: IGridSort[],
    Blotter: IAdaptableBlotter
}
