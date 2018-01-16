import {IAdaptableBlotter} from './IAdaptableBlotter';
import * as React from "react";
import { DistinctCriteriaPairValue } from '../../Core/Enums'
import { IRawValueDisplayValuePair } from '../../Core/Interface/IAdaptableBlotter';
import { IStrategy } from '../../Core/Interface/IStrategy';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'

//Warning : FilterForm needs to be changed if we add properties since it uses the same interface
export interface IStrategyViewPopupProps<View> extends React.ClassAttributes<View> {
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>
    PopupParams: string,
    onClearPopupParams: () => PopupRedux.PopupClearParamAction,
    TeamSharingActivated: boolean
}
