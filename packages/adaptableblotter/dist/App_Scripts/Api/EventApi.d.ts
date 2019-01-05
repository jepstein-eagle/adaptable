import { ApiBase } from "./ApiBase";
import { IEvent } from './Interface/IEvent';
import { IAdaptableBlotter } from './Interface/IAdaptableBlotter';
import { ISearchChangedEventArgs, IStateChangedEventArgs, IColumnStateChangedEventArgs } from './Interface/IStateEvents';
import { IEventApi } from "./Interface/IEventApi";
export declare class EventApi extends ApiBase implements IEventApi {
    onSearchedChanged(): IEvent<IAdaptableBlotter, ISearchChangedEventArgs>;
    onStateChanged(): IEvent<IAdaptableBlotter, IStateChangedEventArgs>;
    onColumnStateChanged(): IEvent<IAdaptableBlotter, IColumnStateChangedEventArgs>;
}
