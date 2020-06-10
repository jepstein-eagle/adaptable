import { ConfigState } from './ConfigState';
import { AdaptableObject } from './Common/AdaptableObject';
export interface PercentBarState extends ConfigState {
  PercentBars?: PercentBar[];
}

export interface PercentBarRange {
  Min: number;
  Max: number;
  Color: string;
}

export interface PercentBar extends AdaptableObject {
  ColumnId: string;

  // deprecated
  NegativeValue?: number;
  PositiveValue?: number;
  NegativeColor?: string;
  PositiveColor?: string;
  PositiveValueColumnId?: string;
  NegativeValueColumnId?: string;

  Ranges?: PercentBarRange[];

  ShowValue?: boolean;
  ShowToolTip?: boolean;

  DisplayRawValue?: boolean;
  DisplayPercentageValue?: boolean;

  BackColor: string;
}
