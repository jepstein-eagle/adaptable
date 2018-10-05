import * as React from "react";
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { AccessLevel } from "../../Core/Enums";
export interface ChartEntityRowProps extends SharedEntityRowProps<ChartEntityRow> {
    onShowChart: (chart: string) => void;
    AccessLevel: AccessLevel;
}
export declare class ChartEntityRow extends React.Component<ChartEntityRowProps, {}> {
    render(): any;
}
