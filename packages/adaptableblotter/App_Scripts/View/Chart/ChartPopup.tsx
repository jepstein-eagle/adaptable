import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { Well } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as ChartRedux from '../../Redux/ActionsReducers/ChartRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { IColumn } from '../../Core/Interface/IColumn';
import { Helper } from '../../Core/Helpers/Helper';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { ChartEntityRow } from './ChartEntityRow'
import { ChartWizard } from './Wizard/ChartWizard'
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { StringExtensions } from '../../Core/Extensions/StringExtensions'
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import * as GeneralConstants from '../../Core/Constants/GeneralConstants';
import { IColItem } from "../UIInterfaces";
import { UIHelper } from '../UIHelper';
import * as StyleConstants from '../../Core/Constants/StyleConstants';
import { IChartDefinition, IAdaptableBlotterObject } from "../../Core/Api/Interface/AdaptableBlotterObjects";

interface ChartPopupProps extends StrategyViewPopupProps<ChartPopupComponent> {
    onAddUpdateChartDefinition: (index: number, chartDefinition: IChartDefinition) => ChartRedux.ChartDefinitionAddUpdateAction,
    onSelectChartDefinition: (SelectedSearchName: string) => ChartRedux.ChartDefinitionSelectAction,
    onShowChart: () => PopupRedux.PopupShowChartAction;
    ChartDefinitions: Array<IChartDefinition>
    CurrentChartName: string
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction
}

class ChartPopupComponent extends React.Component<ChartPopupProps, EditableConfigEntityState> {
    constructor(props: ChartPopupProps) {
        super(props);
        this.state = UIHelper.EmptyConfigState();
    }

    componentDidMount() {
        if (StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {

            if (this.props.PopupParams == "New") {
                this.onNew()
            }
            if (this.props.PopupParams == "Edit") {
                let editChart = this.props.ChartDefinitions.find(x => x.Name == this.props.CurrentChartName)
                if (editChart) {
                    let index: number = this.props.ChartDefinitions.findIndex(cd => cd.Name == editChart.Name)
                    this.onEdit(index, editChart)
                }
            }
        }
    }

    render() {
        let cssClassName: string = this.props.cssClassName + "__Chart";
        let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + "__Chart";

        let infoBody: any[] = ["Use Charts to see youyr grid data visually."]

        let colItems: IColItem[] = [
            { Content: "Name", Size: 4 },
            { Content: "Type", Size: 4 },
            { Content: "Show", Size: 1 },
            { Content: "", Size: 3 },
        ]

        let Charts = this.props.ChartDefinitions.map((Chart: IChartDefinition, index) => {
            return <ChartEntityRow
                cssClassName={cssClassName}
                colItems={colItems}
                AdaptableBlotterObject={Chart}
                key={Chart.Name}
                Index={index}
                onEdit={(index, Chart) => this.onEdit(index, Chart as IChartDefinition)}
                TeamSharingActivated={this.props.TeamSharingActivated}
                onShare={() => this.props.onShare(Chart)}
                onDeleteConfirm={ChartRedux.ChartDefinitionDelete(Chart)}
                onShowChart={(chartName) => this.onShowChart(chartName)}
            />
        });

        let newButton = <ButtonNew cssClassName={cssClassName} onClick={() => this.onNew()}
            overrideTooltip="Create Chart Definition"
            DisplayMode="Glyph+Text"
            size={"small"} />

        return <div className={cssClassName}>
            <PanelWithButton cssClassName={cssClassName} headerText={StrategyNames.ChartStrategyName} className="ab_main_popup" infoBody={infoBody}
                button={newButton} bsStyle="primary" glyphicon={StrategyGlyphs.ChartGlyph}>

                {Charts.length > 0 &&
                    <AdaptableObjectCollection cssClassName={cssClassName} colItems={colItems} items={Charts} />
                }

                {Charts.length == 0 &&
                    <Well bsSize="small">Click 'New' to create a bespoke sort order for a selected column.</Well>
                }

                {this.state.EditedAdaptableBlotterObject &&
                    <ChartWizard
                        cssClassName={cssWizardClassName}
                        EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject as IChartDefinition}
                        ConfigEntities={this.props.ChartDefinitions}
                        ModalContainer={this.props.ModalContainer}
                        Columns={this.props.Columns}
                        UserFilters={this.props.UserFilters}
                        SystemFilters={this.props.SystemFilters}
                        Blotter={this.props.Blotter}
                        WizardStartIndex={this.state.WizardStartIndex}
                        onCloseWizard={() => this.onCloseWizard()}
                        onFinishWizard={() => this.onFinishWizard()}
                        canFinishWizard={() => this.canFinishWizard()}
                    />
                }
            </PanelWithButton>
        </div>
    }


    onShowChart(chartName: string) {
        this.props.onSelectChartDefinition(chartName)
        this.props.onShowChart();
    }

    onEdit(index: number, Chart: IChartDefinition) {
        //so we dont mutate original object
        this.setState({ EditedAdaptableBlotterObject: Helper.cloneObject(Chart), WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: index });
    }

    onNew() {
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory.CreateEmptyChartDefinition(), WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1 });
    }

    onCloseWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    onFinishWizard() {
        let searchIndex: number = this.state.EditedAdaptableBlotterObjectIndex;
        let currentSearchIndex: number = this.props.ChartDefinitions.findIndex(as => as.Name == this.props.CurrentChartName)
        let clonedObject: IChartDefinition = Helper.cloneObject(this.state.EditedAdaptableBlotterObject);
        this.props.onAddUpdateChartDefinition(this.state.EditedAdaptableBlotterObjectIndex, clonedObject);
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
        if (searchIndex == -1 || searchIndex == currentSearchIndex) {// its new so make it the new search or we are editing the current search (but might have changed the name)
            this.props.onSelectChartDefinition(clonedObject.Name);
        }
    }

    canFinishWizard() {
        let Chart = this.state.EditedAdaptableBlotterObject as IChartDefinition
        return StringExtensions.IsNotNullOrEmpty(Chart.Name);
    }

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        ChartDefinitions: state.Chart.ChartDefinitions,
        CurrentChartName: state.Chart.CurrentChartName
    };
}


function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddUpdateChartDefinition: (index: number, chartDefinition: IChartDefinition) => dispatch(ChartRedux.ChartDefinitionAddUpdate(index, chartDefinition)),
        onSelectChartDefinition: (selectedChartDefinitionName: string) => dispatch(ChartRedux.ChartDefinitionSelect(selectedChartDefinitionName)),
        onShowChart: () => dispatch(PopupRedux.PopupShowChart()),
        onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam()),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.ChartStrategyId))
    };
}

export let ChartPopup = connect(mapStateToProps, mapDispatchToProps)(ChartPopupComponent);
