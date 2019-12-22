import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { StrategyViewPopupProps } from './StrategyViewPopupProps';
import * as TeamSharingRedux from '../../../Redux/ActionsReducers/TeamSharingRedux';
import { AdaptableObject } from '../../../PredefinedConfig/Common/AdaptableObject';

export interface StrategySummaryProps<View> extends StrategyViewPopupProps<View> {
  SummarisedColumn: AdaptableColumn;
  onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}
