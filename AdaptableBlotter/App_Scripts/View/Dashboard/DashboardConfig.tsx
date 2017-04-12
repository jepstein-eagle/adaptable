/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { Panel, Form, FormControl, ControlLabel, FormGroup, Col, Row, Button, ListGroup, Glyphicon, Label } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { IDashboardStrategyControl } from '../../Core/Interface/IDashboardStrategy';
import { AdaptableDashboardViewFactory } from '../AdaptableViewFactory';

interface DashboardConfigProps extends IStrategyViewPopupProps<DashboardConfigComponent> {
    DashboardControls: Array<IDashboardStrategyControl>;
    onChangeControlVisibility: (ControlName: string, IsVisible: boolean) => DashboardRedux.DashboardChangeControlVisibilityAction
    onMoveControl: (controlName: string, NewIndex: number) => DashboardRedux.DashboardMoveItemAction
}

var placeholder = document.createElement("button");
placeholder.className = "placeholder"
placeholder.classList.add("list-group-item")
placeholder.type = "button"

class DashboardConfigComponent extends React.Component<DashboardConfigProps, {}> {
    render() {

        let radioDashboardControls = this.props.DashboardControls.map((x, i) => {
            let dashboardControl = AdaptableDashboardViewFactory.get(x.Strategy);
            // let isReadOnly = this.props.EntitlementsState.FunctionEntitlements.findIndex(x => x.FunctionName == control.Strategy && x.AccessLevel == "ReadOnly") > -1
            let dashboardElememt = React.createElement(dashboardControl, { IsReadOnly: true });
            let visibleButton = x.IsVisible ?
                <Button onClick={() => this.onDashboardControlVisibilityChanged(x, false)} bsStyle="success"><Glyphicon glyph="eye-open"></Glyphicon>{' '}Visible</Button>
                : <Button onClick={() => this.onDashboardControlVisibilityChanged(x, true)} bsStyle="info"><Glyphicon glyph="eye-close"></Glyphicon>{' '}Hidden</Button>
            return <li key={"DashboardControl" + i}
                className="list-group-item">
                <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col xs={3}><Label style={{ cursor: 's-resize' }} draggable onDragStart={(event) => this.DragStart(event, x)}
                        onDragEnd={() => this.DragEnd()}><Glyphicon glyph="menu-hamburger" ></Glyphicon></Label>{' '}{x.Strategy}</Col>
                    <Col xs={2}>{visibleButton}</Col>
                    <Col xs={7} style={previewStyle}>{dashboardElememt}
                    </Col>
                </Row>
            </li>
        })

        return (
            <PanelWithImage header="Blotter Dashboard" bsStyle="primary" glyphicon="dashboard" style={panelStyle}>

                <Panel header="Dashboard Controls" bsStyle="info">
                    <ListGroup style={divStyle} onDragEnter={(event) => this.DragEnter(event)}
                        onDragOver={(event) => this.DragOver(event)}
                        onDragLeave={(event) => this.DragLeave(event)}>
                        {radioDashboardControls}
                    </ListGroup>
                </Panel>

            </PanelWithImage>
        );
    }

    onDashboardControlVisibilityChanged(dashboardControl: IDashboardStrategyControl, visible: boolean) {
        this.props.onChangeControlVisibility(dashboardControl.Strategy, visible);
    }

    private draggedHTMLElement: HTMLElement;
    private draggedElement: IDashboardStrategyControl;
    DragStart(e: React.DragEvent, controlElement: IDashboardStrategyControl) {
        //we want the listgroupitem
        this.draggedHTMLElement = (e.currentTarget as HTMLElement).parentElement.parentElement.parentElement;
        //Typescript definition is missing this method as of 12/04/17 so I'm casting to any
        (e.dataTransfer as any).setDragImage(this.draggedHTMLElement, 10, 10)
        e.dataTransfer.dropEffect = "move"
        this.draggedElement = controlElement
    }
    DragEnd() {
        if (this.draggedElement) {
            let indexOfPlaceHolder = Array.from(this.draggedHTMLElement.parentNode.childNodes).indexOf(placeholder)
            if (indexOfPlaceHolder > -1) {
                let to = indexOfPlaceHolder
                let from = this.props.DashboardControls.indexOf(this.draggedElement);
                if (from < to) {
                    to = Math.max(to - 1, 0)
                }
                //We remove our awesome placeholder
                this.draggedHTMLElement.parentNode.removeChild(placeholder);
                this.props.onMoveControl(this.draggedElement.Strategy, to)
            }
            this.draggedHTMLElement = null;
            this.draggedElement = null;
        }
    }
    DragEnter(e: React.DragEvent) {
        e.preventDefault();
        e.stopPropagation();
    }
    DragOver(e: React.DragEvent) {
        e.preventDefault();
        e.stopPropagation();

        let targetElement = (e.target) as HTMLElement;
        //we want to keep the reference of the last intem we were over to
        if (targetElement.classList.contains("placeholder")) return;
        if (targetElement.nodeName == "LI") {
            let boundingClientRect = targetElement.getBoundingClientRect()

            if (e.clientY > (boundingClientRect.top + (boundingClientRect.height / 2))) {
                if (targetElement.parentNode.lastChild == targetElement) {
                    targetElement.parentNode.appendChild(placeholder);
                }
                else {
                    targetElement.parentNode.insertBefore(placeholder, targetElement.nextSibling);
                }
            }
            else {
                targetElement.parentNode.insertBefore(placeholder, targetElement);
            }
        }
    }

    DragLeave(e: React.DragEvent) {
        e.preventDefault();
        e.stopPropagation();
    }

}
function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        DashboardControls: state.Dashboard.DashboardStrategyControls,
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onChangeControlVisibility: (controlName: string, isVisible: boolean) => dispatch(DashboardRedux.ChangeVisibilityDashboardControl(controlName, isVisible)),
        onMoveControl: (controlName: string, NewIndex: number) => dispatch(DashboardRedux.DashboardMoveItem(controlName, NewIndex))
    };
}

export let DashboardConfig = connect(mapStateToProps, mapDispatchToProps)(DashboardConfigComponent);

let divStyle = {
    'overflowY': 'auto',
    'maxHeight': '300px'
}

let panelStyle = {
    'overflowY': 'auto',
    width: '800px'
}

let previewStyle = {
    zoom: 0.75
}
