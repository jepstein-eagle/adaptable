import { ApiBase } from "./ApiBase";
import { IShortcut } from "../Utilities/Interface/BlotterObjects/IShortcut";
import { IShortcutApi } from './Interface/IShortcutApi';
export declare class ShortcutApi extends ApiBase implements IShortcutApi {
    GetAll(): IShortcut[];
    Add(shortcut: IShortcut): void;
    Delete(shortcut: IShortcut): void;
    DeleteAll(): void;
}
