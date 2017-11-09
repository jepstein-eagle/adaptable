import * as React from "react";
import * as Redux from "redux";
import { Helper } from '../../../Core/Helper'
import { PanelProps, Panel, Glyphicon } from 'react-bootstrap';
import { AdaptableBlotterForm } from "../../AdaptableBlotterForm";

export interface PanelDashboardProps extends PanelProps {
    headerText: string
    glyphicon: string
}

//We cannot destructure this.props using the react way in typescript which is a real pain as you 
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
export class PanelDashboard extends React.Component<PanelDashboardProps, {}> {
    render() {
        let header = <span><Glyphicon glyph={this.props.glyphicon} />{' '}{this.props.headerText}</span>
        return <Panel className="small-padding-panel panel-header-dashboard" header={header} bsStyle="primary" style={this.props.style}>
            <AdaptableBlotterForm inline>
                {this.props.children}
            </AdaptableBlotterForm>
        </Panel>
    }
}