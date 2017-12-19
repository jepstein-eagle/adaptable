import * as React from "react";
import * as Redux from "redux";
import { Helper } from '../../../Core/Helper'
import { PanelProps, Panel, Glyphicon, Button } from 'react-bootstrap';
import { AdaptableBlotterForm } from "../../AdaptableBlotterForm";
import { IUIConfirmation } from "../../../Core/Interface/IStrategy";

export interface PanelDashboardProps extends PanelProps {
    headerText: string
    glyphicon: string
    onHideControl: (confirmation: IUIConfirmation) => void
}

//We cannot destructure this.props using the react way in typescript which is a real pain as you 
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
export class PanelDashboard extends React.Component<PanelDashboardProps, {}> {
    render() {
        let confirmation: IUIConfirmation = {
            CancelText: "Cancel",
            ConfirmationTitle: "Hide Dashboard Element",
            ConfirmationMsg: "Do you want to hide the element from your Dashboard?",
            ConfirmationText: "Hide",
            CancelAction: null,
            ConfirmAction: null,
            ShowCommentBox: false
        }
        let header = <span><Glyphicon glyph={this.props.glyphicon} />{' '}{this.props.headerText}{' '} <Button bsSize='xs' bsStyle="primary" style={{ float: "right", marginLeft: "10px" }} onClick={() => this.props.onHideControl(confirmation)}><Glyphicon glyph={'eye-close'} /></Button> </span>
        return <Panel className="small-padding-panel panel-header-dashboard" header={header} bsStyle="primary" style={this.props.style}>
            <AdaptableBlotterForm inline>
                {this.props.children}
            </AdaptableBlotterForm>
        </Panel>
    }
}