import * as React from "react";
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import * as CustomSortRedux from '../../Redux/ActionsReducers/CustomSortRedux';
import { ICustomSort } from "../../Utilities/Interface/BlotterObjects/ICustomSort";
export interface CustomSortSummaryProps extends StrategySummaryProps<CustomSortSummaryComponent> {
    CustomSorts: ICustomSort[];
    onAddCustomSort: (customSort: ICustomSort) => CustomSortRedux.CustomSortAddAction;
    onEditCustomSort: (customSort: ICustomSort) => CustomSortRedux.CustomSortEditAction;
}
export declare class CustomSortSummaryComponent extends React.Component<CustomSortSummaryProps, EditableConfigEntityState> {
    constructor(props: CustomSortSummaryProps);
    render(): any;
    onNew(): void;
    onEdit(customSort: ICustomSort): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
}
export declare let CustomSortSummary: React.ComponentClass<any, any>;
