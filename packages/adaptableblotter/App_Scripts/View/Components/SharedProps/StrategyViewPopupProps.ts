import * as PopupRedux from '../../../Redux/ActionsReducers/PopupRedux';
import { BaseProps } from './BaseProps';
import { IGridSort } from '../../../Utilities/Interface/IGridSort';

//Warning : FilterForm needs to be changed if we add properties since it uses the same interface
export interface StrategyViewPopupProps<View> extends BaseProps<View> {
  PopupParams: string;
  onClearPopupParams: () => PopupRedux.PopupClearParamAction;
  TeamSharingActivated: boolean;
  GridSorts: IGridSort[];
}
