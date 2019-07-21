import { DesignTimeState } from './DesignTimeState';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';

export interface ActionColumnState extends DesignTimeState {
  ActionColumns?: ActionColumn[];
}

export interface ActionColumn extends AdaptableBlotterObject {
  ColumnId: string;
  ButtonText?: string;
  RenderFunctionName?: string;
}
