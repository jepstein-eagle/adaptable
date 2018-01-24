import * as React from "react";
import * as Redux from "redux";
import { Helper } from '../../../Core/Helper'
import { PanelProps, Panel, Glyphicon, Button, Label, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { AdaptableBlotterForm } from "../../AdaptableBlotterForm";
import { IUIConfirmation } from "../../../Core/Interface/IStrategy";

export interface PanelDashboardProps extends PanelProps {
    headerText: string
    glyphicon: string
    onClose: () => void
    onConfigure: () => void
    panelStyle?: string
}

//We cannot destructure this.props using the react way in typescript which is a real pain as you 
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
export class PanelDashboard extends React.Component<PanelDashboardProps, {}> {
    render() {
        let panelStyle: string = (this.props.panelStyle) ? this.props.panelStyle : "primary"


        let header = <span>
            <Label bsStyle={panelStyle} style={{ verticalAlign: "middle", margin: "0px", padding: "0px" }} >
                <Glyphicon glyph={this.props.glyphicon} />
                {' '}
                {this.props.headerText}
            </Label>
            {' '}
            <OverlayTrigger overlay={<Tooltip id="tooltipShowInformation">Close {this.props.headerText}</Tooltip>}>
                <Button bsSize='xs' bsStyle={panelStyle} style={{ float: "right", marginLeft: "0px", marginRight: "0px" }} onClick={() => this.props.onClose()}>
                    <Glyphicon glyph={'remove'} />
                </Button>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip id="tooltipShowInformation">Configure {this.props.headerText}</Tooltip>}>
                <Button bsSize='xs' bsStyle={panelStyle} style={{ float: "right", marginLeft: "10px", marginRight: "0px" }} onClick={() => this.props.onConfigure()}>
                    <Glyphicon glyph={'wrench'} />
                </Button>
            </OverlayTrigger>
        </span>
        return <Panel className="small-padding-panel panel-header-dashboard" header={header} bsStyle={panelStyle} style={this.props.style}>
            <AdaptableBlotterForm inline>
                {this.props.children}
            </AdaptableBlotterForm>
        </Panel>
    }
}