import {IAdaptableBlotter} from './IAdaptableBlotter';
import * as React from "react";
import { DistinctCriteriaPairValue } from '../../Core/Enums'
import { IRawValueDisplayValuePair } from '../../Core/Interface/IAdaptableBlotter';
import { IStrategy } from '../../Core/Interface/IStrategy';

export interface IStrategyViewPopupProps<View> extends React.ClassAttributes<View> {
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>
    isGridPageable: () => boolean
}
