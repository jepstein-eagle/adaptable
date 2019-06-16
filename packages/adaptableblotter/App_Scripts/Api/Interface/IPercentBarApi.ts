import { PercentBarState, PercentBar } from '../../PredefinedConfig/IUserState/PercentBarState';
export interface IPercentBarApi {
  getPercentBarState(): PercentBarState;
  getAllPercentBar(): PercentBar[];
  getPercentBarByColumn(columnId: string): PercentBar;
  addPercentBar(percentBar: PercentBar): void;
  createPercentBar(
    columnId: string,
    minValue: number,
    maxValue: number,
    positiveColor: string,
    negativeColor: string,
    showValue: boolean
  ): void;
  editPercentBar(percentBar: PercentBar): void;
  editPercentBarMinValue(minValue: number, columnId: string): void;
  editPercentBarMaxValue(maxValue: number, columnId: string): void;
  editPercentBarPositiveColor(positiveColor: string, columnId: string): void;
  editPercentBarNegativeColor(negativeColor: string, columnId: string): void;
  editPercentBarShowValue(showValue: boolean, columnId: string): void;
  deletePercentBar(columnId: string): void;
}
