import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import { EnumExtensions } from '../../Core/Extensions/EnumExtensions';
import { FontWeight, FontStyle } from '../../Core/Enums';
import { KeyValuePair, IColItem } from "../UIInterfaces";
import { WizardSummaryRow } from "./WizardSummaryRow";
import { Panel } from "react-bootstrap";
import { AdaptableObjectCollection } from "./AdaptableObjectCollection";


export interface WizardSummaryPageProps extends React.ClassAttributes<WizardSummaryPage> {
    KeyValuePairs: KeyValuePair[]
    cssClassName: string
    header: string
}

export class WizardSummaryPage extends React.Component<WizardSummaryPageProps, {}> {
    render(): any {
        let colItems: IColItem[] = [
            { Content: "Property", Size: 4 },
            { Content: "Value", Size: 8 },
        ]

        let summaryRows: any[] = []
        this.props.KeyValuePairs.forEach((kvp, index) => {
            summaryRows.push(<WizardSummaryRow key={index} cssClassName={this.props.cssClassName + "__summaryrow"} colItems={colItems} propertyName={kvp.Key} propertyValue={kvp.Value} />)
        })

        return <div className={this.props.cssClassName}>
            <Panel className={this.props.cssClassName} header={this.props.header+ " Summary"} bsStyle="primary">

                <AdaptableObjectCollection cssClassName={this.props.cssClassName} colItems={colItems} items={summaryRows} bsSize={"medium"} />

            </Panel>
        </div>
    }
}
