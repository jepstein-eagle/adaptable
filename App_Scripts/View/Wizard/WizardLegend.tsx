import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Button, Modal, Glyphicon, Label } from 'react-bootstrap';


export interface WizardLegendProps extends React.ClassAttributes<WizardLegend> {
    StepNames: string[]
    ActiveStepName: string
    FriendlyName: string
}

export class WizardLegend extends React.Component<WizardLegendProps, {}> {
    render(): any {
        let count: number = this.props.StepNames.length - 1;
        let test: any = this.props.StepNames.map((s, index) => {
            let style: string = (s == this.props.ActiveStepName) ? "primary" : "default";
            let size: any = (s == this.props.ActiveStepName) ? "medium" : "small";

            let lastStep: boolean = (index == count);
            return <span key={index}>
                <Label bsStyle={style} bsSize={"large"}>{s}</Label>
                {lastStep == false &&
                    <Glyphicon style={{ verticalAlign: "middle", margin: "5px", padding: "5px" }} glyph="resize-horizontal" />
                }
            </span>
        })

        return <div >{this.props.FriendlyName} : {test}</div>
    }
}

let glyphMarginStyle = {
    marginRight: '5px',
    marginLeft: '5px',
    marginTop: '5px',
    padding: '10px',
    align: 'bottom'

}
