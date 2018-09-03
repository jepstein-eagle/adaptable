import * as React from "react";
export interface WizardLegendProps extends React.ClassAttributes<WizardLegend> {
    StepNames: string[];
    ActiveStepName: string;
    FriendlyName: string;
}
export declare class WizardLegend extends React.Component<WizardLegendProps, {}> {
    render(): any;
}
