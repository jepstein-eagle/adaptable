import * as React from "react";
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { ILayout } from "../../Utilities/Interface/BlotterObjects/ILayout";
export interface LayoutEntityRowProps<LayoutEntityRow> extends SharedEntityExpressionRowProps<LayoutEntityRow> {
    IsCurrentLayout: boolean;
    onSelect: (Layout: ILayout) => void;
}
export declare class LayoutEntityRow extends React.Component<LayoutEntityRowProps<LayoutEntityRow>, {}> {
    render(): any;
}
