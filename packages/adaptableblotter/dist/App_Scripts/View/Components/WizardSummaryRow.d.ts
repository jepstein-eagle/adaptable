import * as React from "react";
import { BaseRowProps } from './SharedProps/ConfigEntityRowProps';
export interface WizardSummaryRowProps<WizardSummaryRow> extends BaseRowProps<WizardSummaryRow> {
    propertyName: string;
    propertyValue: any;
}
export declare class WizardSummaryRow extends React.Component<WizardSummaryRowProps<WizardSummaryRow>, {}> {
    render(): any;
}
