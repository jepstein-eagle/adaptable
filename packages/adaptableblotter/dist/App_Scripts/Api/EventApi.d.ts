import { ApiBase } from "./ApiBase";
import { IEvent } from '../Utilities/Interface/IEvent';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { ISearchChangedEventArgs, IStateChangedEventArgs, IColumnStateChangedEventArgs, IAlertFiredEventArgs } from '../Utilities/Interface/IStateEvents';
import { IEventApi } from "./Interface/IEventApi";
import { EventDispatcher } from "../Utilities/EventDispatcher";
export declare class EventApi extends ApiBase implements IEventApi {
    _onSearchedChanged: EventDispatcher<IAdaptableBlotter, ISearchChangedEventArgs>;
    _onStateChanged: EventDispatcher<IAdaptableBlotter, IStateChangedEventArgs>;
    _onColumnStateChanged: EventDispatcher<IAdaptableBlotter, IColumnStateChangedEventArgs>;
    _onAlertFired: EventDispatcher<IAdaptableBlotter, IAlertFiredEventArgs>;
    constructor(blotter: IAdaptableBlotter);
    onSearchedChanged(): IEvent<IAdaptableBlotter, ISearchChangedEventArgs>;
    onStateChanged(): IEvent<IAdaptableBlotter, IStateChangedEventArgs>;
    onColumnStateChanged(): IEvent<IAdaptableBlotter, IColumnStateChangedEventArgs>;
    onAlertFired(): IEvent<IAdaptableBlotter, IAlertFiredEventArgs>;
}
