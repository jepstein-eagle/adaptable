import * as React from "react";
import { PanelProps, Panel, Row, Col, Radio } from 'react-bootstrap';
import { ContextMenuTab } from '../../../Utilities/Enums';
import { AdaptableBlotterForm } from "../Forms/AdaptableBlotterForm";
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';


export interface FilterFormPanelProps extends PanelProps {

    clearFilterButton?: React.ReactElement<any>;

    saveButton?: React.ReactElement<any>;

    closeButton?: React.ReactElement<any>;

    cssClassName: string

    ContextMenuTab: ContextMenuTab
    ContextMenuChanged: (e: any) => void

    IsAlwaysFilter: boolean

    showCloseButton: boolean
}

//We cannot destructure this.props using the react way in typescript which is a real pain as you 
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
export class FilterFormPanel extends React.Component<FilterFormPanelProps, {}> {
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
                    <Col xs={6}>
                        <span>Filter</span>
                    </Col>
                    :
                    <Col xs={6}>
                        <Row>
                            <Col xs={3} />
                            <Col xs={9}>
                                <Radio inline value="Menu" checked={this.props.ContextMenuTab == ContextMenuTab.Menu} onChange={(e) => this.onSelectMenu()}>Menu</Radio>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={3} />
                            <Col xs={9}>
                                <Radio inline value="Filter" checked={this.props.ContextMenuTab == ContextMenuTab.Filter} onChange={(e) => this.onSelectFilter()}>Filter</Radio>
                            </Col>
                        </Row>
                    </Col>
                }

                <Col xs={2}>
                    {this.props.clearFilterButton && this.props.ContextMenuTab == ContextMenuTab.Filter && React.cloneElement(this.props.clearFilterButton, { style: { float: 'right' } })}
                </Col>
                <Col xs={2}>
                    {this.props.saveButton && this.props.ContextMenuTab == ContextMenuTab.Filter && React.cloneElement(this.props.saveButton, { style: { float: 'right' } })}
                </Col>
                {this.props.showCloseButton &&
                    <Col xs={2}>
                        {this.props.closeButton && React.cloneElement(this.props.closeButton, { style: { float: 'right' } })}
                    </Col>
                }
            </Row>
        </AdaptableBlotterForm>;
        return <div className={cssClassName}>
            <Panel header={header} className={className} style={this.props.style} bsStyle={this.props.bsStyle} >
                {this.props.children}
            </Panel>
        </div>;
    }

    onSelectMenu(): any {
        this.props.ContextMenuChanged(ContextMenuTab.Menu);
    }

    onSelectFilter(): any {
        this.props.ContextMenuChanged(ContextMenuTab.Filter);
    }
}


