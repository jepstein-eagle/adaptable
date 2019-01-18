import * as React from "react";
import { SortOrder } from '../../../Utilities/Enums';
import { IMasterChildren } from "../../../Utilities/Interface/IMasterChildren";
export interface IMasterValue {
    value: string;
    isOpen: boolean;
    isAvailable: boolean;
}
export interface DualListBoxEditorProps extends React.ClassAttributes<DualListBoxEditor> {
    SelectedValues: Array<any>;
    AvailableValues: Array<any>;
    onChange: (SelectedValues: Array<any>) => void;
    HeaderAvailable: string;
    HeaderSelected: string;
    DisplayMember?: string;
    ValueMember?: string;
    SortMember?: string;
    ReducedDisplay?: boolean;
    MasterChildren?: IMasterChildren[];
    cssClassName: string;
}
export interface DualListBoxEditorState extends React.ClassAttributes<DualListBoxEditor> {
    SelectedValues: Array<any>;
    AvailableValues: Array<any>;
    UiSelectedAvailableValues: Array<any>;
    UiSelectedSelectedValues: Array<any>;
    FilterValue: string;
    SortOrder: SortOrder;
    AllValues: Array<any>;
    MasterValues: Array<IMasterValue>;
}
export declare class DualListBoxEditor extends React.Component<DualListBoxEditorProps, DualListBoxEditorState> {
    private placeholder;
    constructor(props: DualListBoxEditorProps);
    componentWillReceiveProps(nextProps: DualListBoxEditorProps, nextContext: any): void;
    render(): JSX.Element;
    buildMasterValues(masterChildren: IMasterChildren[]): IMasterValue[];
    onMasterValueCheckChanged(event: React.FormEvent<any>, item: any): void;
    createAvailableValuesList(availableValues: any[], sortOrder: SortOrder, sortMember: string): any[];
    isValueFilteredOut(item: string): boolean;
    canGoTopOrUp(): boolean;
    canGoDownOrBottom(): boolean;
    ensureFirstSelectedItemVisible(top: boolean): void;
    Top(): void;
    Up(): void;
    Bottom(): void;
    Down(): void;
    Add(): void;
    AddAll(): void;
    getValuesToAdd(addedValues: any[]): any[];
    RemoveAll(): void;
    Remove(): void;
    private draggedHTMLElement;
    private draggedElement;
    private overHTMLElement;
    DragSelectedStart(e: React.DragEvent<any>, listElement: any): void;
    DragSelectedEnd(): void;
    DragAvailableStart(e: React.DragEvent<any>, listElement: any): void;
    DragAvailableEnd(): void;
    DragEnterAvailable(e: React.DragEvent<any>): void;
    DragOverAvailable(e: React.DragEvent<any>): void;
    DragLeaveAvailable(e: React.DragEvent<any>): void;
    DragEnterSelected(e: React.DragEvent<any>): void;
    DragOverSelected(e: React.DragEvent<any>): void;
    DragLeaveSelected(e: React.DragEvent<any>): void;
    handleChangeFilterValue(x: string): void;
    sortColumnValues(): void;
    raiseOnChange(): void;
    onClickSelectedItem(item: any): void;
    onClickAvailableValuesItem(item: any): void;
}
