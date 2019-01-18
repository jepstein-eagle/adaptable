import * as React from "react";
import { IColumn } from '../../Utilities/Interface/IColumn';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IAlertDefinition } from "../../Utilities/Interface/IAdaptableBlotterObjects";
import { MessageType } from "../../Utilities/Enums";
export interface AlertEntityRowProps extends SharedEntityExpressionRowProps<AlertEntityRow> {
    Column: IColumn;
    onChangeMessageType: (index: number, Type: MessageType) => void;
}
export declare class AlertEntityRow extends React.Component<AlertEntityRowProps, {}> {
    render(): any;
    setExpressionDescription(Alert: IAlertDefinition): string;
    private getColumnandRule;
    onMessageTypeChanged(index: number, event: React.FormEvent<any>): void;
}
