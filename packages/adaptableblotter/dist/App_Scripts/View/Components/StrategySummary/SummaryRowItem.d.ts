import * as React from "react";
export interface SummaryRowItemProps extends React.ClassAttributes<SummaryRowItem> {
    SummaryItems: any[];
    cssClassName: string;
}
export declare class SummaryRowItem extends React.Component<SummaryRowItemProps, {}> {
    render(): any;
}
