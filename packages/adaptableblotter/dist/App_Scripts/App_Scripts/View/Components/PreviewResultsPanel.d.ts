import * as React from "react";
import { IPreviewInfo } from "../../Core/Interface/IPreviewResult";
import { IColumn } from "../../Core/Interface/IColumn";
import { IUserFilter } from "../../Api/Interface/IAdaptableBlotterObjects";
export interface PreviewResultsPanelProps extends React.ClassAttributes<PreviewResultsPanel> {
    UpdateValue: string;
    PreviewInfo: IPreviewInfo;
    Columns: IColumn[];
    UserFilters: IUserFilter[];
    SelectedColumn: IColumn;
    ShowPanel: boolean;
    cssClassName: string;
    ShowHeader: boolean;
}
export declare class PreviewResultsPanel extends React.Component<PreviewResultsPanelProps, {}> {
    render(): any;
    private getValidationErrorMessage;
}
