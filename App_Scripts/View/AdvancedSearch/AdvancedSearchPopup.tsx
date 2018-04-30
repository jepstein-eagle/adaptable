import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { Well, HelpBlock } from 'react-bootstrap';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as AdvancedSearchRedux from '../../Redux/ActionsReducers/AdvancedSearchRedux'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import { AdvancedSearchWizard } from './Wizard/AdvancedSearchWizard'
import { AdvancedSearchEntityRow } from './AdvancedSearchEntityRow'
import { Helper } from '../../Core/Helpers/Helper';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from "../UIInterfaces";
import { UIHelper } from '../UIHelper';
import { IColumn } from "../../Core/Interface/IColumn";
import * as StyleConstants from '../../Core/Constants/StyleConstants';
import { StringExtensions } from "../../Core/Extensions/StringExtensions";
import { ExpressionHelper } from "../../Core/Helpers/ExpressionHelper";
import { IAdvancedSearch, IAdaptableBlotterObject } from "../../Core/Api/Interface/AdaptableBlotterObjects";


interface AdvancedSearchPopupProps extends StrategyViewPopupProps<AdvancedSearchPopupComponent> {
    AdvancedSearches: IAdvancedSearch[];
    CurrentAdvancedSearchName: string;
    onAddUpdateAdvancedSearch: (index: number, advancedSearch: IAdvancedSearch) => AdvancedSearchRedux.AdvancedSearchAddUpdateAction,
    onSelectAdvancedSearch: (SelectedSearchName: string) => AdvancedSearchRedux.AdvancedSearchSelectAction,
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction,
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
               let index: number = this.props.AdvancedSearches.findIndex(as=>as.Name == currentAdvancedSearch.Name)
                this.onEdit(index, currentAdvancedSearch)
            }
        }
    }

    render() {
        let cssClassName: string = this.props.cssClassName + "__advancedsearch";
        let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + "__advancedsearch";

        let infoBody: any[] = ["Build multi-column named searches by creating a Query - which will contain a selection of column values, filters and ranges.", <br />, <br />,
            "Created searches are available in the Advanced Search Toolbar dropdown in the Dashboard."]

        let contentSize = (this.props.TeamSharingActivated) ? 6 : 7
        let buttonSize = (this.props.TeamSharingActivated) ? 3 : 2

        let colItems: IColItem[] = [
            { Content: "Current", Size: 1 },
            { Content: "Name", Size: 2 },
            { Content: "Query", Size: contentSize },
            { Content: "", Size: buttonSize },
        ]

        let advancedSearchRows = this.props.AdvancedSearches.map((advancedSearch: IAdvancedSearch, index) => {
            return <AdvancedSearchEntityRow
                cssClassName={cssClassName}
                key={index}
                colItems={colItems}
                IsCurrentAdvancedSearch={advancedSearch.Name == this.props.CurrentAdvancedSearchName}
                AdaptableBlotterObject={advancedSearch}
                Columns={this.props.Columns}
                UserFilters={this.props.UserFilters}
                Index={index}
                onEdit={(index, advancedSearch) => this.onEdit(index, advancedSearch as IAdvancedSearch)}
                onShare={() => this.props.onShare(advancedSearch)}
                TeamSharingActivated={this.props.TeamSharingActivated}
                onDeleteConfirm={AdvancedSearchRedux.AdvancedSearchDelete(advancedSearch)}
                onSelect={() => this.props.onSelectAdvancedSearch(advancedSearch.Name)}
            >
            </AdvancedSearchEntityRow>
        })

        let newSearchButton = <ButtonNew cssClassName={cssClassName} onClick={() => this.onNew()}
            overrideTooltip="Create New Advanced Search"
            DisplayMode="Glyph+Text"
            size={"small"} />

        return <div className={cssClassName}>
            <PanelWithButton cssClassName={cssClassName} bsStyle="primary" headerText={StrategyNames.AdvancedSearchStrategyName} infoBody={infoBody}
                button={newSearchButton} glyphicon={StrategyGlyphs.AdvancedSearchGlyph} className="ab_main_popup" >

                {advancedSearchRows.length > 0 &&
                    <AdaptableObjectCollection cssClassName={cssClassName} colItems={colItems} items={advancedSearchRows} />
                }

                {advancedSearchRows.length == 0 &&
                    <Well bsSize="small">
                        <HelpBlock>Click 'New' to start creating advanced searches.</HelpBlock>
                    </Well>
                }

                {this.state.EditedAdaptableBlotterObject != null &&
                    <AdvancedSearchWizard
                        cssClassName={cssWizardClassName}
                        EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject}
                        ConfigEntities={this.props.AdvancedSearches}
                        ModalContainer={this.props.ModalContainer}
                        Columns={this.props.Columns}
                        UserFilters={this.props.UserFilters}
                        SystemFilters={this.props.SystemFilters}
                        getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList}
                        WizardStartIndex={this.state.WizardStartIndex}
                        onCloseWizard={() => this.onCloseWizard()}
                        onFinishWizard={() => this.onFinishWizard()} 
                        canFinishWizard={()=>this.canFinishWizard()}/>
                }

            </PanelWithButton>
        </div>
    }

    onNew() {
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory.CreateEmptyAdvancedSearch(), WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1 })
    }

    onEdit(index: number,advancedSearch: IAdvancedSearch) {
        let clonedObject: IAdvancedSearch = Helper.cloneObject(advancedSearch);
        this.setState({ EditedAdaptableBlotterObject: clonedObject, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: index })
    }

    onCloseWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    onFinishWizard() {
       let searchIndex: number = this.state.EditedAdaptableBlotterObjectIndex ;
       let currentSearchIndex: number = this.props.AdvancedSearches.findIndex(as=>as.Name == this.props.CurrentAdvancedSearchName)
        let clonedObject: IAdvancedSearch = Helper.cloneObject(this.state.EditedAdaptableBlotterObject);
        this.props.onAddUpdateAdvancedSearch(this.state.EditedAdaptableBlotterObjectIndex, clonedObject);
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
        if (searchIndex== -1 || searchIndex==currentSearchIndex) {// its new so make it the new search or we are editing the current search (but might have changed the name)
            this.props.onSelectAdvancedSearch(clonedObject.Name);
        }
    }

    canFinishWizard() {
        let advancedSearch = this.state.EditedAdaptableBlotterObject as IAdvancedSearch
        return StringExtensions.IsNotNullOrEmpty(advancedSearch.Name)  && ExpressionHelper.IsNotEmptyOrInvalidExpression(advancedSearch.Expression);
  
      }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        AdvancedSearches: state.AdvancedSearch.AdvancedSearches,
        CurrentAdvancedSearchName: state.AdvancedSearch.CurrentAdvancedSearch,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddUpdateAdvancedSearch: (index: number,advancedSearch: IAdvancedSearch) => dispatch(AdvancedSearchRedux.AdvancedSearchAddUpdate(index, advancedSearch)),
        onSelectAdvancedSearch: (selectedSearchName: string) => dispatch(AdvancedSearchRedux.AdvancedSearchSelect(selectedSearchName)),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.AdvancedSearchStrategyId))
    };
}

export let AdvancedSearchPopup = connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchPopupComponent);

