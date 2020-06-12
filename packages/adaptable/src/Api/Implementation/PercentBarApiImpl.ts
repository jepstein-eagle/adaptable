import * as PercentBarRedux from '../../Redux/ActionsReducers/PercentBarRedux';
import { ApiBase } from './ApiBase';
import { PercentBarApi } from '../PercentBarApi';
import {
  PercentBarState,
  PercentBar,
  PercentBarRange,
} from '../../PredefinedConfig/PercentBarState';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';

export class PercentBarApiImpl extends ApiBase implements PercentBarApi {
  public getPercentBarState(): PercentBarState {
    return this.getAdaptableState().PercentBar;
  }

  public getAllPercentBar(): PercentBar[] {
    return this.getPercentBarState().PercentBars;
  }

  public getPercentBarByColumn(columnId: string): PercentBar {
    let percentBar: PercentBar = this.getAdaptableState().PercentBar.PercentBars.find(
      pcb => pcb.ColumnId == columnId
    );
    return percentBar;
  }

  public addPercentBar(percentBar: PercentBar): void {
    this.dispatchAction(PercentBarRedux.PercentBarAdd(percentBar));
  }

  public createPercentBar(
    columnId: string,
    ranges: PercentBarRange[],
    showValue: boolean,
    showToolTip: boolean,
    displayRawValue: boolean,
    displayPercentageValue: boolean,
    backColor: string
  ): void {
    let percentBar: PercentBar = {
      ColumnId: columnId,
      Ranges: ranges,
      ShowValue: showValue,
      ShowToolTip: showToolTip,
      DisplayRawValue: displayRawValue,
      DisplayPercentageValue: displayPercentageValue,
      BackColor: backColor,
    };
    this.addPercentBar(percentBar);
  }

  public editPercentBar(percentBar: PercentBar): void {
    let index: number = this.getAllPercentBar().findIndex(
      pcb => pcb.ColumnId == percentBar.ColumnId
    );
    this.dispatchAction(PercentBarRedux.PercentBarEdit(percentBar));
  }

  public editPercentBarNegativeValue(negativeValue: number, columnId: string): void {
    let percentBar = this.getPercentBarByColumn(columnId);
    percentBar.NegativeValue = negativeValue;
    this.editPercentBar(percentBar);
  }

  public editPercentBarPostiiveValue(positiveValue: number, columnId: string): void {
    let percentBar = this.getPercentBarByColumn(columnId);
    percentBar.PositiveValue = positiveValue;
    this.editPercentBar(percentBar);
  }

  public editPercentBarPositiveColor(positiveColor: string, columnId: string): void {
    let percentBar = this.getPercentBarByColumn(columnId);
    percentBar.PositiveColor = positiveColor;
    this.editPercentBar(percentBar);
  }

  public editPercentBarNegativeColor(negativeColor: string, columnId: string): void {
    let percentBar = this.getPercentBarByColumn(columnId);
    percentBar.NegativeColor = negativeColor;
    this.editPercentBar(percentBar);
  }

  public editPercentBarShowValue(showValue: boolean, columnId: string): void {
    let percentBar = this.getPercentBarByColumn(columnId);
    percentBar.ShowValue = showValue;
    this.editPercentBar(percentBar);
  }

  public deletePercentBar(columnId: string): void {
    let percentBar: PercentBar = this.getAllPercentBar().find(pcb => pcb.ColumnId == columnId);
    this.dispatchAction(PercentBarRedux.PercentBarDelete(percentBar));
  }

  public showPercentBarPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.PercentBarStrategyId,
      ScreenPopups.PercentBarPopup
    );
  }
}
