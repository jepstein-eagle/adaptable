import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';
export interface FlashingCellState extends RunTimeState {
  FlashingCells?: FlashingCell[];
  DefaultUpColor?: string;
  DefautDownColor?: string;
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

DefaultUpColor

string

The default colour used when a cell flashes 'up'.

If no value is set then Green is used.

DefautDownColor

string

The default colour used when a cell flashes down. 

If no value is set then Redis used.

DefaultDuration

Number

The default lenth of time (in miliseconds) that a cell will flash for.

Options are 250, 500 (the default if none is set), 750, 1000.


Example 41. IFlashingCell object
*/
