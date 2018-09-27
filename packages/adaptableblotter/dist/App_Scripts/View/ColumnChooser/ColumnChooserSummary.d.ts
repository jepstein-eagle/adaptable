import * as React from "react";
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { IColumnCategory } from "../../Core/Interface/Interfaces";
export interface ColumnChooserSummaryProps extends StrategySummaryProps<ColumnChooserSummaryComponent> {
    ColumnCategories: IColumnCategory[];
}
export declare class ColumnChooserSummaryComponent extends React.Component<ColumnChooserSummaryProps, EditableConfigEntityState> {
    render(): any;
}
export declare let ColumnChooserSummary: React.ComponentClass<any, any>;
