/// <reference path="../../../typings/index.d.ts" />
import * as React from "react";
import { Provider, connect } from 'react-redux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { Form, Panel, FormControl, ControlLabel, Label, Button, OverlayTrigger, Tooltip, Glyphicon, FormGroup, Row } from 'react-bootstrap';
import { StringExtensions } from '../../Core/Extensions';
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as QuickSearchRedux from '../../Redux/ActionsReducers/QuickSearchRedux'
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { IDashboardControl } from '../../Core/Interface/IDashboardStrategy';
import { Helper } from '../../Core/Helper';
import { ButtonEdit } from '../ButtonEdit';
import { ButtonClear } from '../ButtonClear';

interface QuickSearchToolbarControlComponentProps extends IStrategyViewPopupProps<QuickSearchToolbarControlComponent> {
    onRunQuickSearch: (quickSearchText: string) => QuickSearchRedux.QuickSearchRunAction;
    onClearQuickSearch: () => QuickSearchRedux.QuickSearchClearAction;
    onShowQuickSearchConfig: () => PopupRedux.PopupShowAction;
    onChangeControlCollapsedState: (ControlName: string, IsCollapsed: boolean) => DashboardRedux.DashboardChangeControlCollapseStateAction
    QuickSearchText: string
    QuickSearchDashboardControl: IDashboardControl
}



class QuickSearchToolbarControlComponent extends React.Component<QuickSearchToolbarControlComponentProps, {}> {

    render(): any {

        let collapsedContent = StringExtensions.IsNullOrEmpty(this.props.QuickSearchText) ? <span style={noSearchStyle}>None</span> : <ControlLabel> {this.props.QuickSearchText}</ControlLabel>

        let labelContent = <Label style={labelStyle} bsStyle="primary"><Glyphicon glyph="eye-open" />{' '}Quick Search</Label>;

        let quicksearchContent: any = <FormGroup controlId="formQuickSearch">
            <FormControl
                style={{ width: "120px" }}
                type="text"
                placeholder="Search Text"
                value={this.props.QuickSearchText}
                onChange={(x) => this.onUpdateQuickSearchText(x)}
            />{' '}
            <ButtonClear onClick={() => this.onClearQuickSearch()}
                overrideTooltip="Clear Quick Search"
                overrideDisableButton={StringExtensions.IsEmpty(this.props.QuickSearchText)} 
                DisplayMode="Glyph+Text"/>
            {' '}
            <ButtonEdit onClick={() => this.props.onShowQuickSearchConfig()}
                overrideTooltip="Edit Quick Search" 
                DisplayMode="Glyph+Text"/>
        </FormGroup>

        return <Panel className="small-padding-panel" >
            {this.props.QuickSearchDashboardControl.IsCollapsed ?
                <AdaptableBlotterForm className='navbar-form' inline>
                    <div >
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

                </AdaptableBlotterForm>
                :
                <AdaptableBlotterForm className='navbar-form' inline>
                    <div >
                        {labelContent}
                        {' '}
                        <OverlayTrigger overlay={<Tooltip id="toolcollapse">Collapse</Tooltip>}>
                            <Button bsSize='small' bsStyle="primary" style={buttonCloseStyle} onClick={() => this.expandCollapseClicked()}>
                                <Glyphicon glyph="chevron-up" />
                            </Button>
                        </OverlayTrigger>
                        <Row style={marginButtonStyle}>
                            {quicksearchContent}
                        </Row>
                    </div>
                </AdaptableBlotterForm>
            }
        </Panel>

    }

    expandCollapseClicked() {
        this.props.onChangeControlCollapsedState(this.props.QuickSearchDashboardControl.Name, !this.props.QuickSearchDashboardControl.IsCollapsed);
    }

    onUpdateQuickSearchText(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.props.onRunQuickSearch(e.value);
    }

    onClearQuickSearch() {
        this.props.onClearQuickSearch();
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        QuickSearchText: state.QuickSearch.QuickSearchText,
        QuickSearchDashboardControl: state.Dashboard.DashboardControls.find(d => d.Name == "Quick Search"),
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onRunQuickSearch: (newQuickSearchText: string) => dispatch(QuickSearchRedux.QuickSearchRun(newQuickSearchText)),
        onClearQuickSearch: () => dispatch(QuickSearchRedux.QuickSearchClear()),
        onShowQuickSearchConfig: () => dispatch(PopupRedux.PopupShow("QuickSearchConfig")),
        onChangeControlCollapsedState: (controlName: string, isCollapsed: boolean) => dispatch(DashboardRedux.ChangeCollapsedStateDashboardControl(controlName, isCollapsed))
    };
}

export let QuickSearchToolbarControl = connect(mapStateToProps, mapDispatchToProps)(QuickSearchToolbarControlComponent);

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