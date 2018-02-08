import {IColumn, IConfigEntity} from '../../../Core/Interface/IAdaptableBlotter';
import { StrategyViewPopupProps } from './StrategyViewPopupProps';
import { IUserFilter } from '../../../Strategy/Interface/IUserFilterStrategy';
import * as TeamSharingRedux from '../../../Redux/ActionsReducers/TeamSharingRedux'


export interface IStrategySummaryProps<View> extends StrategyViewPopupProps<View> {
    IsReadOnly: boolean,
    Columns: IColumn[]
    UserFilters: IUserFilter[]
    SummarisedColumn: IColumn
    onShare: (entity: IConfigEntity) => TeamSharingRedux.TeamSharingShareAction
 }

