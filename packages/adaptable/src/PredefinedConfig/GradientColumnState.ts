import { RunTimeState } from './RunTimeState';
import { AdaptableObject } from './Common/AdaptableObject';

export interface GradientColumnState extends RunTimeState {
  GradientColumns?: GradientColumn[];
}

export interface GradientColumn extends AdaptableObject {
  ColumnId: string;
  NegativeValue?: number;
  BaseValue?: number;
  PositiveValue?: number;
  PositiveColor?: string;
  NegativeColor?: string;
}
