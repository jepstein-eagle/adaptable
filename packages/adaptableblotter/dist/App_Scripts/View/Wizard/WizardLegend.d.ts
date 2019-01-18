import * as React from "react";
export interface WizardLegendProps extends React.ClassAttributes<WizardLegend> {
    StepNames: string[];
    ActiveStepName: string;
    FriendlyName: string;
    CanShowAllSteps: boolean;
    onStepButtonClicked: (stepName: string) => void;
}
export declare class WizardLegend extends React.Component<WizardLegendProps, {}> {
    render(): any;
    private onStepButtonClicked;
}
