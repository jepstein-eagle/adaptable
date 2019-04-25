import { ApiBase } from "./ApiBase";
import { IShortcut } from "../Utilities/Interface/BlotterObjects/IShortcut";
import { IShortcutApi } from './Interface/IShortcutApi';
import { ShortcutState } from '../Redux/ActionsReducers/Interface/IState';
export declare class ShortcutApi extends ApiBase implements IShortcutApi {
    GetState(): ShortcutState;
    GetAll(): IShortcut[];
    Add(shortcut: IShortcut): void;
    Delete(shortcut: IShortcut): void;
    DeleteAll(): void;
}
