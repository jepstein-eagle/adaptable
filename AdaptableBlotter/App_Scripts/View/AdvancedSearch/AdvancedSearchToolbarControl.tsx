/// <reference path="../../../typings/index.d.ts" />
import * as React from "react";
import { Provider, connect } from 'react-redux';
import { Panel, Form, FormControl, ControlLabel, Button, OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap';
import { IAdvancedSearch } from '../../Core/Interface/IAdvancedSearchStrategy';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as AdvancedSearchRedux from '../../Redux/ActionsReducers/AdvancedSearchRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import { StringExtensions } from '../../Core/Extensions'
import { IUIConfirmation } from '../../Core/Interface/IStrategy';
import { Helper } from '../../Core/Helper';


interface AdvancedSearchToolbarControlComponentProps extends React.ClassAttributes<AdvancedSearchToolbarControlComponent> {
    CurrentAdvancedSearchUid: string;
    AdvancedSearches: IAdvancedSearch[];
    onSelectAdvancedSearch: (advancedSearchId: string) => AdvancedSearchRedux.AdvancedSearchSelectAction;
    onNewAdvancedSearch: () => PopupRedux.ShowPopupAction;
    onEditAdvancedSearch: () => PopupRedux.ShowPopupAction;
    onConfirmWarning: (confirmation: IUIConfirmation) => PopupRedux.ShowConfirmationPopupAction,

}

class AdvancedSearchToolbarControlComponent extends React.Component<AdvancedSearchToolbarControlComponentProps, {}> {
    render(): any {

        let advancedSearches = this.props.AdvancedSearches.map(x => {
            return <option value={x.Uid} key={x.Uid}>{x.Name}</option>
        })

        let savedSearch: IAdvancedSearch = this.props.AdvancedSearches.find(s => s.Uid == this.props.CurrentAdvancedSearchUid);
        let currentAdvancedSearchId = StringExtensions.IsNullOrEmpty(this.props.CurrentAdvancedSearchUid) ?
            "select" : this.props.CurrentAdvancedSearchUid

        return (
            <Form className='navbar-form'>
                <Panel className="small-padding-panel" >
                    <ControlLabel>Advanced Search:</ControlLabel>
                    {' '}
                    <FormControl componentClass="select" placeholder="select"
                        value={currentAdvancedSearchId}
                        onChange={(x) => this.onSelectedSearchChanged(x)} >
                        <option value="select" key="select">Select a Search</option>
                        {advancedSearches}
                    </FormControl>

                    {' '}
                    <OverlayTrigger overlay={<Tooltip id="tooltipEdit">Edit Current Advanced Search</Tooltip>}>
                        <Button bsSize='small' bsStyle='primary' disabled={currentAdvancedSearchId == "select"} onClick={() => this.props.onEditAdvancedSearch()}>Edit</Button>
                    </OverlayTrigger>

                    {' '}
                    <OverlayTrigger overlay={<Tooltip id="tooltipEdit">Clear (but do not delete) Current Advanced Search</Tooltip>}>
                        <Button bsSize='small' bsStyle='info' disabled={currentAdvancedSearchId == "select"} onClick={() => this.props.onSelectAdvancedSearch("")}>Clear</Button>
                    </OverlayTrigger>

                    {' '}
                    <OverlayTrigger overlay={<Tooltip id="tooltipEdit">Create New Advanced Search</Tooltip>}>
                        <Button bsSize='small' bsStyle='success' onClick={() => this.props.onNewAdvancedSearch()}>New</Button>
                    </OverlayTrigger>
                    {' '}
                    <OverlayTrigger overlay={<Tooltip id="tooltipEdit">Delete Advanced Search</Tooltip>}>
                        <Button bsSize='small' bsStyle='danger' onClick={() => this.onDeleteAdvancedSearch()}>Delete</Button>
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

    onDeleteAdvancedSearch() {
        let clonedSearch: IAdvancedSearch = this.getClonedSelectedAdvancedSearch();

        let confirmation: IUIConfirmation = {
            CancelText: "Cancel",
            ConfirmationTitle: "Delete Advanced Search",
            ConfirmationMsg: "Are you sure you want to delete '" + clonedSearch.Name + "'?",
            ConfirmationText: "Delete",
            CancelAction: null,
            ConfirmAction: AdvancedSearchRedux.AdvancedSearchDelete(clonedSearch)
        }
        this.props.onConfirmWarning(confirmation)
    }

    private getClonedSelectedAdvancedSearch() {
        let selectedAdvancedSearch: IAdvancedSearch = this.props.AdvancedSearches.find(a => a.Uid == this.props.CurrentAdvancedSearchUid);
        if (selectedAdvancedSearch) {
            selectedAdvancedSearch = Helper.cloneObject(selectedAdvancedSearch)
        }
        return selectedAdvancedSearch
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        CurrentAdvancedSearchUid: state.AdvancedSearch.CurrentAdvancedSearchId,
        AdvancedSearches: state.AdvancedSearch.AdvancedSearches
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSelectAdvancedSearch: (advancedSearchId: string) => dispatch(AdvancedSearchRedux.AdvancedSearchSelect(advancedSearchId)),
        onNewAdvancedSearch: () => dispatch(PopupRedux.ShowPopup("AdvancedSearchAction", "New")),
        onEditAdvancedSearch: () => dispatch(PopupRedux.ShowPopup("AdvancedSearchAction")),
        onConfirmWarning: (confirmation: IUIConfirmation) => dispatch(PopupRedux.ShowConfirmationPopup(confirmation)),
    };
}

export let AdvancedSearchToolbarControl = connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchToolbarControlComponent);

var labelStyle = {
    marginRight: '3px'
};

var borderStyle = {
    border: '2px'
}
