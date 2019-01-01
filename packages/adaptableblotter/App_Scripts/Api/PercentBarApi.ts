import * as PercentBarRedux from '../Redux/ActionsReducers/PercentBarRedux'
import { ApiBase } from "./ApiBase";
import { Visibility, MathOperation } from '../Utilities/Enums';
import { IPercentBar } from './Interface/IAdaptableBlotterObjects';

export interface IPercentBarApi {
    
  // Percent Bars api methods
  percentBarGetAll(): IPercentBar[];
  percentBarGetByColumn(columnId: string): IPercentBar;
  percentBarAdd(percentBar: IPercentBar): void;
  percentBarCreate(columnId: string, minValue: number, maxValue: number, positiveColor: string, negativeColor: string, showValue: boolean): void;
  percentBarEditByIndex(index: number, percentBar: IPercentBar): void;
  percentBarEdit(percentBar: IPercentBar): void;
  percentBarEditMinValue(minValue: number, columnId: string): void;
  percentBarEditMaxValue(maxValue: number, columnId: string): void;
  percentBarEditPositiveColor(positiveColor: string, columnId: string): void;
  percentBarEditNegativeColor(negativeColor: string, columnId: string): void;
  percentBarEditShowValue(showValue: boolean, columnId: string): void;
  percentBarDelete(columnId: string): void

}



export class PercentBarApi extends ApiBase implements IPercentBarApi {

   
  // Percent Bars api methods
  public percentBarGetAll(): IPercentBar[] {
    return this.getState().PercentBar.PercentBars;
  }

  public percentBarGetByColumn(columnId: string): IPercentBar {
    let percentBar: IPercentBar = this.getState().PercentBar.PercentBars.find(pcb => pcb.ColumnId == columnId);
    return percentBar;
  }

  public percentBarAdd(percentBar: IPercentBar): void {
    this.dispatchAction(PercentBarRedux.PercentBarAdd(percentBar))
  }

  public percentBarCreate(columnId: string, minValue: number, maxValue: number, positiveColor: string, negativeColor: string, showValue: boolean): void {
    let percentBar: IPercentBar = {
      ColumnId: columnId,
      MinValue: minValue,
      MaxValue: maxValue,
      PositiveColor: positiveColor,
      NegativeColor: negativeColor,
      ShowValue: showValue
    }
    this.percentBarAdd(percentBar);
  }

  public percentBarEditByIndex(index: number, percentBar: IPercentBar): void {
    this.dispatchAction(PercentBarRedux.PercentBarEdit(index, percentBar))
  }

  public percentBarEdit(percentBar: IPercentBar): void {
    let index: number = this.percentBarGetAll().findIndex(pcb => pcb.ColumnId == percentBar.ColumnId);
    this.percentBarEditByIndex(index, percentBar);
  }

  public percentBarEditMinValue(minValue: number, columnId: string): void {
    let percentBar = this.percentBarGetByColumn(columnId);
    percentBar.MinValue = minValue;
    let index: number = this.percentBarGetAll().findIndex(pcb => pcb.ColumnId == percentBar.ColumnId);
    this.percentBarEditByIndex(index, percentBar);
  }

  public percentBarEditMaxValue(maxValue: number, columnId: string): void {
    let percentBar = this.percentBarGetByColumn(columnId);
    percentBar.MaxValue = maxValue;
    let index: number = this.percentBarGetAll().findIndex(pcb => pcb.ColumnId == percentBar.ColumnId);
    this.percentBarEditByIndex(index, percentBar);
  }

  public percentBarEditPositiveColor(positiveColor: string, columnId: string): void {
    let percentBar = this.percentBarGetByColumn(columnId);
    percentBar.PositiveColor = positiveColor;
    let index: number = this.percentBarGetAll().findIndex(pcb => pcb.ColumnId == percentBar.ColumnId);
    this.percentBarEditByIndex(index, percentBar);
  }

  public percentBarEditNegativeColor(negativeColor: string, columnId: string): void {
    let percentBar = this.percentBarGetByColumn(columnId);
    percentBar.NegativeColor = negativeColor;
    let index: number = this.percentBarGetAll().findIndex(pcb => pcb.ColumnId == percentBar.ColumnId);
    this.percentBarEditByIndex(index, percentBar);
  }

  public percentBarEditShowValue(showValue: boolean, columnId: string): void {
    let percentBar = this.percentBarGetByColumn(columnId);
    percentBar.ShowValue = showValue;
    let index: number = this.percentBarGetAll().findIndex(pcb => pcb.ColumnId == percentBar.ColumnId);
    this.percentBarEditByIndex(index, percentBar);
  }

  public percentBarDelete(columnId: string): void {
    let index: number = this.percentBarGetAll().findIndex(pcb => pcb.ColumnId == columnId);
    this.dispatchAction(PercentBarRedux.PercentBarDelete(index))
  }

}