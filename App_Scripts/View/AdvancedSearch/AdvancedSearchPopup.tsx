import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { Well, HelpBlock } from 'react-bootstrap';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { IColumn, IAdaptableBlotterObject } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as AdvancedSearchRedux from '../../Redux/ActionsReducers/AdvancedSearchRedux'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import { IAdvancedSearch } from '../../Strategy/Interface/IAdvancedSearchStrategy';
import { AdvancedSearchWizard } from './Wizard/AdvancedSearchWizard'
import { AdvancedSearchEntityRow } from './AdvancedSearchEntityRow'
import { Helper } from '../../Core/Helpers/Helper';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { IUserFilter } from '../../Strategy/Interface/IUserFilterStrategy';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import { EntityCollectionView } from '../Components/EntityCollectionView';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from "../UIInterfaces";
import { UIHelper } from '../UIHelper';

interface AdvancedSearchPopupProps extends StrategyViewPopupProps<AdvancedSearchPopupComponent> {
    AdvancedSearches: IAdvancedSearch[];
    Columns: IColumn[];
    CurrentAdvancedSearchName: string;
    onAddUpdateAdvancedSearch: (AdvancedSearch: IAdvancedSearch) => AdvancedSearchRedux.AdvancedSearchAddUpdateAction,
    onSelectAdvancedSearch: (SelectedSearchName: string) => AdvancedSearchRedux.AdvancedSearchSelectAction,
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction,
    UserFilters: IUserFilter[]
}



class AdvancedSearchPopupComponent extends React.Component<AdvancedSearchPopupProps, EditableConfigEntityState> {
    constructor(props: AdvancedSearchPopupProps) {
        super(props);
        this.state = UIHelper.EmptyConfigState();
    }

    componentDidMount() {
        if (this.props.PopupParams == "New") {
            this.onNew()
        }
        if (this.props.PopupParams == "Edit") {
            let currentAdvancedSearch = this.props.AdvancedSearches.find(as => as.Name == this.props.CurrentAdvancedSearchName)
            if (currentAdvancedSearch) {
                this.onEdit(currentAdvancedSearch)
            }
        }
    }

    render() {
        let infoBody: any[] = ["Build multi-column named searches by creating a Query - which will contain a selection of column values, filters and ranges.", <br />, <br />,
            "Created searches are available in the Advanced Search Toolbar dropdown in the Dashboard."]

        let colItems: IColItem[] = [
            { Content: "Live", Size: 1 },
            { Content: "Name", Size: 2 },
            { Content: "Query", Size: 6 },
            { Content: "", Size: 3 },
        ]

        let advancedSearchRows = this.props.AdvancedSearches.map((x, index) => {
            return <AdvancedSearchEntityRow
                key={index}
                ColItems={colItems}
                IsCurrentAdvancedSearch={x.Name == this.props.CurrentAdvancedSearchName}
                ConfigEntity={x}
                Columns={this.props.Columns}
                UserFilters={this.props.UserFilters}
                Index={index}
                onEdit={(index, x) => this.onEdit(x as IAdvancedSearch)}
                onShare={() => this.props.onShare(x)}
                TeamSharingActivated={this.props.TeamSharingActivated}
                onDeleteConfirm={AdvancedSearchRedux.AdvancedSearchDelete(x)}
                onSelect={() => this.props.onSelectAdvancedSearch(x.Name)}
            >
            </AdvancedSearchEntityRow>
        })

        let newSearchButton = <ButtonNew onClick={() => this.onNew()}
            overrideTooltip="Create New Advanced Search"
            DisplayMode="Glyph+Text"
            size={"small"} />

        return <PanelWithButton bsStyle="primary" headerText={StrategyNames.AdvancedSearchStrategyName} infoBody={infoBody}
            button={newSearchButton} glyphicon={StrategyGlyphs.AdvancedSearchGlyph} style={widePanelStyle}>

            {advancedSearchRows.length > 0 &&
                <EntityCollectionView ColItems={colItems} items={advancedSearchRows} />
            }

            {advancedSearchRows.length == 0 &&
                <Well bsSize="small">
                    <HelpBlock>Click 'New' to start creating advanced searches.</HelpBlock>
                </Well>
            }

            {this.state.EditedConfigEntity != null &&
                <AdvancedSearchWizard
                    EditedConfigEntity={this.state.EditedConfigEntity}
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
        this.setState({ EditedConfigEntity: ObjectFactory.CreateEmptyAdvancedSearch(), WizardStartIndex: 0, EditedIndexConfigEntity: 0 })
    }

    onEdit(advancedSearch: IAdvancedSearch) {
        let clonedObject: IAdvancedSearch = Helper.cloneObject(advancedSearch);
        this.setState({ EditedConfigEntity: clonedObject, WizardStartIndex: 0, EditedIndexConfigEntity: 0 })
    }

    onCloseWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity: -1, });
    }

    onFinishWizard() {
        let clonedObject: IAdvancedSearch = Helper.cloneObject(this.state.EditedConfigEntity);
        this.setState({ EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity: -1, });
        this.props.onAddUpdateAdvancedSearch(clonedObject);
        this.props.onSelectAdvancedSearch(clonedObject.Name);
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        AdvancedSearches: state.AdvancedSearch.AdvancedSearches,
        CurrentAdvancedSearchName: state.AdvancedSearch.CurrentAdvancedSearch,
        Columns: state.Grid.Columns,
        UserFilters: state.UserFilter.UserFilters
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddUpdateAdvancedSearch: (advancedSearch: IAdvancedSearch) => dispatch(AdvancedSearchRedux.AdvancedSearchAddUpdate(advancedSearch)),
        onSelectAdvancedSearch: (selectedSearchName: string) => dispatch(AdvancedSearchRedux.AdvancedSearchSelect(selectedSearchName)),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.AdvancedSearchStrategyId))
    };
}

export let AdvancedSearchPopup = connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchPopupComponent);

let widePanelStyle = {
    width: '800px'
}
