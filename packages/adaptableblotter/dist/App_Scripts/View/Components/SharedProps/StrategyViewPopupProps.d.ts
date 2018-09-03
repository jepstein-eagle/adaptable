import * as React from "react";
import * as PopupRedux from '../../../Redux/ActionsReducers/PopupRedux';
import { IColumn } from "../../../Core/Interface/IColumn";
import { IUserFilter, IGridSort } from "../../../Core/Api/Interface/AdaptableBlotterObjects";
import { IAdaptableBlotter } from "../../../Core/Interface/IAdaptableBlotter";
export interface StrategyViewPopupProps<View> extends React.ClassAttributes<View> {
    PopupParams: string;
    onClearPopupParams: () => PopupRedux.PopupClearParamAction;
    TeamSharingActivated: boolean;
    cssClassName: string;
    Columns: IColumn[];
    UserFilters: IUserFilter[];
    SystemFilters: string[];
    ModalContainer: HTMLElement;
    ColorPalette: string[];
    GridSorts: IGridSort[];
    Blotter: IAdaptableBlotter;
}
