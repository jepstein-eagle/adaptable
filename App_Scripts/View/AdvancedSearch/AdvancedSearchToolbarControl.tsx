import * as React from "react";
import * as Redux from 'redux'
import { Provider, connect } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead'
import { Panel, Form, FormControl, ControlLabel, Label, Button, OverlayTrigger, Tooltip, Glyphicon, FormGroup, HelpBlock, Row } from 'react-bootstrap';
import { IAdvancedSearch } from '../../Core/Interface/IAdvancedSearchStrategy';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as AdvancedSearchRedux from '../../Redux/ActionsReducers/AdvancedSearchRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { IToolbarStrategyViewPopupProps } from '../../Core/Interface/IToolbarStrategyView'
import { StringExtensions } from '../../Core/Extensions'
import { IUIConfirmation } from '../../Core/Interface/IStrategy';
import { Helper } from '../../Core/Helper';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { IDashboardStrategyControlConfiguration } from '../../Core/Interface/IDashboardStrategy';
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import { ButtonDelete } from '../Components/Buttons/ButtonDelete';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyIds from '../../Core/StrategyIds'
import * as StrategyGlyphs from '../../Core/StrategyGlyphs'
import * as StrategyNames from '../../Core/StrategyNames'
import * as ScreenPopups from '../../Core/ScreenPopups'
import { SortOrder } from '../../Core/Enums';

interface AdvancedSearchToolbarControlComponentProps extends IToolbarStrategyViewPopupProps<AdvancedSearchToolbarControlComponent> {
    CurrentAdvancedSearchUid: string;
    AdvancedSearches: IAdvancedSearch[];
    onSelectAdvancedSearch: (advancedSearchId: string) => AdvancedSearchRedux.AdvancedSearchSelectAction;
    onNewAdvancedSearch: () => PopupRedux.PopupShowAction;
    onEditAdvancedSearch: () => PopupRedux.PopupShowAction;
 }

class AdvancedSearchToolbarControlComponent extends React.Component<AdvancedSearchToolbarControlComponentProps, {}> {
    componentWillReceiveProps(nextProps: AdvancedSearchToolbarControlComponentProps, nextContext: any) {
        //if there was a selected search and parent unset the column we then clear the component 
        // otherwise it's correctly unselected but the input still have the previsous selected text
        if (StringExtensions.IsNullOrEmpty(nextProps.CurrentAdvancedSearchUid) && StringExtensions.IsNotNullOrEmpty(this.props.CurrentAdvancedSearchUid)) {
            (this.refs.typeahead as any).getInstance().clear()
        }
    }
    render() {
        let savedSearch: IAdvancedSearch = this.props.AdvancedSearches.find(s => s.Uid == this.props.CurrentAdvancedSearchUid);

        let currentAdvancedSearchId = StringExtensions.IsNullOrEmpty(this.props.CurrentAdvancedSearchUid) ?
            "select" : this.props.CurrentAdvancedSearchUid

        let sortedAdvancedSearches = Helper.sortArrayWithProperty(SortOrder.Ascending, this.props.AdvancedSearches, "Name")

        let content = <span>
            <div className={this.props.IsReadOnly ? "adaptable_blotter_readonly" : ""}>
                <Typeahead className={"adaptable_blotter_typeahead_inline"} ref="typeahead" emptyLabel={"No Advanced Search found with that search"}
                    placeholder={"Select a Search"}
                    labelKey={"Name"}
                    filterBy={["Name"]}
                    clearButton={true}
                    selected={savedSearch ? [savedSearch] : []}
                    onChange={(selected) => { this.onSelectedSearchChanged(selected) }}
                    options={sortedAdvancedSearches}
                />
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
        return <PanelDashboard headerText={StrategyNames.AdvancedSearchStrategyName} glyphicon={StrategyGlyphs.AdvancedSearchGlyph} onClose={ ()=> this.props.onClose(this.props.DashboardControl)} onConfigure={()=>this.props.onConfigure()}>
            {content}
        </PanelDashboard>
    }

    onSelectedSearchChanged(selected: IAdvancedSearch[]) {
        this.props.onSelectAdvancedSearch(selected.length > 0 ? selected[0].Uid : "");
    }


   
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        DashboardControl: state.Dashboard.DashboardStrategyControls.find(d => d.Strategy == StrategyIds.AdvancedSearchStrategyId),
         CurrentAdvancedSearchUid: state.AdvancedSearch.CurrentAdvancedSearchId,
        AdvancedSearches: state.AdvancedSearch.AdvancedSearches,
        AdvancedSearchDashboardControl: state.Dashboard.DashboardStrategyControls.find(d => d.Strategy == StrategyIds.AdvancedSearchStrategyId),
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSelectAdvancedSearch: (advancedSearchId: string) => dispatch(AdvancedSearchRedux.AdvancedSearchSelect(advancedSearchId)),
        onNewAdvancedSearch: () => dispatch(PopupRedux.PopupShow("AdvancedSearchAction", false, "New")),
        onEditAdvancedSearch: () => dispatch(PopupRedux.PopupShow("AdvancedSearchAction", false, "Edit")),
        onClose: (dashboardControl: IDashboardStrategyControlConfiguration) => dispatch(DashboardRedux.ChangeVisibilityDashboardControl(dashboardControl.Strategy, false)),
        onConfigure: () => dispatch(PopupRedux.PopupShow(ScreenPopups.AdvancedSearchActionPopup))
    };
}

export let AdvancedSearchToolbarControl = connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchToolbarControlComponent);


var borderStyle = {
    border: '2px'
}


