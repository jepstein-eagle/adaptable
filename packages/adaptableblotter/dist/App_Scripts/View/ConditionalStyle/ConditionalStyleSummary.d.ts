import * as React from "react";
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import * as ConditionalStyleRedux from '../../Redux/ActionsReducers/ConditionalStyleRedux';
import { IConditionalStyle, IColumnCategory } from "../../Api/Interface/IAdaptableBlotterObjects";
export interface ConditionalStyleSummaryProps extends StrategySummaryProps<ConditionalStyleSummaryComponent> {
    ConditionalStyles: IConditionalStyle[];
    ColorPalette: string[];
    ColumnCategories: IColumnCategory[];
    StyleClassNames: string[];
    onAddUpdateConditionalStyle: (index: number, conditionalStyle: IConditionalStyle) => ConditionalStyleRedux.ConditionalStyleAddUpdateAction;
}
export declare class ConditionalStyleSummaryComponent extends React.Component<ConditionalStyleSummaryProps, EditableConfigEntityState> {
    constructor(props: ConditionalStyleSummaryProps);
    render(): any;
    onNew(): void;
    onEdit(index: number, ConditionalStyle: IConditionalStyle): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
}
export declare let ConditionalStyleSummary: React.ComponentClass<any, any>;
