import { IEvent } from "./Interface/IEvent";
export declare class EventDispatcher<TSender, TArgs> implements IEvent<TSender, TArgs> {
    private _subscriptions;
    Subscribe(fn: (sender: TSender, args: TArgs) => void): void;
    Unsubscribe(fn: (sender: TSender, args: TArgs) => void): void;
    Dispatch(sender: TSender, args: TArgs): void;
}
