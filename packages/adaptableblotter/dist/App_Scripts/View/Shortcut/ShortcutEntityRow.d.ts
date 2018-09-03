import * as React from "react";
import { MathOperation } from '../../Core/Enums';
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IShortcut } from "../../Core/Api/Interface/AdaptableBlotterObjects";
export interface ShortcutEntityRowProps extends SharedEntityRowProps<ShortcutEntityRow> {
    onChangeKey: (shortcut: IShortcut, NewShortcutKey: string) => void;
    onChangeResult: (shortcut: IShortcut, NewShortcutResult: any) => void;
    onChangeOperation: (shortcut: IShortcut, NewShortcutOperation: MathOperation) => void;
    AvailableKeys: Array<string>;
    AvailableActions: Array<MathOperation>;
}
export declare class ShortcutEntityRow extends React.Component<ShortcutEntityRowProps, {}> {
    render(): any;
    onResultChange(event: React.FormEvent<any>): void;
    onKeySelectChange(event: React.FormEvent<any>): void;
    onActionChange(event: React.FormEvent<any>): void;
}
