import * as PopupRedux from '../../../Redux/ActionsReducers/PopupRedux';
import { BaseProps } from "./BaseProps";
import { IGridSort } from "../../../Utilities/Interface/IGridSort";
export interface StrategyViewPopupProps<View> extends BaseProps<View> {
    PopupParams: string;
    onClearPopupParams: () => PopupRedux.PopupClearParamAction;
    TeamSharingActivated: boolean;
    GridSorts: IGridSort[];
}
