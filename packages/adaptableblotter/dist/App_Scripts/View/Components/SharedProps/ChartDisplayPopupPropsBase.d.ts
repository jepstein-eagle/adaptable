import * as React from "react";
import { DistinctCriteriaPairValue } from '../../../Utilities/Enums';
import { IRawValueDisplayValuePair } from "../../UIInterfaces";
import { IColumn } from "../../../api/Interface/IColumn";
import { IAdaptableBlotterOptions } from "../../../api/Interface/IAdaptableBlotterOptions";
import { IBlotterApi } from "../../../api/Interface/IBlotterApi";
import { IChartService } from "../../../Utilities/Services/Interface/IChartService";
export interface ChartDisplayPopupPropsBase<View> extends React.ClassAttributes<View> {
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>;
    cssClassName: string;
    Columns: IColumn[];
    ModalContainer: HTMLElement;
    BlotterOptions: IAdaptableBlotterOptions;
    BlotterApi: IBlotterApi;
    ChartService: IChartService;
}
