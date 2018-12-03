import {IColumn} from '../../../api/Interface/IColumn';
import { StrategyViewPopupProps } from './StrategyViewPopupProps';
import * as TeamSharingRedux from '../../../Redux/ActionsReducers/TeamSharingRedux'
import { IAdaptableBlotterObject } from '../../../api/Interface/IAdaptableBlotterObjects';



export interface StrategySummaryProps<View> extends StrategyViewPopupProps<View> {
    SummarisedColumn: IColumn
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction
 }

