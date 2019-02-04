import * as React from "react";
import { IColumn } from "../../Utilities/Interface/IColumn";
import { IUserFilter } from "../../Utilities/Interface/BlotterObjects/IUserFilter";
import { IPreviewInfo } from "../../Utilities/Interface/IPreview";
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
