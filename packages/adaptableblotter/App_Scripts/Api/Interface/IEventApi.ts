
import { IAdaptableBlotter } from './IAdaptableBlotter';
import { ISearchChangedEventArgs, IStateChangedEventArgs, IColumnStateChangedEventArgs } from '../../Utilities/Interface/IStateEvents';
import { IEvent } from '../../Utilities/Interface/IEvent';

export interface IEventApi {

    /**
     * Event fired whenever search criteria in the Blotter changes, providing full coverage of what triggered the change and the current Search and Filter state.
     * Used in association with server searching.
     * @returns IEvent<IAdaptableBlotter, ISearchChangedEventArgs>
     */
    onSearchedChanged(): IEvent<IAdaptableBlotter, ISearchChangedEventArgs>;

    /**
    * Event fired whenever the state in the Blotter changes
    * Provides full coverage of what triggered the change and the new function state.*
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

