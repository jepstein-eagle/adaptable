import * as PercentBarRedux from '../Redux/ActionsReducers/PercentBarRedux'
import { ApiBase } from "./ApiBase";
import { IPercentBar } from './Interface/IAdaptableBlotterObjects';
import { IPercentBarApi } from './Interface/IPercentBarApi';

export class PercentBarApi extends ApiBase implements IPercentBarApi {


  // Percent Bars api methods
  public GetAll(): IPercentBar[] {
    return this.getState().PercentBar.PercentBars;
  }

  public GetByColumn(columnId: string): IPercentBar {
    let percentBar: IPercentBar = this.getState().PercentBar.PercentBars.find(pcb => pcb.ColumnId == columnId);
    return percentBar;
  }

  public Add(percentBar: IPercentBar): void {
    this.dispatchAction(PercentBarRedux.PercentBarAdd(percentBar))
  }

  public Create(columnId: string, minValue: number, maxValue: number, positiveColor: string, negativeColor: string, showValue: boolean): void {
    let percentBar: IPercentBar = {
      ColumnId: columnId,
      MinValue: minValue,
      MaxValue: maxValue,
      PositiveColor: positiveColor,
      NegativeColor: negativeColor,
      ShowValue: showValue
    }
    this.Add(percentBar);
  }

  public EditByIndex(index: number, percentBar: IPercentBar): void {
    this.dispatchAction(PercentBarRedux.PercentBarEdit(index, percentBar))
  }

  public Edit(percentBar: IPercentBar): void {
    let index: number = this.GetAll().findIndex(pcb => pcb.ColumnId == percentBar.ColumnId);
    this.EditByIndex(index, percentBar);
  }

  public EditMinValue(minValue: number, columnId: string): void {
    let percentBar = this.GetByColumn(columnId);
    percentBar.MinValue = minValue;
    let index: number = this.GetAll().findIndex(pcb => pcb.ColumnId == percentBar.ColumnId);
    this.EditByIndex(index, percentBar);
  }

  public EditMaxValue(maxValue: number, columnId: string): void {
    let percentBar = this.GetByColumn(columnId);
    percentBar.MaxValue = maxValue;
    let index: number = this.GetAll().findIndex(pcb => pcb.ColumnId == percentBar.ColumnId);
    this.EditByIndex(index, percentBar);
  }

  public EditPositiveColor(positiveColor: string, columnId: string): void {
    let percentBar = this.GetByColumn(columnId);
    percentBar.PositiveColor = positiveColor;
    let index: number = this.GetAll().findIndex(pcb => pcb.ColumnId == percentBar.ColumnId);
    this.EditByIndex(index, percentBar);
  }

  public EditNegativeColor(negativeColor: string, columnId: string): void {
    let percentBar = this.GetByColumn(columnId);
    percentBar.NegativeColor = negativeColor;
    let index: number = this.GetAll().findIndex(pcb => pcb.ColumnId == percentBar.ColumnId);
    this.EditByIndex(index, percentBar);
  }

  public EditShowValue(showValue: boolean, columnId: string): void {
    let percentBar = this.GetByColumn(columnId);
    percentBar.ShowValue = showValue;
    let index: number = this.GetAll().findIndex(pcb => pcb.ColumnId == percentBar.ColumnId);
    this.EditByIndex(index, percentBar);
  }

  public Delete(columnId: string): void {
    let index: number = this.GetAll().findIndex(pcb => pcb.ColumnId == columnId);
    this.dispatchAction(PercentBarRedux.PercentBarDelete(index))
  }

}