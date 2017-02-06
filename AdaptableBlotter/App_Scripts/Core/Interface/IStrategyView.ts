import {IAdaptableBlotter} from './IAdaptableBlotter';
import * as React from "react";
import { DistinctCriteriaPairValue } from '../../Core/Enums'
import { IRawValueDisplayValuePair } from '../../Core/Interface/IAdaptableBlotter';

export interface IStrategyViewPopupProps<View> extends React.ClassAttributes<View> {
    AdaptableBlotter: IAdaptableBlotter
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>
}
