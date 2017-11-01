import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import { Panel, InputGroup, Form, FormControl, ControlLabel, FormGroup, Col, Row, Button, ListGroup, Glyphicon, Label } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { AdaptableBlotterPopup } from '../Components/Popups/AdaptableBlotterPopup';
import { IDashboardStrategyControlConfiguration } from '../../Core/Interface/IDashboardStrategy';
import { AdaptableDashboardViewFactory } from '../AdaptableViewFactory';
import { AdaptableDashboardConfigurationViewFactory } from '../AdaptableViewFactory';
import * as StrategyIds from '../../Core/StrategyIds'
import { Helper } from '../../Core/Helper'
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'

interface DashboardConfigProps extends IStrategyViewPopupProps<DashboardConfigComponent> {
    DashboardControls: Array<IDashboardStrategyControlConfiguration>;
    DashboardZoom: Number;
    onChangeControlVisibility: (ControlName: string, IsVisible: boolean) => DashboardRedux.DashboardChangeControlVisibilityAction
    onSetDashboardZoom: (zoom: number) => DashboardRedux.DashboardSetZoomAction,
    onMoveControl: (controlName: string, NewIndex: number) => DashboardRedux.DashboardMoveItemAction
}
interface DashboardConfigState {
    CurrentDashboardConfig: string;
    EditedZoomFactor: Number;
}

class DashboardConfigComponent extends React.Component<DashboardConfigProps, DashboardConfigState> {
    private placeholder: HTMLButtonElement
    constructor(props: DashboardConfigProps) {
        super(props)
        this.placeholder = document.createElement("button");
        this.placeholder.className = "placeholder"
        this.placeholder.classList.add("list-group-item")
        this.placeholder.type = "button"
        this.state = { CurrentDashboardConfig: "", EditedZoomFactor: props.DashboardZoom }
    }
    render() {

        let radioDashboardControls = this.props.DashboardControls.map((x, i) => {
            let dashboardControl = AdaptableDashboardViewFactory.get(x.Strategy);
            // let isReadOnly = this.props.EntitlementsState.FunctionEntitlements.findIndex(x => x.FunctionName == control.Strategy && x.AccessLevel == "ReadOnly") > -1
            let dashboardElememt = React.createElement(dashboardControl, { IsReadOnly: true });
            let visibleButton = x.IsVisible ?
                <Button onClick={() => this.onDashboardControlVisibilityChanged(x, false)} bsStyle="success" bsSize="small"><Glyphicon glyph="eye-open"></Glyphicon>{' '}Visible</Button>
                : <Button onClick={() => this.onDashboardControlVisibilityChanged(x, true)} bsStyle="info" bsSize="small"><Glyphicon glyph="eye-close"></Glyphicon>{' '}Hidden</Button>
            if (x.Strategy == StrategyIds.FunctionsStrategyId) {
                //we want to prevent people from hiding the Functions dropdown
                visibleButton = null
            }
            let configScreen = AdaptableDashboardConfigurationViewFactory.get(x.Strategy)
            let isConfigurationButtonDisabled = !AdaptableDashboardConfigurationViewFactory.has(x.Strategy)
            let configurationButton = <Button disabled={isConfigurationButtonDisabled}
                onClick={() => this.onShowConfiguration(configScreen)}><Glyphicon glyph="wrench" /></Button>

            return <li key={"DashboardControl" + i}
                className="list-group-item">
                <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col xs={3}><Label style={{ cursor: 's-resize' }} draggable onDragStart={(event) => this.DragStart(event, x)}
                        onDragEnd={() => this.DragEnd()}><Glyphicon glyph="menu-hamburger" ></Glyphicon></Label>{' '}{Helper.capitalize(x.Strategy)}</Col>
                    <Col xs={2}>{visibleButton}</Col>
                    <Col xs={1}>{configurationButton}</Col>
                    <Col xs={6} style={previewStyle}>{dashboardElememt}
                    </Col>
                </Row>
            </li>
        })

        let cellInfo: [string, number][] = [["Control", 3], ["Show/Hide", 2], ["Config", 1], ["Preview", 6]];

        return (
            <PanelWithImage header="Blotter Dashboard" bsStyle="primary" infoBody={["Drag/Drop icon from items to reorder them in the Dashboard"]} glyphicon="dashboard" style={panelStyle}>
                <AdaptableBlotterForm inline>
                    <ControlLabel>Dashboard Zoom Factor : </ControlLabel>
                    {' '}
                    <FormControl value={this.state.EditedZoomFactor.toString()} type="number" min="0.5" step="0.05" max="1" placeholder="Enter a Number" onChange={(e) => this.onSetFactorChange(e)} />
                </AdaptableBlotterForm>
                {' '}
                <PanelWithRow CellInfo={cellInfo} bsStyle="info" />
                <ListGroup style={divStyle} onDragEnter={(event) => this.DragEnter(event)}
                    onDragOver={(event) => this.DragOver(event)}
                    onDragLeave={(event) => this.DragLeave(event)}>
                    {radioDashboardControls}
                </ListGroup>
                <AdaptableBlotterPopup showModal={this.state.CurrentDashboardConfig != ""}
                    ComponentClassName={this.state.CurrentDashboardConfig}
                    onHide={() => this.onCloseConfigPopup()}
                    IsReadOnly={false}
                    AdaptableBlotter={null}
                    onClearPopupParams={() => null}
                    PopupParams={null} />
            </PanelWithImage>
        );
    }
    private onSetFactorChange(event: React.FormEvent<any>) {
        const e = event.target as HTMLInputElement;
        let factor = Number(e.value)
        if (factor > 1) {
            factor = 1
        }
        if (factor < 0.5 && factor != 0) {
            factor = 0.5
        }
        this.setState({ EditedZoomFactor: factor });
        if (factor != 0) {
            this.props.onSetDashboardZoom(factor);
        }
    }


    onCloseConfigPopup() {
        this.setState({ CurrentDashboardConfig: "" })
    }
    onShowConfiguration(controlName: string) {
        this.setState({ CurrentDashboardConfig: controlName })
    }
    onDashboardControlVisibilityChanged(dashboardControl: IDashboardStrategyControlConfiguration, visible: boolean) {
        this.props.onChangeControlVisibility(dashboardControl.Strategy, visible);
    }

    private draggedHTMLElement: HTMLElement;
    private draggedElement: IDashboardStrategyControlConfiguration;
    DragStart(e: React.DragEvent<any>, controlElement: IDashboardStrategyControlConfiguration) {
        //we want the listgroupitem
        this.draggedHTMLElement = (e.currentTarget as HTMLElement).parentElement.parentElement.parentElement;
        //Typescript definition is missing this method as of 12/04/17 so I'm casting to any
        (e.dataTransfer as any).setDragImage(this.draggedHTMLElement, 10, 10)
        e.dataTransfer.dropEffect = "move"
        this.draggedElement = controlElement
    }
    DragEnd() {
        if (this.draggedElement) {
            let indexOfPlaceHolder = Array.from(this.draggedHTMLElement.parentNode.childNodes).indexOf(this.placeholder)
            if (indexOfPlaceHolder > -1) {
                let to = indexOfPlaceHolder
                let from = this.props.DashboardControls.indexOf(this.draggedElement);
                if (from < to) {
                    to = Math.max(to - 1, 0)
                }
                //We remove our awesome placeholder
                this.draggedHTMLElement.parentNode.removeChild(this.placeholder);
                this.props.onMoveControl(this.draggedElement.Strategy, to)
            }
            this.draggedHTMLElement = null;
            this.draggedElement = null;
        }
    }
    DragEnter(e: React.DragEvent<any>) {
        e.preventDefault();
        e.stopPropagation();
    }
    DragOver(e: React.DragEvent<any>) {
        e.preventDefault();
        e.stopPropagation();

        let targetElement = (e.target) as HTMLElement;
        //we want to keep the reference of the last intem we were over to
        if (targetElement.classList.contains("placeholder")) { return; }
        if (targetElement.nodeName == "LI") {
            let boundingClientRect = targetElement.getBoundingClientRect()

            if (e.clientY > (boundingClientRect.top + (boundingClientRect.height / 2))) {
                if (targetElement.parentNode.lastChild == targetElement) {
                    targetElement.parentNode.appendChild(this.placeholder);
                }
                else {
                    targetElement.parentNode.insertBefore(this.placeholder, targetElement.nextSibling);
                }
            }
            else {
                targetElement.parentNode.insertBefore(this.placeholder, targetElement);
            }
        }
    }

    DragLeave(e: React.DragEvent<any>) {
        e.preventDefault();
        e.stopPropagation();
    }
}
function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        DashboardControls: state.Dashboard.DashboardStrategyControls,
        DashboardZoom: state.Dashboard.DashboardZoom,
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onChangeControlVisibility: (controlName: string, isVisible: boolean) => dispatch(DashboardRedux.ChangeVisibilityDashboardControl(controlName, isVisible)),
        onSetDashboardZoom: (zoom: number) => dispatch(DashboardRedux.DashboardSetZoom(zoom)),
        onMoveControl: (controlName: string, NewIndex: number) => dispatch(DashboardRedux.DashboardMoveItem(controlName, NewIndex)),
    };
}

export let DashboardConfig = connect(mapStateToProps, mapDispatchToProps)(DashboardConfigComponent);

let divStyle: React.CSSProperties = {
    'overflowY': 'auto',
    'maxHeight': '300px'
}

let panelStyle: React.CSSProperties = {
    'overflowY': 'auto',
    width: '900px'
}

let previewStyle = {
    zoom: 0.75
}
