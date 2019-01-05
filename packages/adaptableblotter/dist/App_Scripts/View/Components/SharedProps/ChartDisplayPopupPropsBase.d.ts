import * as React from "react";
import { DistinctCriteriaPairValue } from '../../../Utilities/Enums';
import { IRawValueDisplayValuePair } from "../../UIInterfaces";
import { IColumn } from "../../../Api/Interface/IColumn";
import { IAdaptableBlotter } from "../../../Api/Interface/IAdaptableBlotter";
import { IUserFilter } from "../../../Api/Interface/IAdaptableBlotterObjects";
export interface ChartDisplayPopupPropsBase<View> extends React.ClassAttributes<View> {
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>;
    cssClassName: string;
    Columns: IColumn[];
    ModalContainer: HTMLElement;
    onClose?: Function;
    showModal: boolean;
    Blotter: IAdaptableBlotter;
    UserFilters: IUserFilter[];
    SystemFilters: string[];
    ColorPalette: string[];
}
