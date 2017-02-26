/// <reference path="../../../typings/index.d.ts" />
import * as React from "react";
import { Provider, connect } from 'react-redux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { Form, Panel, FormControl, ControlLabel, Button, OverlayTrigger, Tooltip, Glyphicon, FormGroup } from 'react-bootstrap';
import { StringExtensions } from '../../Core/Extensions';
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as QuickSearchRedux from '../../Redux/ActionsReducers/QuickSearchRedux'
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { IDashboardControl } from '../../Core/Interface/IDashboardStrategy';


interface QuickSearchToolbarControlComponentProps extends IStrategyViewPopupProps<QuickSearchToolbarControlComponent> {
    onSetQuickSearchText: (quickSearchText: string) => QuickSearchRedux.QuickSearchSetSearchTextAction;
    onShowQuickSearchConfig: () => PopupRedux.ShowPopupAction;
    onChangeDashboardControl: (DashboardControl: IDashboardControl) => DashboardRedux.ChangeDashboardControlAction
    QuickSearchText: string
    QuickSearchDashboardControl: IDashboardControl
}

interface QuickSearchToolbarControlComponentState {
    EditedQuickSearchText: string,
    isCollapsed: boolean
}

class QuickSearchToolbarControlComponent extends React.Component<QuickSearchToolbarControlComponentProps, QuickSearchToolbarControlComponentState> {

    constructor() {
        super();
        this.state = { EditedQuickSearchText: "", isCollapsed: false }
    }
    componentWillReceiveProps(nextProps: QuickSearchToolbarControlComponentProps, nextContext: any) {
        this.setState({
            EditedQuickSearchText: nextProps.QuickSearchText, isCollapsed: nextProps.QuickSearchDashboardControl.IsCollapsed
        });
    }

    render(): any {
        let quicksearchContent: any = <FormGroup controlId="formQuickSearch">
            <FormControl
                type="text"
                placeholder="Search Text"
                value={(this.state != null) ? this.state.EditedQuickSearchText : ""}
                onChange={(x) => this.onUpdateQuickSearchText(x)}
            />{' '}
            <OverlayTrigger overlay={<Tooltip id="tooltipEdit">Clear Quick Search</Tooltip>}>
                <Button bsSize='small' bsStyle='info' disabled={StringExtensions.IsEmpty(this.state.EditedQuickSearchText)} onClick={() => this.onClearQuickSearch()}>Clear</Button>
            </OverlayTrigger>
            {' '}
            <OverlayTrigger overlay={<Tooltip id="tooltipEdit">Edit Quick Search</Tooltip>}>
                <Button bsSize='small' bsStyle='primary' onClick={() => this.props.onShowQuickSearchConfig()}>Edit</Button>
            </OverlayTrigger></FormGroup>

        return <Panel className="small-padding-panel">
            <AdaptableBlotterForm className='navbar-form' inline onSubmit={() => this.onSetQuickSearch()}>
                <ControlLabel>Quick Search:</ControlLabel>
                {' '}
                {!this.state.isCollapsed ? quicksearchContent :
                    <ControlLabel>{StringExtensions.IsNullOrEmpty(this.props.QuickSearchText) ? "None" : this.props.QuickSearchText}</ControlLabel>}
                {' '}
                {this.state.isCollapsed ?
                    <OverlayTrigger overlay={<Tooltip id="toolexpand">Expand</Tooltip>}>
                        <Button bsSize='small' onClick={() => this.expandCollapseClicked()}>&gt;&gt;</Button>
                    </OverlayTrigger>
                    :
                    <OverlayTrigger overlay={<Tooltip id="toolcollapse">Collapse</Tooltip>}>
                        <Button bsSize='small' onClick={() => this.expandCollapseClicked()}>&lt;&lt;</Button>
                    </OverlayTrigger>
                }
            </AdaptableBlotterForm>
        </Panel>


    }

    expandCollapseClicked() {
        let isCollapsed: boolean = this.state.isCollapsed;
        this.setState({ isCollapsed: !isCollapsed } as QuickSearchToolbarControlComponentState);
        this.props.QuickSearchDashboardControl.IsCollapsed = !isCollapsed;
        this.props.onChangeDashboardControl(this.props.QuickSearchDashboardControl);
    }

    onUpdateQuickSearchText(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.props.onSetQuickSearchText(e.value);
    }

    onSetQuickSearch() {
        this.props.onSetQuickSearchText(this.state.EditedQuickSearchText);
    }

    onClearQuickSearch() {
        //Jo:no need to update state since we'll get the update from redux
        // this.setState({ EditedQuickSearchText: "" });
        this.props.onSetQuickSearchText("");
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
        onSetQuickSearchText: (newQuickSearchText: string) => dispatch(QuickSearchRedux.QuickSearchSetSearchText(newQuickSearchText)),
        onShowQuickSearchConfig: () => dispatch(PopupRedux.ShowPopup("QuickSearchConfig")),
        onChangeDashboardControl: (dashboardControl: IDashboardControl) => dispatch(DashboardRedux.EditDashboardControl(dashboardControl)),
    };
}

export let QuickSearchToolbarControl = connect(mapStateToProps, mapDispatchToProps)(QuickSearchToolbarControlComponent);

var labelStyle = {
    marginRight: '3px'
};

