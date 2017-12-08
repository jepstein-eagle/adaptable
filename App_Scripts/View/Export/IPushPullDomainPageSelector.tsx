import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { ListGroup, ListGroupItem, Alert } from 'react-bootstrap';
import { ButtonToolbar, ControlLabel, Button, Form, Col, Panel, FormControl, FormGroup, Collapse, Glyphicon } from 'react-bootstrap';
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { Helper } from '../../Core/Helper';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as ExportRedux from '../../Redux/ActionsReducers/ExportRedux'
import * as RangeRedux from '../../Redux/ActionsReducers/RangeRedux'
import { IPPDomain } from "../../Redux/ActionsReducers/Interface/IState";
import { StringExtensions } from "../../Core/Extensions";
import { ExportDestination } from "../../Core/Enums";

interface IPushPullDomainPageSelectorProps extends IStrategyViewPopupProps<IPushPullDomainPageSelectorComponent> {
    IPPDomainsPages: IPPDomain[]
    onExport: (value: string, folder: string, page: string) => ExportRedux.ExportAction;
    onCancel: () => PopupRedux.PopupHideAction
    ErrorMsg: string
}

interface IPushPullDomainPageSelectorInternalState {
    SelectedFolder: string
    SelectedPage: string
}

class IPushPullDomainPageSelectorComponent extends React.Component<IPushPullDomainPageSelectorProps, IPushPullDomainPageSelectorInternalState> {
    constructor() {
        super();
        this.state = { SelectedFolder: null, SelectedPage: null }
    }
    render() {
        let itemsElements: any[] = []
        this.props.IPPDomainsPages.forEach(x => {
            // let itemsElements = this.props.IPPDomainsPages.map(x => {
            if (x.Name == this.state.SelectedFolder) {
                itemsElements.push(<ListGroupItem key={x.Name}
                    onClick={() => { this.UnSelectFolder() }}
                    value={x.Name} ><Glyphicon glyph="folder-open" ></Glyphicon>{' '}{x.Name}</ListGroupItem>)
                x.Pages.forEach((page: string) => {
                    itemsElements.push(<ListGroupItem key={page} style={{ paddingLeft: '30px' }}
                        onClick={() => { this.SelectPage(page) }} active={this.state.SelectedPage == page}
                        value={page} ><Glyphicon glyph="cloud-download" ></Glyphicon>{' '}{page}</ListGroupItem>)
                })
            }
            else {
                itemsElements.push(<ListGroupItem key={x.Name}
                    onClick={() => { this.SelectFolder(x.Name) }}
                    value={x.Name} ><Glyphicon glyph="folder-close" ></Glyphicon>{' '}{x.Name}</ListGroupItem>)
            }
        })
        return <PanelWithButton headerText="iPushPull Folder and Page Selector" bsStyle="primary" glyphicon="export">


            {StringExtensions.IsNotNullOrEmpty(this.props.ErrorMsg) ? <Alert bsStyle="danger">
                Error getting iPushPull Pages : {this.props.ErrorMsg}
            </Alert> : <ListGroup fill style={divStyle}>
                    {itemsElements}
                </ListGroup>}
            <Button style={buttonRightStyle} onClick={() => { this.props.onCancel() }}>Cancel <Glyphicon glyph="remove" /></Button>
            <Button disabled={StringExtensions.IsNullOrEmpty(this.state.SelectedPage)}
                style={buttonRightStyle} bsStyle="primary"
                onClick={() => { this.props.onExport(this.props.PopupParams, this.state.SelectedFolder, this.state.SelectedPage) }}>
                <Glyphicon glyph="user" /> Select</Button>
        </PanelWithButton>
    }

    SelectFolder(folder: string) {
        this.setState({ SelectedFolder: folder })
    }
    SelectPage(page: string) {
        this.setState({ SelectedPage: page })
    }
    UnSelectFolder() {
        this.setState({ SelectedFolder: "", SelectedPage: "" })
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        IPPDomainsPages: state.Export.IPPDomainsPages,
        ErrorMsg: state.Range.ErrorMsg
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onExport: (value: string, folder: string, page: string) => dispatch(ExportRedux.Export(value, ExportDestination.iPushPull, folder, page)),
        onCancel: () => {dispatch(PopupRedux.PopupHide()); dispatch(RangeRedux.RangeSetErrorMsg(""))}
    };
}

export let IPushPullDomainPageSelector = connect(mapStateToProps, mapDispatchToProps)(IPushPullDomainPageSelectorComponent);

var buttonRightStyle = {
    float: 'right'
};


let divStyle: React.CSSProperties = {
    'overflowY': 'auto',
    'maxHeight': '300px'
}