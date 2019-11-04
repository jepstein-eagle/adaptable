import { ApiBase } from './ApiBase';
import { UpdatedRowState } from '../PredefinedConfig/RunTimeState/UpdatedRowState';
import { IUpdatedRowApi } from './Interface/IUpdatedRowApi';
import * as UpdatedRowRedux from '../Redux/ActionsReducers/UpdatedRowRedux';
import * as SystemRedux from '../Redux/ActionsReducers/SystemRedux';
import { UpdatedRowInfo } from '../Utilities/Services/Interface/IDataService';
/**
 * Provides full and comprehensive run-time access to the Updated Rows function (which colours rows as they change based on a scheme set by the user).
 *
 * Also provides access to the associated Updated Row state (from Predefined Config).
 */
export class UpdatedRowApi extends ApiBase implements IUpdatedRowApi {
  /**
   * Retrieves the Updated Row State
   *
   * This provides details of how the Updated Row function has been configured but **not** of which rows are currently coloured differently as a result of being updated.
   */
  public getUpdatedRowState(): UpdatedRowState {
    return this.getBlotterState().UpdatedRow;
  }

  /**
   * Turns on the Updated Row function so that Rows are coloured when a cell in the row updates.
   */
  public updatedRowEnable(): void {
    this.dispatchAction(UpdatedRowRedux.UpdatedRowEnableDisable(true));
  }

  /**
   *  Turns off the Updated Row function so that Rows are no longer coloured when a cell in the row updates.
   */
  public updatedRowDisable(): void {
    this.dispatchAction(UpdatedRowRedux.UpdatedRowEnableDisable(false));
  }

  /**
   *  Turns on the 'Jump to Row' functionality whereby the Grid will scroll to display a row that has been updated
   */
  public jumpToRowEnable(): void {
    this.dispatchAction(UpdatedRowRedux.JumpToRowEnableDisable(true));
  }

  /**
   *  Turns off the 'Jump to Row' functionality so that the Grid will no longer scroll to display a row that has been updated
   */
  public jumpToRowDisable(): void {
    this.dispatchAction(UpdatedRowRedux.JumpToRowEnableDisable(false));
  }

  /**
   * Sets the colour an Updated Row will display if the change that triggered the update was 'Up' (numeric and date cells only)
   *
   * @param upColor The colour to use for rows when triggered by an 'Up' change
   */
  public setUpColor(upColor: string): void {
    this.dispatchAction(UpdatedRowRedux.UpColorSet(upColor));
  }

  /**
   * Sets the colour an Updated Row will display if the change that triggered the update was 'Down' (numeric and date cells only)
   *
   * @param downColor The colour to use for rows when triggered by an 'down' change
   */
  public setDownColor(downColor: string): void {
    this.dispatchAction(UpdatedRowRedux.DownColorSet(downColor));
  }

  /**
   * Sets the colour an Updated Row will display if the change that triggered the update was non directional (e.g. via a text change)
   *
   * @param neutralColor Sets the colour an Updated Row will display if the change that triggered the update was non directional
   */
  public setNeutralColor(neutralColor: string): void {
    this.dispatchAction(UpdatedRowRedux.NeutralColorSet(neutralColor));
  }

  /**
   * Adds a new UpdatedRowInfo to the State
   *
   * @param updatedRowInfo the UpdatedRowInfo object to add
   */
  public addUpdatedRowInfo(updatedRowInfo: UpdatedRowInfo): void {
    this.dispatchAction(SystemRedux.SystemUpdatedRowAdd(updatedRowInfo));
  }

  /**
   * Deletes a new UpdatedRowInfo to the State
   *
   * @param updatedRowInfo the UpdatedRowInfo object to delete
   */
  public deleteUpdatedRowInfo(updatedRowInfo: UpdatedRowInfo): void {
    this.dispatchAction(SystemRedux.SystemUpdatedRowDelete(updatedRowInfo));
  }

  /**
   * Deletes all UpdatedRowInfo objects - so that no rows will display as updated.
   */
  public deleteAllUpdatedRowInfo(): void {
    let updatedRowInfos: UpdatedRowInfo[] = this.blotter.api.internalApi.getUpdatedRowInfos();
    this.dispatchAction(SystemRedux.SystemUpdatedRowDeleteAll(updatedRowInfos));
  }
}
