/// <reference path="../../../typings/index.d.ts" />
import * as React from "react";
import { Provider, connect } from 'react-redux';
import { Panel, Form, FormControl, ControlLabel, Button, OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap';
import { IAdvancedSearch } from '../../Core/Interface/IAdvancedSearchStrategy';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as AdvancedSearchRedux from '../../Redux/ActionsReducers/AdvancedSearchRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import { StringExtensions } from '../../Core/Extensions'

interface AdvancedSearchToolbarControlComponentProps extends React.ClassAttributes<AdvancedSearchToolbarControlComponent> {
    currentAdvancedSearchId: string;
    AdvancedSearches: IAdvancedSearch[];
    onSelectAdvancedSearch: (advancedSearchId: string) => AdvancedSearchRedux.AdvancedSearchSelectAction;
    onNewAdvancedSearch: () => PopupRedux.ShowPopupAction;
    onEditAdvancedSearch: () => PopupRedux.ShowPopupAction;
}

class AdvancedSearchToolbarControlComponent extends React.Component<AdvancedSearchToolbarControlComponentProps, {}> {
    render(): any {

        let advancedSearches = this.props.AdvancedSearches.map(x => {
            return <option value={x.Uid} key={x.Uid}>{x.Name}</option>
        })

        let savedSearch: IAdvancedSearch = this.props.AdvancedSearches.find(s => s.Uid == this.props.currentAdvancedSearchId);
        let currentAdvancedSearchId = StringExtensions.IsNullOrEmpty(this.props.currentAdvancedSearchId) ?
            "select" : this.props.currentAdvancedSearchId

        return (
            <Form className='navbar-form'>
                <Panel className="small-padding-panel" >
                    <ControlLabel style={labelStyle}>Advanced Search:</ControlLabel>
                    <FormControl componentClass="select" placeholder="select"
                        value={currentAdvancedSearchId}
                        onChange={(x) => this.onSelectedSearchChanged(x)} >
                        <option value="select" key="select">Select a Search</option>
                        {advancedSearches}
                    </FormControl>

                    {' '}
                    <OverlayTrigger overlay={<Tooltip id="tooltipEdit">Edit Advanced Search</Tooltip>}>
                        <Button bsSize='small' bsStyle='info' disabled={currentAdvancedSearchId == "select"} onClick={() => this.props.onEditAdvancedSearch()}>Edit</Button>
                    </OverlayTrigger>

                    {' '}
                    <OverlayTrigger overlay={<Tooltip id="tooltipEdit">Clear Advanced Search</Tooltip>}>
                        <Button bsSize='small' disabled={currentAdvancedSearchId == "select"} onClick={() => this.props.onSelectAdvancedSearch("")}>Clear</Button>
                    </OverlayTrigger>

                    {' '}
                    <OverlayTrigger overlay={<Tooltip id="tooltipEdit">New Advanced Search</Tooltip>}>
                        <Button bsSize='small' onClick={() => this.props.onNewAdvancedSearch()}>New</Button>
                    </OverlayTrigger>
                </Panel>
            </Form>

        );
    }

    onSelectedSearchChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        let advancedSearchId = (e.value == "select") ? "" : e.value;
        this.props.onSelectAdvancedSearch(advancedSearchId);
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        currentAdvancedSearchId: state.AdvancedSearch.CurrentAdvancedSearchId,
        AdvancedSearches: state.AdvancedSearch.AdvancedSearches
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSelectAdvancedSearch: (advancedSearchId: string) => dispatch(AdvancedSearchRedux.AdvancedSearchSelect(advancedSearchId)),
        onNewAdvancedSearch: () => dispatch(PopupRedux.ShowPopup("AdvancedSearchAction", "New")),
        onEditAdvancedSearch: () => dispatch(PopupRedux.ShowPopup("AdvancedSearchAction"))
    };
}

export let AdvancedSearchToolbarControl = connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchToolbarControlComponent);

var labelStyle = {
    marginRight: '3px'
};

var borderStyle = {
    border: '2px'
}
