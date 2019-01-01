import { ApiBase } from "./ApiBase";
import { IShortcut } from './Interface/IAdaptableBlotterObjects';
export interface IShortcutApi {
    GetAll(): IShortcut[];
    Add(shortcut: IShortcut): void;
    Delete(shortcut: IShortcut): void;
    DeleteAll(): void;
}
export declare class ShortcutApi extends ApiBase implements IShortcutApi {
    GetAll(): IShortcut[];
    Add(shortcut: IShortcut): void;
    Delete(shortcut: IShortcut): void;
    DeleteAll(): void;
}
