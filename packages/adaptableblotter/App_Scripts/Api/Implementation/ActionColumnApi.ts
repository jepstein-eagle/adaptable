import { ApiBase } from './ApiBase';
import { IActionColumnApi } from '../Interface/IActionColumnApi';
import {
  ActionColumnState,
  ActionColumn,
} from '../../PredefinedConfig/DesignTimeState/ActionColumnState';

export class ActionColumnApi extends ApiBase implements IActionColumnApi {
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
