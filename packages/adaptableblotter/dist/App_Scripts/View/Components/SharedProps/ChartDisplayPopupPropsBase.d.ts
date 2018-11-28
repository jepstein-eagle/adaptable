import * as React from "react";
import { DistinctCriteriaPairValue } from '../../../Core/Enums';
import { IRawValueDisplayValuePair } from "../../UIInterfaces";
import { IColumn } from "../../../Core/Interface/IColumn";
import { IAdaptableBlotterOptions } from "../../../Api/Interface/IAdaptableBlotterOptions";
import { IBlotterApi } from "../../../Api/Interface/IBlotterApi";
import { IChartService } from "../../../Core/Services/Interface/IChartService";
export interface ChartDisplayPopupPropsBase<View> extends React.ClassAttributes<View> {
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>;
    cssClassName: string;
    Columns: IColumn[];
    ModalContainer: HTMLElement;
    BlotterOptions: IAdaptableBlotterOptions;
    BlotterApi: IBlotterApi;
    ChartService: IChartService;
}
