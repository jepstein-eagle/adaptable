import { IShortcut } from "../../Utilities/Interface/BlotterObjects/IShortcut";
import { ShortcutState } from "../../Redux/ActionsReducers/Interface/IState";
export interface IShortcutApi {
  GetState(): ShortcutState;
  GetAll(): IShortcut[];
  Add(shortcut: IShortcut): void;
  Delete(shortcut: IShortcut): void;
  DeleteAll(): void;
}
