import * as React from "react";
import { PanelProps, Panel, Glyphicon, Button, Label, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { AdaptableBlotterForm } from "../Forms/AdaptableBlotterForm";
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';
import { ButtonClose } from "../Buttons/ButtonClose";
import { ButtonConfigure } from "../Buttons/ButtonConfigure";
import { ButtonMinimise } from "../Buttons/ButtonMinimise";
import { FontSize } from "../../../Utilities/Enums";

export interface PanelDashboardProps extends PanelProps {
    headerText: string
    glyphicon: string
    onClose: () => void
    onConfigure: () => void
    onMinimise?: () => void
    showCloseButton?: boolean
    showConfigureButton?: boolean
    showMinimiseButton?: boolean
    showGlyphIcon?: boolean
    cssClassName: string
    useDefaultPanelStyle?: boolean;
}

//We cannot destructure this.props using the react way in typescript which is a real pain as you 
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
export class PanelDashboard extends React.Component<PanelDashboardProps, {}> {
    public static defaultProps: PanelDashboardProps = {
        showCloseButton: true,
        showConfigureButton: true,
        showMinimiseButton: false,
        useDefaultPanelStyle: true,
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

        let panelStyle = (this.props.useDefaultPanelStyle) ? StyleConstants.DEFAULT_BSSTYLE : StyleConstants.PRIMARY_BSSTYLE

        let header = <span>
            < span style={{ verticalAlign: "middle", marginRight: "10px", padding: "0px", fontSize: 'xsmall' }} >
                {this.props.showMinimiseButton &&
                    <span>
                        <ButtonMinimise cssClassName={cssClassName} size={"xs"} bsStyle={panelStyle} DisplayMode={"Glyph"} style={{ float: "left", marginLeft: "0px", marginRight: "20px", border: '0px', background: 'none', borderRadius: '0px', boxShadow: 'none' }} onClick={() => this.props.onMinimise()} />
                        {' '}{' '}
                    </span>
                }
                {this.props.showGlyphIcon &&
                    <Glyphicon style={{ fontSize: 'small' }} glyph={this.props.glyphicon} />
                }
                {' '}
                < span style={{ fontSize: 'small' }} >
                    {this.props.headerText}
                </ span>
            </span>
            {' '} {' '}
            {this.props.showCloseButton &&
                <ButtonClose cssClassName={cssClassName} overrideTooltip={"Close " + this.props.headerText} size='xs' bsStyle={panelStyle} DisplayMode={"Glyph"} style={{ float: "right", marginLeft: "0px", marginRight: "0px", border: '0px', background: 'none', borderRadius: '0px', boxShadow: 'none' }} onClick={() => this.props.onClose()} />
            }
            {this.props.showConfigureButton &&
                <ButtonConfigure cssClassName={cssClassName} overrideTooltip={"Configure " + this.props.headerText} size='xs' bsStyle={panelStyle} DisplayMode={"Glyph"} style={{ float: "right", marginLeft: "0px", marginRight: "0px", border: '0px', background: 'none', borderRadius: '0px', boxShadow: 'none' }} onClick={() => this.props.onConfigure()} />
            }
        </span>
        return <div className={cssClassName}>
            <Panel className="ab_small-padding-panel ab-panel-header-dashboard" header={header} bsStyle={panelStyle} style={this.props.style}>
                <AdaptableBlotterForm inline>
                    {this.props.children}
                </AdaptableBlotterForm>
            </Panel>
        </div>
    }
}