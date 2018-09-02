export interface IEvent<TSender, TArgs> {
    Subscribe(fn: (sender: TSender, args: TArgs) => void): void;
    Unsubscribe(fn: (sender: TSender, args: TArgs) => void): void;
}