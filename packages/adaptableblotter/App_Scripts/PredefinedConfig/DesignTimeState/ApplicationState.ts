import { DesignTimeState } from './DesignTimeState';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';

export interface ApplicationState extends DesignTimeState {
  ApplicationToolbarButtons?: ApplicationToolbarButton[];
}

export interface ApplicationToolbarButton extends AdaptableBlotterObject {
  ButtonText: string;
  //IMAGES????
  // RenderFunctionName?: string;
}
