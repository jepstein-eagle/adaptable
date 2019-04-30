import * as PercentBarRedux from '../Redux/ActionsReducers/PercentBarRedux'
import { ApiBase } from "./ApiBase";
import { IPercentBar } from "../Utilities/Interface/BlotterObjects/IPercentBar";
import { IPercentBarApi } from './Interface/IPercentBarApi';
import { PercentBarState } from '../Redux/ActionsReducers/Interface/IState';

export class PercentBarApi extends ApiBase implements IPercentBarApi {

 
  public getPercentBarState(): PercentBarState {
    return this.getBlotterState().PercentBar;
}

public getAllPercentBar(): IPercentBar[] {
    return this.getBlotterState().PercentBar.PercentBars;
  }

  public getPercentBarByColumn(columnId: string): IPercentBar {
    let percentBar: IPercentBar = this.getBlotterState().PercentBar.PercentBars.find(pcb => pcb.ColumnId == columnId);
    return percentBar;
  }

  public addPercentBar(percentBar: IPercentBar): void {
    this.dispatchAction(PercentBarRedux.PercentBarAdd(percentBar))
  }

  public createPercentBar(columnId: string, minValue: number, maxValue: number, positiveColor: string, negativeColor: string, showValue: boolean): void {
    let percentBar: IPercentBar = {
      ColumnId: columnId,
      MinValue: minValue,
      MaxValue: maxValue,
      PositiveColor: positiveColor,
      NegativeColor: negativeColor,
      ShowValue: showValue
    }
    this.addPercentBar(percentBar);
  }

  public editPercentBarByIndex(index: number, percentBar: IPercentBar): void {
    this.dispatchAction(PercentBarRedux.PercentBarEdit(index, percentBar))
  }

  public editPercentBar(percentBar: IPercentBar): void {
    let index: number = this.getAllPercentBar().findIndex(pcb => pcb.ColumnId == percentBar.ColumnId);
    this.editPercentBarByIndex(index, percentBar);
  }

  public editPercentBarMinValue(minValue: number, columnId: string): void {
    let percentBar = this.getPercentBarByColumn(columnId);
    percentBar.MinValue = minValue;
    let index: number = this.getAllPercentBar().findIndex(pcb => pcb.ColumnId == percentBar.ColumnId);
    this.editPercentBarByIndex(index, percentBar);
  }

  public editPercentBarMaxValue(maxValue: number, columnId: string): void {
    let percentBar = this.getPercentBarByColumn(columnId);
    percentBar.MaxValue = maxValue;
    let index: number = this.getAllPercentBar().findIndex(pcb => pcb.ColumnId == percentBar.ColumnId);
    this.editPercentBarByIndex(index, percentBar);
  }

  public editPercentBarPositiveColor(positiveColor: string, columnId: string): void {
    let percentBar = this.getPercentBarByColumn(columnId);
    percentBar.PositiveColor = positiveColor;
    let index: number = this.getAllPercentBar().findIndex(pcb => pcb.ColumnId == percentBar.ColumnId);
    this.editPercentBarByIndex(index, percentBar);
  }

  public editPercentBarNegativeColor(negativeColor: string, columnId: string): void {
    let percentBar = this.getPercentBarByColumn(columnId);
    percentBar.NegativeColor = negativeColor;
    let index: number = this.getAllPercentBar().findIndex(pcb => pcb.ColumnId == percentBar.ColumnId);
    this.editPercentBarByIndex(index, percentBar);
  }

  public editPercentBarShowValue(showValue: boolean, columnId: string): void {
    let percentBar = this.getPercentBarByColumn(columnId);
    percentBar.ShowValue = showValue;
    let index: number = this.getAllPercentBar().findIndex(pcb => pcb.ColumnId == percentBar.ColumnId);
    this.editPercentBarByIndex(index, percentBar);
  }

  public deletePercentBar(columnId: string): void {
    let index: number = this.getAllPercentBar().findIndex(pcb => pcb.ColumnId == columnId);
    this.dispatchAction(PercentBarRedux.PercentBarDelete(index))
  }

}