import * as React from "react";
import { PanelProps, Panel, Glyphicon, Button, Label, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { AdaptableBlotterForm } from "../Forms/AdaptableBlotterForm";

export interface PanelDashboardProps extends PanelProps {
    headerText: string
    glyphicon: string
    onClose: () => void
    onConfigure: () => void
    onMinimise?: () => void
    panelStyle?: string
    showCloseButton?: boolean
    showConfigureButton?: boolean
    showMinimiseButton?: boolean
}

//We cannot destructure this.props using the react way in typescript which is a real pain as you 
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
export class PanelDashboard extends React.Component<PanelDashboardProps, {}> {
    public static defaultProps: PanelDashboardProps = {
        showCloseButton: true,
        showConfigureButton: true,
        showMinimiseButton: false,
        panelStyle: "primary",
        headerText: "Function",
        glyphicon: "home",
        onClose: null,
        onConfigure: null,
        onMinimise: null

    };
    render() {
       
        let header = <span>
            <Label bsStyle={this.props.panelStyle} style={{ verticalAlign: "middle", margin: "0px", padding: "0px" }} >
                {this.props.showMinimiseButton &&
                    <span>
                     <OverlayTrigger overlay={<Tooltip id="tooltipShowClose">Hide Toolbars</Tooltip>}>
                   <Button bsSize={"xs"} bsStyle={this.props.panelStyle} style={{ float: "left", marginLeft: "0px", marginRight: "20px" }} onClick={() => this.props.onMinimise()}>
                            <Glyphicon glyph={'chevron-up'} />
                        </Button>
                        </OverlayTrigger>
                        {' '}{' '}
                    </span>
                }
                <Glyphicon glyph={this.props.glyphicon} />
                {' '}
                {this.props.headerText}
            </Label>
            {' '}
            {this.props.showCloseButton &&
                <OverlayTrigger overlay={<Tooltip id="tooltipShowInformation">Close {this.props.headerText}</Tooltip>}>
                    <Button bsSize='xs' bsStyle={this.props.panelStyle} style={{ float: "right", marginLeft: "0px", marginRight: "0px" }} onClick={() => this.props.onClose()}>
                        <Glyphicon glyph={'remove'} />
                    </Button>
                </OverlayTrigger>
            }
            {this.props.showConfigureButton &&
                <OverlayTrigger overlay={<Tooltip id="tooltipShowInformation">Configure {this.props.headerText}</Tooltip>}>
                    <Button bsSize='xs' bsStyle={this.props.panelStyle} style={{ float: "right", marginLeft: "10px", marginRight: "0px" }} onClick={() => this.props.onConfigure()}>
                        <Glyphicon glyph={'wrench'} />
                    </Button>
                </OverlayTrigger>
            }
        </span>
        return <Panel className="small-padding-panel panel-header-dashboard" header={header} bsStyle={this.props.panelStyle} style={this.props.style}>
            <AdaptableBlotterForm inline>
                {this.props.children}
            </AdaptableBlotterForm>
        </Panel>
    }
}