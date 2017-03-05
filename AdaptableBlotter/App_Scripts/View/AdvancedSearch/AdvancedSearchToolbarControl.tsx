/// <reference path="../../../typings/index.d.ts" />
import * as React from "react";
import { Provider, connect } from 'react-redux';
import { Panel, Form, FormControl, ControlLabel, Label, Button, OverlayTrigger, Tooltip, Glyphicon, FormGroup, HelpBlock, Row } from 'react-bootstrap';
import { IAdvancedSearch } from '../../Core/Interface/IAdvancedSearchStrategy';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as AdvancedSearchRedux from '../../Redux/ActionsReducers/AdvancedSearchRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { StringExtensions } from '../../Core/Extensions'
import { IUIConfirmation } from '../../Core/Interface/IStrategy';
import { Helper } from '../../Core/Helper';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { IDashboardControl } from '../../Core/Interface/IDashboardStrategy';
import { ButtonEdit } from '../ButtonEdit';
import { ButtonDelete } from '../ButtonDelete';
import { ButtonClear } from '../ButtonClear';
import { ButtonNew } from '../ButtonNew';


interface AdvancedSearchToolbarControlComponentProps extends React.ClassAttributes<AdvancedSearchToolbarControlComponent> {
    CurrentAdvancedSearchUid: string;
    AdvancedSearches: IAdvancedSearch[];
    onSelectAdvancedSearch: (advancedSearchId: string) => AdvancedSearchRedux.AdvancedSearchSelectAction;
    onNewAdvancedSearch: () => PopupRedux.PopupShowAction;
    onEditAdvancedSearch: () => PopupRedux.PopupShowAction;
    onChangeControlCollapsedState: (ControlName: string, IsCollapsed: boolean) => DashboardRedux.DashboardChangeControlCollapseStateAction
    AdvancedSearchDashboardControl: IDashboardControl
}

class AdvancedSearchToolbarControlComponent extends React.Component<AdvancedSearchToolbarControlComponentProps, {}> {
    render(): any {

        let advancedSearches = this.props.AdvancedSearches.map(x => {
            return <option value={x.Uid} key={x.Uid}>{x.Name}</option>
        })

        let savedSearch: IAdvancedSearch = this.props.AdvancedSearches.find(s => s.Uid == this.props.CurrentAdvancedSearchUid);

        let collapsedContent = savedSearch ? <ControlLabel>{savedSearch.Name}</ControlLabel> : <span style={noSearchStyle}>None</span>;

        let labelContent = <Label style={labelStyle} bsStyle="primary"><Glyphicon glyph="search" />{' '}Advanced Search</Label>;


        let currentAdvancedSearchId = StringExtensions.IsNullOrEmpty(this.props.CurrentAdvancedSearchUid) ?
            "select" : this.props.CurrentAdvancedSearchUid

        let advancedSearchContent = <FormGroup controlId="formAdvancedSearch">
            <FormControl componentClass="select" placeholder="select"
                value={currentAdvancedSearchId}
                onChange={(x) => this.onSelectedSearchChanged(x)} >
                <option value="select" key="select">Select a Search</option>
                {advancedSearches}
            </FormControl>

            {' '}
            <ButtonClear onClick={() => this.props.onSelectAdvancedSearch("")}
                overrideTooltip="Clear (but do not delete) Current Advanced Search"
                overrideDisableButton={currentAdvancedSearchId == "select"}
                DisplayMode="Glyph+Text" />
            {' '}
            <ButtonEdit onClick={() => this.props.onEditAdvancedSearch()}
                overrideTooltip="Edit Current Advanced Search"
                overrideDisableButton={currentAdvancedSearchId == "select"}
                ConfigEntity={savedSearch}
                DisplayMode="Glyph+Text" />
            {' '}
            <ButtonNew onClick={() => this.props.onNewAdvancedSearch()}
                overrideTooltip="Create New Advanced Search"
                DisplayMode="Glyph+Text" />
            {' '}
            <ButtonDelete
                overrideTooltip="Delete Advanced Search"
                overrideDisableButton={currentAdvancedSearchId == "select"}
                ConfigEntity={savedSearch}
                DisplayMode="Glyph+Text"
                ConfirmAction={AdvancedSearchRedux.AdvancedSearchDelete(savedSearch)}
                ConfirmationMsg={"Are you sure you want to delete '" + !savedSearch ? "": savedSearch.Name + "'?"}
                ConfirmationTitle={"Delete Advanced Search"} />
        </FormGroup>

        return (
            <Panel className="small-padding-panel" >
                <AdaptableBlotterForm className='navbar-form' inline>
                    <div >
                        {this.props.AdvancedSearchDashboardControl.IsCollapsed ?
                            <div>
                                {labelContent}
                                {' '}

                                <OverlayTrigger overlay={<Tooltip id="toolexpand">Expand</Tooltip>}>
                                    <Button bsStyle="primary" bsSize='small' style={buttonOpenStyle} onClick={() => this.expandCollapseClicked()}>
                                        <Glyphicon glyph="chevron-right" />
                                    </Button>
                                </OverlayTrigger>
                                {' '}
                                {collapsedContent}

                            </div>
                            :
                            <div>
                                {labelContent}
                                {' '}
                                <OverlayTrigger overlay={<Tooltip id="toolcollapse">Collapse</Tooltip>}>
                                    <Button bsSize='small' bsStyle="primary" style={buttonCloseStyle} onClick={() => this.expandCollapseClicked()}>
                                        <Glyphicon glyph="chevron-up" />
                                    </Button>
                                </OverlayTrigger>
                                <Row style={marginButtonStyle}>
                                    {advancedSearchContent}
                                </Row>
                            </div>
                        }
                    </div>
                </AdaptableBlotterForm>

            </Panel>
        );
    }

    expandCollapseClicked() {
        this.props.onChangeControlCollapsedState(this.props.AdvancedSearchDashboardControl.Name, !this.props.AdvancedSearchDashboardControl.IsCollapsed);
    }

    onSelectedSearchChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        let advancedSearchId = (e.value == "select") ? "" : e.value;
        this.props.onSelectAdvancedSearch(advancedSearchId);
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
        AdvancedSearches: state.AdvancedSearch.AdvancedSearches,
        AdvancedSearchDashboardControl: state.Dashboard.DashboardControls.find(d => d.Name == "Advanced Search"),
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSelectAdvancedSearch: (advancedSearchId: string) => dispatch(AdvancedSearchRedux.AdvancedSearchSelect(advancedSearchId)),
        onNewAdvancedSearch: () => dispatch(PopupRedux.PopupShow("AdvancedSearchAction", "New")),
        onEditAdvancedSearch: () => dispatch(PopupRedux.PopupShow("AdvancedSearchAction")),
        onChangeControlCollapsedState: (controlName: string, isCollapsed: boolean) => dispatch(DashboardRedux.ChangeCollapsedStateDashboardControl(controlName, isCollapsed))
    };
}

export let AdvancedSearchToolbarControl = connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchToolbarControlComponent);


var borderStyle = {
    border: '2px'
}

var marginButtonStyle = {
    margin: '4px'
};

var noSearchStyle = {
    fontStyle: 'italic'
};

var labelStyle = {
    fontSize: 'small'
};

var buttonOpenStyle = {
    padding: '1px',
};

var buttonCloseStyle = {
    padding: '0px',
    marginTop: '2px',
    marginBottom: '4px'
};