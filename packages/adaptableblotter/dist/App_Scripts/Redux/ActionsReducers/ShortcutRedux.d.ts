import { ShortcutState } from './Interface/IState';
import { MathOperation } from '../../Core/Enums';
import * as Redux from 'redux';
import { ICellInfo } from '../../Core/Interface/Interfaces';
import { IShortcut } from '../../Core/Api/Interface/IAdaptableBlotterObjects';
export declare const SHORTCUT_APPLY = "SHORTCUT_APPLY";
export declare const SHORTCUT_ADD = "SHORTCUT_ADD";
export declare const SHORTCUT_DELETE = "SHORTCUT_DELETE";
export declare const SHORTCUT_CHANGE_KEY = "SHORTCUT_CHANGE_KEY";
export declare const SHORTCUT_CHANGE_OPERATION = "SHORTCUT_CHANGE_OPERATION";
export declare const SHORTCUT_CHANGE_RESULT = "SHORTCUT_CHANGE_RESULT";
export interface ShortcutApplyAction extends Redux.Action {
    Shortcut: IShortcut;
    CellInfo: ICellInfo;
    KeyEventString: string;
    NewValue: any;
}
export interface ShortcutAddAction extends Redux.Action {
    Shortcut: IShortcut;
}
export interface ShortcutDeleteAction extends Redux.Action {
    Shortcut: IShortcut;
}
export interface ShortcutChangeKeyAction extends Redux.Action {
    Shortcut: IShortcut;
    NewShortcutKey: string;
}
export interface ShortcutChangeOperationAction extends Redux.Action {
    Shortcut: IShortcut;
    NewShortcutOperation: MathOperation;
}
export interface ShortcutChangeResultAction extends Redux.Action {
    Shortcut: IShortcut;
    NewShortcutResult: any;
}
export declare const ShortcutApply: (Shortcut: IShortcut, CellInfo: ICellInfo, KeyEventString: string, NewValue: any) => ShortcutApplyAction;
export declare const ShortcutAdd: (Shortcut: IShortcut) => ShortcutAddAction;
export declare const ShortcutChangeKey: (Shortcut: IShortcut, NewShortcutKey: string) => ShortcutChangeKeyAction;
export declare const ShortcutChangeOperation: (Shortcut: IShortcut, NewShortcutOperation: MathOperation) => ShortcutChangeOperationAction;
export declare const ShortcutChangeResult: (Shortcut: IShortcut, NewShortcutResult: any) => ShortcutChangeResultAction;
export declare const ShortcutDelete: (Shortcut: IShortcut) => ShortcutDeleteAction;
export declare const ShortcutReducer: Redux.Reducer<ShortcutState>;
