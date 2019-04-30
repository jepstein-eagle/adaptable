import { ApiBase } from "./ApiBase";
import { IShortcut } from "../Utilities/Interface/BlotterObjects/IShortcut";
import { IShortcutApi } from './Interface/IShortcutApi';
import { ShortcutState } from '../Redux/ActionsReducers/Interface/IState';
export declare class ShortcutApi extends ApiBase implements IShortcutApi {
    getShortcutState(): ShortcutState;
    getAllShortcut(): IShortcut[];
    addShortcut(shortcut: IShortcut): void;
    deleteShortcut(shortcut: IShortcut): void;
    deleteAllShortcut(): void;
}
