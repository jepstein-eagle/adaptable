import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from './Common/AdaptableBlotterObject';

/**
 * The Predefined Configuration for the Flashing Cell function
 *
 */
export interface FlashingCellState extends RunTimeState {
  /**
   * Collection of Flashing Cell objects which define how a single cell will flash when it is changed.
   *
   * Ony operates on Numeric Cells
   */
  FlashingCells?: FlashingCell[];

  /**
   * The default colour to use for flashing when the numeric change in value is **up**.
   *
   * **Default Value: dark green**
   */
  DefaultUpColor?: string;

  /**
   * The default colour to use for flashing when the numeric change in value is **down**.
   *
   * **Default Value: red**
   */
  DefautDownColor?: string;

  /**
   * The default duration (in miliseconds) that a cell will flash when it has changed
   *
   * **Default Value: 500**
   */
  DefaultDuration?: 250 | 500 | 750 | 1000;
}

export interface FlashingCell extends AdaptableBlotterObject {
  IsLive: boolean;
  ColumnId: string;
  FlashingCellDuration: 250 | 500 | 750 | 1000;
  UpColor: string;
  DownColor: string;
}

/*
A collection of Flashing Cells

An IFlashingCell consists of 5 properties:

ColumnId: The column on which the flashing will take place as values change

IsLive: If flashing is active. Turning this off means the cell wont flash but you don't lose any settings you have made.

FlashingCellDuration: Duration (in milisseconds) that the cell will flash for. Possible values are 250, 500, 750 and 1000.

UpColor: What colour the cell will flash when the value changes in an upward direction.

DownColor: What colour the cell will flash when the value changes in a downward direction.




*/
