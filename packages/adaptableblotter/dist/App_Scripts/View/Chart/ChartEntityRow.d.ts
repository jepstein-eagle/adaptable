import * as React from "react";
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
export interface ChartEntityRowProps extends SharedEntityRowProps<ChartEntityRow> {
    onShowChart: (chart: string) => void;
}
export declare class ChartEntityRow extends React.Component<ChartEntityRowProps, {}> {
    render(): any;
}
