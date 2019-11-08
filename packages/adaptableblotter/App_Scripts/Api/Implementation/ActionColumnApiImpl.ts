import { ApiBase } from './ApiBase';
import { ActionColumnApi } from '../ActionColumnApi';
import {
  ActionColumnState,
  ActionColumn,
} from '../../PredefinedConfig/DesignTimeState/ActionColumnState';

export class ActionColumnApiImpl extends ApiBase implements ActionColumnApi {
  public getActionColumnState(): ActionColumnState {
    return this.getBlotterState().ActionColumn;
  }

  public getAllActionColumn(): ActionColumn[] {
    let actionColumns: ActionColumn[] | undefined = this.getBlotterState().ActionColumn
      .ActionColumns;
    if (actionColumns == undefined) {
      actionColumns = [];
    }
    return actionColumns;
  }
}
