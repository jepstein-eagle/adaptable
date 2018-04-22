import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import { Glyphicon, Label } from 'react-bootstrap';
import * as StyleConstants from '../../Core/Constants/StyleConstants';


export interface WizardLegendProps extends React.ClassAttributes<WizardLegend> {
    StepNames: string[]
    ActiveStepName: string
    FriendlyName: string
}

export class WizardLegend extends React.Component<WizardLegendProps, {}> {
    render(): any {
        let count: number = this.props.StepNames.length - 1;
        let stepNames: any = this.props.StepNames.map((s, index) => {
            let style: string = (s == this.props.ActiveStepName) ? "primary" : "default";

            let lastStep: boolean = (index == count);
            return <span key={index}>
                <Label bsStyle={style} bsSize={"large"}>{s}</Label>
                {lastStep == false &&
                    <Glyphicon style={{ verticalAlign: "middle", margin: "5px", padding: "5px" }} glyph="resize-horizontal" />
                }
            </span>
        })

        return <div className={StyleConstants.WIZARD_LEGEND}>
            {this.props.FriendlyName} : {stepNames}
        </div>
    }
}

