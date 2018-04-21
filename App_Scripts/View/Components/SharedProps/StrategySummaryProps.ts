import {IColumn} from '../../../Core/Interface/IColumn';
import { StrategyViewPopupProps } from './StrategyViewPopupProps';
import { IUserFilter } from '../../../Strategy/Interface/IUserFilterStrategy';
import * as TeamSharingRedux from '../../../Redux/ActionsReducers/TeamSharingRedux'
import { IAdaptableBlotterObject } from '../../../Core/Interface/Interfaces';


export interface StrategySummaryProps<View> extends StrategyViewPopupProps<View> {
    IsReadOnly: boolean,
    SummarisedColumn: IColumn
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction
 }

