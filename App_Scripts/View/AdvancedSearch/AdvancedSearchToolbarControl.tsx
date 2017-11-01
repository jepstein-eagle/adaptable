import * as React from "react";
import * as Redux from 'redux'
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
import { IDashboardStrategyControlConfiguration } from '../../Core/Interface/IDashboardStrategy';
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import { ButtonDelete } from '../Components/Buttons/ButtonDelete';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import * as StrategyIds from '../../Core/StrategyIds'


interface AdvancedSearchToolbarControlComponentProps extends React.ClassAttributes<AdvancedSearchToolbarControlComponent> {
    CurrentAdvancedSearchUid: string;
    AdvancedSearches: IAdvancedSearch[];
    onSelectAdvancedSearch: (advancedSearchId: string) => AdvancedSearchRedux.AdvancedSearchSelectAction;
    onNewAdvancedSearch: () => PopupRedux.PopupShowAction;
    onEditAdvancedSearch: () => PopupRedux.PopupShowAction;
    AdvancedSearchDashboardControl: IDashboardStrategyControlConfiguration
    IsReadOnly: boolean
}

class AdvancedSearchToolbarControlComponent extends React.Component<AdvancedSearchToolbarControlComponentProps, {}> {
    render() {

        let advancedSearches = this.props.AdvancedSearches.map(x => {
            return <option value={x.Uid} key={x.Uid}>{x.Name}</option>
        })

        let savedSearch: IAdvancedSearch = this.props.AdvancedSearches.find(s => s.Uid == this.props.CurrentAdvancedSearchUid);

        let currentAdvancedSearchId = StringExtensions.IsNullOrEmpty(this.props.CurrentAdvancedSearchUid) ?
            "select" : this.props.CurrentAdvancedSearchUid

        let content = <span>
            <div className={this.props.IsReadOnly ? "adaptable_blotter_readonly" : ""}>
                <Button bsStyle="primary">
                    {' '}<Glyphicon glyph="search" />{' '}Advanced Search
                </Button>
                {' '}
                <FormControl componentClass="select" placeholder="select"
                    value={currentAdvancedSearchId}
                    onChange={(x) => this.onSelectedSearchChanged(x)} >
                    <option value="select" key="select">Select a Search</option>
                    {advancedSearches}
                </FormControl>
                {' '}
                <ButtonClear onClick={() => this.props.onSelectAdvancedSearch("")}
                    overrideTooltip="Clear Current Advanced Search"
                    overrideDisableButton={currentAdvancedSearchId == "select"}
                    DisplayMode="Glyph" />
                {' '}
                <ButtonEdit onClick={() => this.props.onEditAdvancedSearch()}
                    overrideTooltip="Edit Current Advanced Search"
                    overrideDisableButton={currentAdvancedSearchId == "select"}
                    ConfigEntity={savedSearch}
                    DisplayMode="Glyph" />
                {' '}
                <ButtonNew onClick={() => this.props.onNewAdvancedSearch()}
                    overrideTooltip="Create New Advanced Search"
                    DisplayMode="Glyph" />
                {' '}
                <ButtonDelete
                    overrideTooltip="Delete Advanced Search"
                    overrideDisableButton={currentAdvancedSearchId == "select"}
                    ConfigEntity={savedSearch}
                    DisplayMode="Glyph"
                    ConfirmAction={AdvancedSearchRedux.AdvancedSearchDelete(savedSearch)}
                    ConfirmationMsg={"Are you sure you want to delete '" + !savedSearch ? "" : savedSearch.Name + "'?"}
                    ConfirmationTitle={"Delete Advanced Search"} />
            </div>
        </span>

        return (
            <Panel className="small-padding-panel" >
                <AdaptableBlotterForm inline>
                    {content}
                </AdaptableBlotterForm>

            </Panel>
        );
    }

    onSelectedSearchChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let advancedSearchId = (e.value == "select") ? "" : e.value;
        this.props.onSelectAdvancedSearch(advancedSearchId);
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        CurrentAdvancedSearchUid: state.AdvancedSearch.CurrentAdvancedSearchId,
        AdvancedSearches: state.AdvancedSearch.AdvancedSearches,
        AdvancedSearchDashboardControl: state.Dashboard.DashboardStrategyControls.find(d => d.Strategy == StrategyIds.AdvancedSearchStrategyId),
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSelectAdvancedSearch: (advancedSearchId: string) => dispatch(AdvancedSearchRedux.AdvancedSearchSelect(advancedSearchId)),
        onNewAdvancedSearch: () => dispatch(PopupRedux.PopupShow("AdvancedSearchAction", false, "New")),
        onEditAdvancedSearch: () => dispatch(PopupRedux.PopupShow("AdvancedSearchAction", false, "Edit"))
    };
}

export let AdvancedSearchToolbarControl = connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchToolbarControlComponent);


var borderStyle = {
    border: '2px'
}


