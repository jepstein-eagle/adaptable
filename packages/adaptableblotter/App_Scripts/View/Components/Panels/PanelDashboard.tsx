import * as React from "react";
import { PanelProps, Panel, Glyphicon, Button, Label, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { AdaptableBlotterForm } from "../Forms/AdaptableBlotterForm";
import * as StyleConstants from '../../../Core/Constants/StyleConstants';
import { ButtonClose } from "../Buttons/ButtonClose";
import { ButtonConfigure } from "../Buttons/ButtonConfigure";
import { ButtonMinimise } from "../Buttons/ButtonMinimise";

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
    showGlyphIcon?: boolean
    cssClassName: string
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
        onMinimise: null,
        showGlyphIcon: true,
        cssClassName: ""

    };
    render() {
        let cssClassName = this.props.cssClassName + StyleConstants.DASHBOARD_PANEL

        let header = <span>
            <Label bsStyle={this.props.panelStyle} style={{ verticalAlign: "middle", marginRight: "10px", padding: "0px" }} >
                {this.props.showMinimiseButton &&
                    <span>
                        <ButtonMinimise cssClassName={cssClassName} size={"xs"} bsStyle={"primary"} DisplayMode={"Glyph"} style={{ float: "left", marginLeft: "0px", marginRight: "20px" }} onClick={() => this.props.onMinimise()} />
                        {' '}{' '}
                    </span>
                }
                {this.props.showGlyphIcon &&
                    <Glyphicon glyph={this.props.glyphicon} />
                }
                {' '}
                {this.props.headerText}
            </Label>
            {' '} {' '}
            {this.props.showCloseButton &&
                <ButtonClose cssClassName={cssClassName} overrideTooltip={"Close " + this.props.headerText} size='xs' bsStyle={"primary"} DisplayMode={"Glyph"} style={{ float: "right", marginLeft: "0px", marginRight: "0px" }} onClick={() => this.props.onClose()} />
            }
            {this.props.showConfigureButton &&
                <ButtonConfigure cssClassName={cssClassName} overrideTooltip={"Configure " + this.props.headerText} size='xs' bsStyle={"primary"} DisplayMode={"Glyph"} style={{ float: "right", marginLeft: "0px", marginRight: "0px" }} onClick={() => this.props.onConfigure()} />
            }
        </span>
        return <div className={cssClassName}>
            <Panel className="ab_small-padding-panel ab-panel-header-dashboard" header={header} bsStyle={this.props.panelStyle} style={this.props.style}>
                <AdaptableBlotterForm inline>
                    {this.props.children}
                </AdaptableBlotterForm>
            </Panel>
        </div>
    }
}