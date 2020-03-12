import { ConfigState } from './ConfigState';
import { AdaptableObject } from './Common/AdaptableObject';

export interface GradientColumnState extends ConfigState {
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
