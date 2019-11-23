import { AdaptableBlotterColumn } from '../../../Utilities/Interface/AdaptableBlotterColumn';
import { StrategyViewPopupProps } from './StrategyViewPopupProps';
import * as TeamSharingRedux from '../../../Redux/ActionsReducers/TeamSharingRedux';
import { AdaptableBlotterObject } from '../../../PredefinedConfig/Common/AdaptableBlotterObject';

export interface StrategySummaryProps<View> extends StrategyViewPopupProps<View> {
  SummarisedColumn: AdaptableBlotterColumn;
  onShare: (entity: AdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}
