import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { FormControl, Row, Col, ControlLabel, Button, ListGroup, Glyphicon, Label } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { AdaptableBlotterPopup } from '../Components/Popups/AdaptableBlotterPopup';
import { IDashboardStrategyControlConfiguration } from '../../Strategy/Interface/IDashboardStrategy';
import { AdaptableDashboardViewFactory } from '../AdaptableViewFactory';
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import { Helper } from '../../Core/Helpers/Helper'
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { ConfigEntityRowItem } from '../Components/ConfigEntityRowItem';
import { IColItem } from "../UIInterfaces";


interface DashboardPopupProps extends StrategyViewPopupProps<DashboardPopupComponent> {
    DashboardControls: Array<IDashboardStrategyControlConfiguration>;
    DashboardZoom: Number;
    onChangeControlVisibility: (ControlName: string, IsVisible: boolean) => DashboardRedux.DashboardChangeControlVisibilityAction
    onSetDashboardZoom: (zoom: number) => DashboardRedux.DashboardSetZoomAction,
    onMoveControl: (controlName: string, NewIndex: number) => DashboardRedux.DashboardMoveItemAction
}
interface DashboardPopupState {
    CurrentDashboardPopup: string;
    EditedZoomFactor: Number;
}

class DashboardPopupComponent extends React.Component<DashboardPopupProps, DashboardPopupState> {
    private placeholder: HTMLButtonElement
    constructor(props: DashboardPopupProps) {
        super(props)
        this.placeholder = document.createElement("button");
        this.placeholder.className = "placeholder"
        this.placeholder.classList.add("list-group-item")
        this.placeholder.type = "button"
        this.state = { CurrentDashboardPopup: "", EditedZoomFactor: props.DashboardZoom }
    }
    render() {

        let radioDashboardControls = this.props.DashboardControls.map((x, i) => {
            let dashboardControl = AdaptableDashboardViewFactory.get(x.Strategy);
            if (!dashboardControl) {
                console.error("Unknown Dashboard control <" + x.Strategy + "> from the user config", x)
                return null
            }
            // let isReadOnly = this.props.EntitlementsState.FunctionEntitlements.findIndex(x => x.FunctionName == control.Strategy && x.AccessLevel == "ReadOnly") > -1
            let dashboardElememt = React.createElement(dashboardControl, { IsReadOnly: true });
            let visibleButton = x.IsVisible ?
                <Button onClick={() => this.onDashboardControlVisibilityChanged(x, false)} bsStyle="success" bsSize="small"><Glyphicon glyph="eye-open"></Glyphicon>{' '}Visible</Button>
                : <Button onClick={() => this.onDashboardControlVisibilityChanged(x, true)} bsStyle="info" bsSize="small"><Glyphicon glyph="eye-close"></Glyphicon>{' '}Hidden</Button>
            if (x.Strategy == StrategyIds.HomeStrategyId) {
                //we want to prevent people from hiding the Functions dropdown
                //      visibleButton = null
            }
            /*
                        let colItems: IColItem[] = []
                        colItems.push({
                            Size: 3, Content:
                                <span> <Label style={{ cursor: 's-resize' }} draggable onDragStart={(event) => this.DragStart(event, x)}
                                    onDragEnd={() => this.DragEnd()}><Glyphicon glyph="menu-hamburger" ></Glyphicon></Label>{' '}{Helper.capitalize(x.Strategy)}</span>
                        });
                        colItems.push({
                            Size: 2, Content: visibleButton
                        });
                        colItems.push({
                            Size: 6, Content: <span style={previewStyle}>{dashboardElememt}</span>
                        });
                        */
            return <li key={"DashboardControl" + i}
                className="list-group-item">
                <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col xs={3}><Label style={{ cursor: 's-resize' }} draggable onDragStart={(event) => this.DragStart(event, x)}
                        onDragEnd={() => this.DragEnd()}><Glyphicon glyph="menu-hamburger" ></Glyphicon></Label>{' '}{Helper.capitalize(x.Strategy)}
                    </Col>
                    <Col xs={2}>{visibleButton}</Col>
                    <Col xs={6} style={previewStyle}>{dashboardElememt}
                    </Col>
                </Row>
            </li>
        })

        let colItems: IColItem[] = [
            { Content: "Control", Size: 3 },
            { Content: "Show/Hide", Size: 2 },
            { Content: "Preview", Size: 7 },
        ]
        return (
            <PanelWithImage header={StrategyNames.DashboardStrategyName} bsStyle="primary" infoBody={["Drag/Drop icon from items to reorder them in the Dashboard"]} glyphicon={StrategyGlyphs.DashboardGlyph} style={panelStyle}>
                <AdaptableBlotterForm inline >
                    <ControlLabel>Dashboard Zoom Factor : </ControlLabel>
                    {' '}
                    <FormControl value={this.state.EditedZoomFactor.toString()} type="number" min="0.5" step="0.05" max="1" placeholder="Enter a Number" onChange={(e) => this.onSetFactorChange(e)} />
                </AdaptableBlotterForm>
                {' '}
                <div><br /></div>
                <PanelWithRow ColItems={colItems} bsStyle="info" />
                <ListGroup style={divStyle} onDragEnter={(event) => this.DragEnter(event)}
                    onDragOver={(event) => this.DragOver(event)}
                    onDragLeave={(event) => this.DragLeave(event)}>
                    {radioDashboardControls}
                </ListGroup>

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

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onChangeControlVisibility: (controlName: string, isVisible: boolean) => dispatch(DashboardRedux.ChangeVisibilityDashboardControl(controlName, isVisible)),
        onSetDashboardZoom: (zoom: number) => dispatch(DashboardRedux.DashboardSetZoom(zoom)),
        onMoveControl: (controlName: string, NewIndex: number) => dispatch(DashboardRedux.DashboardMoveItem(controlName, NewIndex)),
    };
}

export let DashboardPopup = connect(mapStateToProps, mapDispatchToProps)(DashboardPopupComponent);

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
