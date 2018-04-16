import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { FormControl, Row, Col, ControlLabel, Button, ListGroup, Glyphicon, Label } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { AdaptableBlotterPopup } from '../Components/Popups/AdaptableBlotterPopup';
import { AdaptableDashboardViewFactory } from '../AdaptableViewFactory';
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import { Helper } from '../../Core/Helpers/Helper'
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { IColItem } from "../UIInterfaces";
import { AdaptableBlotterForm } from "../Components/Forms/AdaptableBlotterForm";


interface DashboardPopupProps extends StrategyViewPopupProps<DashboardPopupComponent> {
    AvailableToolbars: Array<string>;
    VisibleToolbars: Array<string>;
    Zoom: Number;
    onChangeControlVisibility: (strategyName: string) => DashboardRedux.DashboardChangeControlVisibilityAction
    onSetDashboardZoom: (zoom: number) => DashboardRedux.DashboardSetZoomAction,
    onMoveControl: (strategyName: string, newIndex: number) => DashboardRedux.DashboardMoveItemAction
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
        this.state = { CurrentDashboardPopup: "", EditedZoomFactor: props.Zoom }
    }
    render() {

        let colItems: IColItem[] = [
            { Content: "Control", Size: 4 },
            { Content: "Show/Hide", Size: 2 },
            { Content: "Preview", Size: 6 },
        ]

        let allToolbars: string[]=[]
        this.props.VisibleToolbars.forEach(vt=>{
            allToolbars.push(vt);
        })

        this.props.AvailableToolbars.forEach(at => {
            let visibleToolbar = this.props.VisibleToolbars.find(vt=>vt==at)
            if(!visibleToolbar){
                allToolbars.push(at);
            }
        })

        let radioDashboardControls: any[] = allToolbars.map((x, i) => {
            let dashboardControl = AdaptableDashboardViewFactory.get(x);

            let dashboardElememt = React.createElement(dashboardControl, { 
                AdaptableBlotter: null,
                IsReadOnly: true,
                Columns: this.props.Columns,
                UserFilters: this.props.UserFilters,
                SystemFilters: this.props.SystemFilters,
                ModalContainer: this.props.ModalContainer,
                ColorPalette: this.props.ColorPalette
            });
            let isVisible: boolean = this.props.VisibleToolbars.find(dc => dc == x) != null
            let visibleButton = isVisible  ?
                <Button disabled={x == StrategyIds.HomeStrategyId} onClick={() => this.onDashboardControlVisibilityChanged(x)} bsStyle="success" bsSize="small"><Glyphicon glyph="eye-open"></Glyphicon>{' '}Visible</Button>
                : <Button onClick={() => this.onDashboardControlVisibilityChanged(x)} bsStyle="info" bsSize="small"><Glyphicon glyph="eye-close"></Glyphicon>{' '}Hidden</Button>

            return <li key={"DashboardControl" + x}
                className="list-group-item">
                <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col xs={colItems[0].Size}><Label  style={{ cursor: 's-resize' }} draggable={isVisible} onDragStart={(event) => this.DragStart(event, x)}
                        onDragEnd={() => this.DragEnd()}><Glyphicon glyph="menu-hamburger" ></Glyphicon></Label>{' '}{Helper.capitalize(x)}
                    </Col>
                    <Col xs={colItems[1].Size}>{visibleButton}</Col>
                    <Col xs={colItems[2].Size} style={{ zoom: 0.75 }}>{dashboardElememt}
                    </Col>
                </Row>
            </li>
        })

        return <div className="adaptable_blotter_style_popup_dashboard">
            <PanelWithImage header={StrategyNames.DashboardStrategyName} bsStyle="primary" infoBody={["Drag/Drop icon from items to reorder them in the Dashboard"]} glyphicon={StrategyGlyphs.DashboardGlyph} >
                <AdaptableBlotterForm inline >
                    <ControlLabel>Dashboard Zoom Factor : </ControlLabel>
                    {' '}
                    <FormControl value={this.state.EditedZoomFactor.toString()} type="number" min="0.5" step="0.05" max="1" placeholder="Enter a Number" onChange={(e) => this.onSetFactorChange(e)} />
                </AdaptableBlotterForm>
                {' '}
                <div><br /></div>
                <PanelWithRow ColItems={colItems} bsStyle="info" />
                <ListGroup className="preview_panel" onDragEnter={(event) => this.DragEnter(event)}
                    onDragOver={(event) => this.DragOver(event)}
                    onDragLeave={(event) => this.DragLeave(event)}>
                    {radioDashboardControls}
                </ListGroup>

            </PanelWithImage>
        </div>

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

    onDashboardControlVisibilityChanged(dashboardControl: string) {
        this.props.onChangeControlVisibility(dashboardControl);
    }

    private draggedHTMLElement: HTMLElement;
    private draggedElement: string;
    DragStart(e: React.DragEvent<any>, controlElement: string) {
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
                let from = this.props.AvailableToolbars.indexOf(this.draggedElement);
                if (from < to) {
                    to = Math.max(to - 1, 0)
                }
                //We remove our awesome placeholder
                this.draggedHTMLElement.parentNode.removeChild(this.placeholder);
                this.props.onMoveControl(this.draggedElement, to)
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
        AvailableToolbars: state.Dashboard.AvailableToolbars,
        VisibleToolbars: state.Dashboard.VisibleToolbars,
        Zoom: state.Dashboard.Zoom,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onChangeControlVisibility: (controlName: string) => dispatch(DashboardRedux.ChangeVisibilityDashboardControl(controlName)),
        onSetDashboardZoom: (zoom: number) => dispatch(DashboardRedux.DashboardSetZoom(zoom)),
        onMoveControl: (controlName: string, NewIndex: number) => dispatch(DashboardRedux.DashboardMoveItem(controlName, NewIndex)),
    };
}

export let DashboardPopup = connect(mapStateToProps, mapDispatchToProps)(DashboardPopupComponent);
