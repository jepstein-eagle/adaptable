import {IColumn, IConfigEntity} from './IAdaptableBlotter';
import { IStrategyViewPopupProps } from './IStrategyView';
import { IUserFilter } from '../../Strategy/Interface/IUserFilterStrategy';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'


export interface IStrategySummaryProps<View> extends IStrategyViewPopupProps<View> {
    Columns: IColumn[]
    UserFilters: IUserFilter[]
    SummarisedColumn: IColumn
    onShare: (entity: IConfigEntity) => TeamSharingRedux.TeamSharingShareAction
    TeamSharingActivated: boolean
}

