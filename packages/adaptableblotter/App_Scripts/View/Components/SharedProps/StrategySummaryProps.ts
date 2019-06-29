import { IColumn } from '../../../Utilities/Interface/IColumn';
import { StrategyViewPopupProps } from './StrategyViewPopupProps';
import * as TeamSharingRedux from '../../../Redux/ActionsReducers/TeamSharingRedux';
import { AdaptableBlotterObject } from '../../../PredefinedConfig/AdaptableBlotterObject';

export interface StrategySummaryProps<View> extends StrategyViewPopupProps<View> {
  SummarisedColumn: IColumn;
  onShare: (entity: AdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}
