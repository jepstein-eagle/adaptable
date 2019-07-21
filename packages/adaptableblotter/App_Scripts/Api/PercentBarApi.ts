import * as PercentBarRedux from '../Redux/ActionsReducers/PercentBarRedux';
import { ApiBase } from './ApiBase';
import { IPercentBarApi } from './Interface/IPercentBarApi';
import { PercentBarState, PercentBar } from '../PredefinedConfig/RunTimeState/PercentBarState';

export class PercentBarApi extends ApiBase implements IPercentBarApi {
  public getPercentBarState(): PercentBarState {
    return this.getBlotterState().PercentBar;
  }

  public getAllPercentBar(): PercentBar[] {
    return this.getPercentBarState().PercentBars;
  }

  public getPercentBarByColumn(columnId: string): PercentBar {
    let percentBar: PercentBar = this.getBlotterState().PercentBar.PercentBars.find(
      pcb => pcb.ColumnId == columnId
    );
    return percentBar;
  }

  public addPercentBar(percentBar: PercentBar): void {
    this.dispatchAction(PercentBarRedux.PercentBarAdd(percentBar));
  }

  public createPercentBar(
    columnId: string,
    minValue: number,
    maxValue: number,
    positiveColor: string,
    negativeColor: string,
    showValue: boolean
  ): void {
    let percentBar: PercentBar = {
      ColumnId: columnId,
      MinValue: minValue,
      MaxValue: maxValue,
      PositiveColor: positiveColor,
      NegativeColor: negativeColor,
      ShowValue: showValue,
    };
    this.addPercentBar(percentBar);
  }

  public editPercentBar(percentBar: PercentBar): void {
    let index: number = this.getAllPercentBar().findIndex(
      pcb => pcb.ColumnId == percentBar.ColumnId
    );
    this.dispatchAction(PercentBarRedux.PercentBarEdit(percentBar));
  }

  public editPercentBarMinValue(minValue: number, columnId: string): void {
    let percentBar = this.getPercentBarByColumn(columnId);
    percentBar.MinValue = minValue;
    this.editPercentBar(percentBar);
  }

  public editPercentBarMaxValue(maxValue: number, columnId: string): void {
    let percentBar = this.getPercentBarByColumn(columnId);
    percentBar.MaxValue = maxValue;
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
}
