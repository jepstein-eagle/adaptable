import { ConfigState } from './ConfigState';
import { AdaptableObject } from './Common/AdaptableObject';
export interface PercentBarState extends ConfigState {
  PercentBars?: PercentBar[];
}

interface PercentBarRange {
  Min: number;
  Max: number;
  Color: string;
}

export interface PercentBar extends AdaptableObject {
  ColumnId: string;
  NegativeValue?: number;
  PositiveValue?: number;
  NegativeColor?: string;
  PositiveColor?: string;
  ShowValue?: boolean;
  PositiveValueColumnId?: string;
  NegativeValueColumnId?: string;
  ShowToolTip?: boolean;

  Ranges: PercentBarRange[];
  DisplayType: 'Inside' | 'Tooltip';
  DisplayValue: 'Percentage' | 'Raw';
}
