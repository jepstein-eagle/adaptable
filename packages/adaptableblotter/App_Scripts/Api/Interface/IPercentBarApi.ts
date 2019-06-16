import {
  PercentBarState,
  IPercentBar,
} from '../../PredefinedConfig/IUserState Interfaces/PercentBarState';
export interface IPercentBarApi {
  getPercentBarState(): PercentBarState;
  getAllPercentBar(): IPercentBar[];
  getPercentBarByColumn(columnId: string): IPercentBar;
  addPercentBar(percentBar: IPercentBar): void;
  createPercentBar(
    columnId: string,
    minValue: number,
    maxValue: number,
    positiveColor: string,
    negativeColor: string,
    showValue: boolean
  ): void;
  editPercentBar(percentBar: IPercentBar): void;
  editPercentBarMinValue(minValue: number, columnId: string): void;
  editPercentBarMaxValue(maxValue: number, columnId: string): void;
  editPercentBarPositiveColor(positiveColor: string, columnId: string): void;
  editPercentBarNegativeColor(negativeColor: string, columnId: string): void;
  editPercentBarShowValue(showValue: boolean, columnId: string): void;
  deletePercentBar(columnId: string): void;
}
