import { IEvent } from '../../Utilities/Interface/IEvent';
import { IAdaptableBlotter } from './IAdaptableBlotter';
import { ISearchChangedEventArgs, IStateChangedEventArgs, IColumnStateChangedEventArgs } from './IStateEvents';

export interface IEventApi {

 /**
  * Event fired whenever search criteria in the Blotter changes, providing full coverage of what triggered the change and the current Search and Filter state.
  * @returns IEvent<IAdaptableBlotter, ISearchChangedEventArgs>
  */
 onSearchedChanged(): IEvent<IAdaptableBlotter, ISearchChangedEventArgs>;

 /**
 * Event fired whenever the state in the Blotter changes, providing full coverage of what triggered the change and what the new state for that function is.
 * @returns IEvent<IAdaptableBlotter, IStateChangedEventArgs>
 */
 onStateChanged(): IEvent<IAdaptableBlotter, IStateChangedEventArgs>;

 /**
 * Event fired whenever column order (and visiblity) and grid sorts in the Blotter change.
 * Only fires when in a user layout and currently just passes the name of the layout.
 * @returns IEvent<IAdaptableBlotter, IColumnStateChangedEventArgs>
 */
 onColumnStateChanged(): IEvent<IAdaptableBlotter, IColumnStateChangedEventArgs>;
}

