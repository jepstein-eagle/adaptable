import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead'
import { Panel, FormControl, ControlLabel, Form, FormGroup, Button, OverlayTrigger, Row, Col, Tooltip } from 'react-bootstrap';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { PanelWithInfo } from '../Components/Panels/PanelWithInfo';
import { IColumn, IConfigEntity } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as AdvancedSearchRedux from '../../Redux/ActionsReducers/AdvancedSearchRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import { IAdvancedSearch } from '../../Core/Interface/IAdvancedSearchStrategy';
import { AdaptableWizard } from './..//Wizard/AdaptableWizard'
import { AdvancedSearchExpressionWizard } from './AdvancedSearchExpressionWizard'
import { AdvancedSearchSettingsWizard } from './AdvancedSearchSettingsWizard'
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { Helper } from '../../Core/Helper';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { ExpressionBuilderPreview } from '../ExpressionBuilder/ExpressionBuilderPreview'
import { PopupState } from '../../Redux/ActionsReducers/Interface/IState'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IUserFilter } from '../../Core/Interface/IExpression'
import { StringExtensions } from '../../Core/Extensions'
import { IUIConfirmation } from '../../Core/Interface/IStrategy';
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import { ButtonDelete } from '../Components/Buttons/ButtonDelete';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { SortOrder } from '../../Core/Enums';
import { ButtonShare } from "../Components/Buttons/ButtonShare";
import * as StrategyIds from '../../Core/StrategyIds'
import * as StrategyNames from '../../Core/StrategyNames'
import * as StrategyGlyphs from '../../Core/StrategyGlyphs'

interface AdvancedSearchActionProps extends IStrategyViewPopupProps<AdvancedSearchActionComponent> {
    AdvancedSearches: IAdvancedSearch[];
    Columns: IColumn[];
    CurrentAdvancedSearchUid: string;
    onAddUpdateAdvancedSearch: (AdvancedSearch: IAdvancedSearch) => AdvancedSearchRedux.AdvancedSearchAddUpdateAction,
    onSelectAdvancedSearch: (SelectedSearchName: string) => AdvancedSearchRedux.AdvancedSearchSelectAction,
    onShare: (entity: IConfigEntity) => TeamSharingRedux.TeamSharingShareAction,
    UserFilters: IUserFilter[]
}

interface AdvancedSearchActionInternalState {
    EditedAdvancedSearch: IAdvancedSearch
    //Jo: not sure I understand the goal of this property on the state. 
    SelectedColumnId: string
}

class AdvancedSearchActionComponent extends React.Component<AdvancedSearchActionProps, AdvancedSearchActionInternalState> {
    constructor(props: AdvancedSearchActionProps) {
        super(props);
        this.state = { EditedAdvancedSearch: null, SelectedColumnId: "" };
    }
    componentWillReceiveProps(nextProps: AdvancedSearchActionProps, nextContext: any) {
        //if there was a selected search and parent unset the column we then clear the component 
        // otherwise it's correctly unselected but the input still have the previsous selected text
        if (StringExtensions.IsNullOrEmpty(nextProps.CurrentAdvancedSearchUid) && StringExtensions.IsNotNullOrEmpty(this.props.CurrentAdvancedSearchUid)) {
            (this.refs.typeahead as any).getInstance().clear()
        }
    }

    componentDidMount() {
        if (this.props.PopupParams == "New") {
            this.onNewAdvancedSearch()
        }
        if (this.props.PopupParams == "Edit") {
            this.onEditAdvancedSearch()
        }
    }

    private getClonedSelectedAdvancedSearch() {
        //we clone the object since there are methods that change directly the object from the state and 
        //I'm rewrtting enough of the component like that
        let selectedAdvancedSearch: IAdvancedSearch = this.props.AdvancedSearches.find(a => a.Uid == this.props.CurrentAdvancedSearchUid);
        if (selectedAdvancedSearch) {
            selectedAdvancedSearch = Helper.cloneObject(selectedAdvancedSearch)
        }
        return selectedAdvancedSearch
    }

    render() {
        let infoBody: any[] = ["Build multi-column named searches by creating a Query - which will contain a selection of column values, filters and ranges.", <br />, <br />,
            "Created searches are available in the Advanced Search Toolbar dropdown in the Dashboard.", <br />, <br />,
            "Advanced Searches can be cleared (turned off but not deleted), edited or deleted in this form."]

        let detailsInfoBody: any[] = ["Stuff about details."]

        let savedSearch: IAdvancedSearch = this.props.AdvancedSearches.find(s => s.Uid == this.props.CurrentAdvancedSearchUid);
        let sortedAdvancedSearches = Helper.sortArrayWithProperty(SortOrder.Ascending, this.props.AdvancedSearches, "Name")

        let selectedAdvancedSearch: IAdvancedSearch = this.getClonedSelectedAdvancedSearch();
        let selectedAdvancedSearchName: string = selectedAdvancedSearch == null ? "" : selectedAdvancedSearch.Name;

        let newSearchButton = <ButtonNew onClick={() => this.onNewAdvancedSearch()}
            overrideTooltip="Create New Advanced Search"
            DisplayMode="Glyph+Text" />
        let editSearchButton = <ButtonEdit onClick={() => this.onEditAdvancedSearch()}
            overrideTooltip="Edit Search"
            ConfigEntity={selectedAdvancedSearch}
            DisplayMode="Glyph+Text" />
        return (
            <div >
                <PanelWithButton bsStyle="primary" headerText={StrategyNames.AdvancedSearchStrategyName}
                    infoBody={infoBody}
                    button={newSearchButton} glyphicon={StrategyGlyphs.AdvancedSearchGlyph}>
                    {/* The main Search selection form */}
                    <AdaptableBlotterForm horizontal>
                        <FormGroup controlId="formInlineName">
                            <Col xs={2}>
                                <ControlLabel>  Current: </ControlLabel>
                            </Col>
                            <Col xs={4}>
                                <Typeahead className={"adaptable_blotter_typeahead_inline"} ref="typeahead" emptyLabel={"No Advanced Search found with that search"}
                                    placeholder={"Select a Search"}
                                    labelKey={"Name"}
                                    filterBy={["Name"]}
                                    clearButton={true}
                                    selected={savedSearch ? [savedSearch] : []}
                                    onChange={(selected) => { this.onSelectedSearchChanged(selected) }}
                                    options={sortedAdvancedSearches}
                                />
                            </Col>
                            <Col xs={6}>
                                <ButtonEdit onClick={() => this.onEditAdvancedSearch()}
                                    overrideTooltip="Edit Search"
                                    overrideDisableButton={selectedAdvancedSearch == null}
                                    ConfigEntity={selectedAdvancedSearch}
                                    DisplayMode="Glyph+Text" />
                                {' '}
                                <ButtonDelete
                                    overrideTooltip="Delete Search"
                                    overrideDisableButton={selectedAdvancedSearch == null}
                                    ConfigEntity={selectedAdvancedSearch}
                                    DisplayMode="Glyph+Text"
                                    ConfirmAction={AdvancedSearchRedux.AdvancedSearchDelete(selectedAdvancedSearch)}
                                    ConfirmationMsg={"Are you sure you want to delete '" + selectedAdvancedSearchName + "'?"}
                                    ConfirmationTitle={"Delete Advanced Search"} />
                                {' '}
                                {this.props.TeamSharingActivated && <ButtonShare onClick={() => this.props.onShare(selectedAdvancedSearch)}
                                    overrideTooltip="Share Search"
                                    overrideDisableButton={selectedAdvancedSearch == null}
                                    ConfigEntity={selectedAdvancedSearch}
                                    DisplayMode="Glyph+Text" />}
                            </Col>
                        </FormGroup>
                    </AdaptableBlotterForm>
                    {/* Wizard for creating or ediiting searches */}
                    {this.state.EditedAdvancedSearch != null &&
                        <AdaptableWizard Steps={
                            [
                                <AdvancedSearchExpressionWizard
                                    ColumnList={this.props.Columns}
                                    UserFilters={this.props.UserFilters}
                                    SelectedColumnId={this.state.SelectedColumnId}
                                    getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList} />,
                                <AdvancedSearchSettingsWizard AdvancedSearches={this.props.AdvancedSearches}/>
                            ]}
                            Data={this.state.EditedAdvancedSearch}
                            StepStartIndex={0}
                            onHide={() => this.onCloseWizard()}
                            onFinish={() => this.onFinishWizard()} >
                        </AdaptableWizard>}

                </PanelWithButton>

                {/* Search details screen - showing contents of current selected search (only visible if there is one) */}
                {selectedAdvancedSearch != null &&

                    <PanelWithInfo bsStyle="primary" bsSize="small" header="Search Details" infoBody={detailsInfoBody} >
                        <div style={previewDivStyle}>
                            <ExpressionBuilderPreview Expression={selectedAdvancedSearch.Expression}
                                UserFilters={this.props.UserFilters}
                                onSelectedColumnChange={(columnName) => this.onSelectedColumnChange(columnName)}
                                SelectedColumnId={this.state.SelectedColumnId}
                                ColumnsList={this.props.Columns}
                                DeleteColumnValue={(columnId: string, value: any) => this.onDeleteColumnValue(columnId, value)}
                                DeleteUserFilterExpression={(columnId: string, index: number) => this.onDeleteUserFilterExpression(columnId, index)}
                                DeleteRange={(columnId: string, index: number) => this.onDeleteRange(columnId, index)}
                                ShowPanel={false}
                                ReadOnlyMode={selectedAdvancedSearch.IsPredefined}>
                            </ExpressionBuilderPreview>
                        </div>
                    </PanelWithInfo>

                }

            </div>
        );
    }

    // New search: sets the edited search to a new blank search which will force the wizard to show
    onNewAdvancedSearch() {
        this.setState({ EditedAdvancedSearch: ObjectFactory.CreateEmptyAdvancedSearch(), SelectedColumnId: "" } as AdvancedSearchActionInternalState)
    }

    // Edit search: sets the edited search to the current selected search which will force the wizard to show
    onEditAdvancedSearch() {
        let clonedSearch: IAdvancedSearch = this.getClonedSelectedAdvancedSearch();
        this.setState({ EditedAdvancedSearch: clonedSearch } as AdvancedSearchActionInternalState)
    }

    onDeleteColumnValue(columnId: string, value: any) {
        let clonedSearch: IAdvancedSearch = this.getClonedSelectedAdvancedSearch();
        let columnValues = clonedSearch.Expression.ColumnDisplayValuesExpressions.find(x => x.ColumnName == columnId)
        let index = columnValues.ColumnValues.indexOf(value)
        columnValues.ColumnValues.splice(index, 1)
        if (columnValues.ColumnValues.length == 0) {
            let columnValuesIndex = clonedSearch.Expression.ColumnDisplayValuesExpressions.findIndex(x => x.ColumnName == columnId)
            clonedSearch.Expression.ColumnDisplayValuesExpressions.splice(columnValuesIndex, 1)
        }
        this.props.onAddUpdateAdvancedSearch(clonedSearch);
    }

    onDeleteUserFilterExpression(columnId: string, index: number) {
        let clonedSearch: IAdvancedSearch = this.getClonedSelectedAdvancedSearch();
        let columnUserFilterExpressions = clonedSearch.Expression.UserFilters.find(x => x.ColumnName == columnId)
        columnUserFilterExpressions.UserFilterUids.splice(index, 1)
        if (columnUserFilterExpressions.UserFilterUids.length == 0) {
            let columnUserFilterExpressionIndex = clonedSearch.Expression.UserFilters.findIndex(x => x.ColumnName == columnId)
            clonedSearch.Expression.UserFilters.splice(columnUserFilterExpressionIndex, 1)
        }
        this.props.onAddUpdateAdvancedSearch(clonedSearch);
    }

    onDeleteRange(columnId: string, index: number) {
        let clonedSearch: IAdvancedSearch = this.getClonedSelectedAdvancedSearch();
        let columnRanges = clonedSearch.Expression.RangeExpressions.find(x => x.ColumnName == columnId)
        columnRanges.Ranges.splice(index, 1)
        if (columnRanges.Ranges.length == 0) {
            let columnRangesIndex = clonedSearch.Expression.RangeExpressions.findIndex(x => x.ColumnName == columnId)
            clonedSearch.Expression.RangeExpressions.splice(columnRangesIndex, 1)
        }
        this.props.onAddUpdateAdvancedSearch(clonedSearch);
    }

    onSelectedColumnChange(columnName: string) {
        let clonedSearch: IAdvancedSearch = this.getClonedSelectedAdvancedSearch();
        this.setState({ SelectedColumnId: columnName, EditedAdvancedSearch: clonedSearch } as AdvancedSearchActionInternalState)
    }

    onCloseWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedAdvancedSearch: null } as AdvancedSearchActionInternalState)
    }

    onFinishWizard() {
        let clonedObject: IAdvancedSearch = Helper.cloneObject(this.state.EditedAdvancedSearch);
        this.props.onAddUpdateAdvancedSearch(clonedObject);
    }

    onSelectedSearchChanged(selected: IAdvancedSearch[]) {
        this.props.onSelectAdvancedSearch(selected.length > 0 ? selected[0].Uid : "");
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        AdvancedSearches: state.AdvancedSearch.AdvancedSearches,
        CurrentAdvancedSearchUid: state.AdvancedSearch.CurrentAdvancedSearchId,
        Columns: state.Grid.Columns,
        UserFilters: state.Filter.UserFilters
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddUpdateAdvancedSearch: (advancedSearch: IAdvancedSearch) => dispatch(AdvancedSearchRedux.AdvancedSearchAddUpdate(advancedSearch)),
        onSelectAdvancedSearch: (selectedSearchName: string) => dispatch(AdvancedSearchRedux.AdvancedSearchSelect(selectedSearchName)),
        onShare: (entity: IConfigEntity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.AdvancedSearchStrategyId))
    };
}

export let AdvancedSearchAction = connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchActionComponent);

var divStyle = {
    overflowY: 'auto',
    maxHeight: '400px',
    margin: '6px'
};

var previewDivStyle: React.CSSProperties = {
    overflowY: 'auto',
    maxHeight: '350px',
};

let smallButtonStyle = {
    margin: '2px'
}