import * as React from "react";
import { KeyValuePair } from "../UIInterfaces";
export interface WizardSummaryPageProps extends React.ClassAttributes<WizardSummaryPage> {
    KeyValuePairs: KeyValuePair[];
    cssClassName: string;
    header: string;
}
export declare class WizardSummaryPage extends React.Component<WizardSummaryPageProps, {}> {
    render(): any;
}
