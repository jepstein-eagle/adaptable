import { ApiBase } from './ApiBase';
import { ActionColumnApi } from '../ActionColumnApi';
import { ActionColumnState, ActionColumn } from '../../PredefinedConfig/ActionColumnState';
import {
  ActionColumnClickedInfo,
  ActionColumnClickedEventArgs,
} from '../Events/ActionColumnClicked';
import AdaptableHelper from '../../Utilities/Helpers/AdaptableHelper';
import * as ActionColumnRedux from '../../Redux/ActionsReducers/ActionColumnRedux';

export class ActionColumnApiImpl extends ApiBase implements ActionColumnApi {
  public getActionColumnState(): ActionColumnState {
    return this.getAdaptableState().ActionColumn;
  }

  public getAllActionColumn(): ActionColumn[] {
    let actionColumns: ActionColumn[] | undefined = this.getActionColumnState().ActionColumns;
    if (actionColumns == undefined) {
      actionColumns = [];
    }
    return actionColumns;
  }

  public fireActionColumnButtonClickedEvent(
    actionColumnClickedInfo: ActionColumnClickedInfo
  ): void {
    const actionColumnClickedEventArgs: ActionColumnClickedEventArgs = AdaptableHelper.createFDC3Message(
      'Action Column Clicked Args',
      actionColumnClickedInfo
    );
    this.adaptable.api.eventApi.emit('ActionColumnClicked', actionColumnClickedEventArgs);
    // send the Redux Action (it doesnt do anything but make it available for Audit Log)
    this.dispatchAction(ActionColumnRedux.ActionColumnApply(actionColumnClickedInfo));
  }
}
