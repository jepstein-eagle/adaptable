import * as React from "react";
import { SortOrder } from "../../Utilities/Enums";
export interface TestDragEditorProps extends React.ClassAttributes<TestDragEditor> {
    SelectedValues: Array<any>;
    AvailableValues: Array<any>;
    HeaderAvailable: string;
    HeaderSelected: string;
    cssClassName: string;
}
export interface TestDragEditorState extends React.ClassAttributes<TestDragEditor> {
    SelectedValues: Array<any>;
    AvailableValues: Array<any>;
    UiSelectedAvailableValues: Array<any>;
    UiSelectedSelectedValues: Array<any>;
    FilterValue: string;
    SortOrder: SortOrder;
    AllValues: Array<any>;
}
export declare class TestDragEditor extends React.Component<TestDragEditorProps, TestDragEditorState> {
    private placeholder;
    constructor(props: TestDragEditorProps);
    componentWillReceiveProps(nextProps: TestDragEditorProps, nextContext: any): void;
    render(): JSX.Element;
    ensureFirstSelectedItemVisible(top: boolean): void;
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
    raiseOnChange(): void;
    onClickSelectedItem(item: any): void;
    onClickAvailableValuesItem(item: any): void;
}
