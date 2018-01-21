import {IAdaptableBlotter, IColumn, IConfigEntity} from './IAdaptableBlotter';
import * as React from "react";
import { IStrategy } from '../../Core/Interface/IStrategy';
import { IStrategyViewPopupProps } from './IStrategyView';
import { IUserFilter } from '../../Core/Interface/IExpression';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'


export interface IStrategySummaryProps<View> extends IStrategyViewPopupProps<View> {
    Columns: IColumn[]
    UserFilters: IUserFilter[]
    SummarisedColumn: IColumn
    onShare: (entity: IConfigEntity) => TeamSharingRedux.TeamSharingShareAction
    TeamSharingActivated: boolean
}


export interface StrategySummaryInternalState {
    EditedItem: IConfigEntity
    EditedItemIndex: number
    WizardStartIndex: number
}