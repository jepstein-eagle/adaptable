import { IColumn } from '../../../Utilities/Interface/IColumn';
import { StrategyViewPopupProps } from './StrategyViewPopupProps';
import * as TeamSharingRedux from '../../../Redux/ActionsReducers/TeamSharingRedux';
import { IAdaptableBlotterObject } from '../../../PredefinedConfig/IAdaptableBlotterObject';

export interface StrategySummaryProps<View> extends StrategyViewPopupProps<View> {
  SummarisedColumn: IColumn;
  onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}
