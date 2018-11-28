import * as React from "react";
import { IKeyValuePair } from "../../Core/Interface/Interfaces";
export interface WizardSummaryPageProps extends React.ClassAttributes<WizardSummaryPage> {
    KeyValuePairs: IKeyValuePair[];
    cssClassName: string;
    header: string;
}
export declare class WizardSummaryPage extends React.Component<WizardSummaryPageProps, {}> {
    render(): any;
}
