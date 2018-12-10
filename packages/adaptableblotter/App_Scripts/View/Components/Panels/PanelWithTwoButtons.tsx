import * as React from "react";
import { PanelProps, Panel, Row, Col, Button, Glyphicon, Radio } from 'react-bootstrap';
import { AdaptablePopover } from '../../AdaptablePopover';
import { MessageType, ContextMenuTab } from '../../../Utilities/Enums';
import { AdaptableBlotterForm } from "../Forms/AdaptableBlotterForm";
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';


export interface PanelWithTwoButtonsProps extends PanelProps {

    firstButtonContent?: React.ReactNode;
    firstButton?: React.ReactElement<any>;

    secondButtonContent?: React.ReactNode;
    secondButton?: React.ReactElement<any>;

    cssClassName: string

    ContextMenuTab: ContextMenuTab
    ContextMenuChanged: (e: any) => void

    IsAlwaysFilter: boolean
}

//We cannot destructure this.props using the react way in typescript which is a real pain as you 
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
export class PanelWithTwoButtons extends React.Component<PanelWithTwoButtonsProps, {}> {
    render() {
        let cssClassName = this.props.cssClassName + StyleConstants.ITEMS_PANEL

        let className = "ab_panel-with-button"
        if (this.props.className) {
            className += " " + this.props.className
        }
        className += " " + "ab_panel-with-button-reduce-header-padding"
        let header = <AdaptableBlotterForm inline>
            <Row style={{ display: "flex", alignItems: "center" }}>

                {this.props.IsAlwaysFilter ?
                    <Col xs={8}>
                        <span>Filter</span>
                    </Col>
                    :
                    <Col xs={8}>
                        <Radio inline value="Menu" checked={this.props.ContextMenuTab == ContextMenuTab.Menu} onChange={(e) => this.onSelectMenu(e)}>Menu</Radio>
                        <Radio inline value="Filter" checked={this.props.ContextMenuTab == ContextMenuTab.Filter} onChange={(e) => this.onSelectFilter(e)}>Filter</Radio>
                    </Col>
                }

                <Col xs={2}>
                    {this.props.firstButton && this.props.ContextMenuTab == ContextMenuTab.Filter && React.cloneElement(this.props.firstButton, { style: { float: 'right' } })}
                </Col>
                <Col xs={2}>
                    {this.props.secondButton && React.cloneElement(this.props.secondButton, { style: { float: 'right' } })}
                </Col>
            </Row>
        </AdaptableBlotterForm>;
        return <div className={cssClassName}>
            <Panel header={header} className={className} style={this.props.style} bsStyle={this.props.bsStyle} >
                {this.props.children}
            </Panel>
        </div>;
    }

    onSelectMenu(tab: any): any {
        this.props.ContextMenuChanged(ContextMenuTab.Menu);
    }

    onSelectFilter(tab: any): any {
        this.props.ContextMenuChanged(ContextMenuTab.Filter);
    }
}


