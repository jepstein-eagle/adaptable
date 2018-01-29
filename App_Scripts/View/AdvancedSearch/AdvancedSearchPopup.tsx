import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead'
import { Panel, ListGroup, Well, HelpBlock, FormControl, ControlLabel, Form, FormGroup, Button, OverlayTrigger, Row, Col, Tooltip } from 'react-bootstrap';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { PanelWithInfo } from '../Components/Panels/PanelWithInfo';
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { IColumn, IConfigEntity } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as AdvancedSearchRedux from '../../Redux/ActionsReducers/AdvancedSearchRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import { IAdvancedSearch } from '../../Core/Interface/IAdvancedSearchStrategy';
import { AdaptableWizard } from './..//Wizard/AdaptableWizard'
import { AdvancedSearchWizard } from './Wizard/AdvancedSearchWizard'
import { AdvancedSearchEntityRow } from './AdvancedSearchEntityRow'
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
import { EntityItemList } from '../Components/EntityItemList';

interface AdvancedSearchPopupProps extends IStrategyViewPopupProps<AdvancedSearchPopupComponent> {
    AdvancedSearches: IAdvancedSearch[];
    Columns: IColumn[];
    CurrentAdvancedSearchUid: string;
    onAddUpdateAdvancedSearch: (AdvancedSearch: IAdvancedSearch) => AdvancedSearchRedux.AdvancedSearchAddUpdateAction,
    onSelectAdvancedSearch: (SelectedSearchName: string) => AdvancedSearchRedux.AdvancedSearchSelectAction,
    onShare: (entity: IConfigEntity) => TeamSharingRedux.TeamSharingShareAction,
    UserFilters: IUserFilter[]
}

interface AdvancedSearchPopupInternalState {
    EditedAdvancedSearch: IAdvancedSearch
    WizardStartIndex: number
}

class AdvancedSearchPopupComponent extends React.Component<AdvancedSearchPopupProps, AdvancedSearchPopupInternalState> {
    constructor(props: AdvancedSearchPopupProps) {
        super(props);
        this.state = { EditedAdvancedSearch: null, WizardStartIndex: 0 };
    }

    componentDidMount() {
        if (this.props.PopupParams == "New") {
            this.onNew()
        }
        if (this.props.PopupParams == "Edit") {
            let currentAdvancedSearch = this.props.AdvancedSearches.find(as => as.Uid == this.props.CurrentAdvancedSearchUid)
            if (currentAdvancedSearch) {
                this.onEdit(currentAdvancedSearch)
            }
        }
    }

    render() {
        let infoBody: any[] = ["Build multi-column named searches by creating a Query - which will contain a selection of column values, filters and ranges.", <br />, <br />,
            "Created searches are available in the Advanced Search Toolbar dropdown in the Dashboard.", <br />, <br />,
            "Advanced Searches can be cleared (turned off but not deleted), edited or deleted in this form."]

        let advancedSearchRows = this.props.AdvancedSearches.map((x, index) => {
            return <AdvancedSearchEntityRow
                key={index}
                IsCurrentAdvancedSearch={x.Uid == this.props.CurrentAdvancedSearchUid}
                ConfigEntity={x}
                Columns={this.props.Columns}
                UserFilters={this.props.UserFilters}
                Index={index}
                onEdit={(index, x) => this.onEdit(x as IAdvancedSearch)}
                onShare={() => this.props.onShare(x)}
                TeamSharingActivated={this.props.TeamSharingActivated}
                onDeleteConfirm={AdvancedSearchRedux.AdvancedSearchDelete(x)}
                onSelect={() => this.props.onSelectAdvancedSearch(x.Uid)}
            >
            </AdvancedSearchEntityRow>

        })

        let cellInfo: [string, number][] = [["Live", 1], ["Name", 3], ["Expression", 5], ["", 3]];

        let newSearchButton = <ButtonNew onClick={() => this.onNew()}
            overrideTooltip="Create New Advanced Search"
            DisplayMode="Glyph+Text"
            size={"small"} />

        return <PanelWithButton bsStyle="primary" headerText={StrategyNames.AdvancedSearchStrategyName} infoBody={infoBody}
            button={newSearchButton} glyphicon={StrategyGlyphs.AdvancedSearchGlyph} style={panelStyle}>

            {advancedSearchRows.length > 0 &&
               <EntityItemList cellInfo={cellInfo} items={advancedSearchRows} />
            }

            {advancedSearchRows.length == 0 &&
                <Well bsSize="small">
                    <HelpBlock>Click 'New' to start creating advanced searches.</HelpBlock>
                </Well>
            }

            {this.state.EditedAdvancedSearch != null &&
                <AdvancedSearchWizard
                    EditedConfigEntity={this.state.EditedAdvancedSearch}
                    ConfigEntities={this.props.AdvancedSearches}
                    Columns={this.props.Columns}
                    UserFilters={this.props.UserFilters}
                    getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList}
                    WizardStartIndex={this.state.WizardStartIndex}
                    onCloseWizard={() => this.onCloseWizard()}
                    onFinishWizard={() => this.onFinishWizard()} />
            }

        </PanelWithButton>

        {/* Search details screen - showing contents of current selected search (only visible if there is one) 
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
*/}

    }

    onNew() {
        this.setState({ EditedAdvancedSearch: ObjectFactory.CreateEmptyAdvancedSearch() } as AdvancedSearchPopupInternalState)
    }

    onEdit(advancedSearch: IAdvancedSearch) {
        //we clone the condition as we do not want to mutate the redux state here....
        this.setState({ EditedAdvancedSearch: Helper.cloneObject(advancedSearch) } as AdvancedSearchPopupInternalState)
    }

    onCloseWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedAdvancedSearch: null } as AdvancedSearchPopupInternalState)
    }

    onFinishWizard() {
        let clonedObject: IAdvancedSearch = Helper.cloneObject(this.state.EditedAdvancedSearch);
        this.props.onAddUpdateAdvancedSearch(clonedObject);
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        AdvancedSearches: state.AdvancedSearch.AdvancedSearches,
        CurrentAdvancedSearchUid: state.AdvancedSearch.CurrentAdvancedSearchId,
        Columns: state.Grid.Columns,
        UserFilters: state.UserFilter.UserFilters
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddUpdateAdvancedSearch: (advancedSearch: IAdvancedSearch) => dispatch(AdvancedSearchRedux.AdvancedSearchAddUpdate(advancedSearch)),
        onSelectAdvancedSearch: (selectedSearchName: string) => dispatch(AdvancedSearchRedux.AdvancedSearchSelect(selectedSearchName)),
        onShare: (entity: IConfigEntity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.AdvancedSearchStrategyId))
    };
}

export let AdvancedSearchPopup = connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchPopupComponent);

let panelStyle = {
    width: '800px'
}
