import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { ChartDisplayPopupPropsBase } from "../Components/SharedProps/ChartDisplayPopupPropsBase";
import { IChartDefinition, ICategoryChartDefinition, IChartProperties, IPieChartDefinition } from "../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { ChartVisibility, ChartType } from "../../Utilities/ChartEnums";
import { ButtonClose } from "../Components/Buttons/ButtonClose";
import { PRIMARY_BSSTYLE } from "../../Utilities/Constants/StyleConstants";
import { ButtonEdit } from "../Components/Buttons/ButtonEdit";
import { ButtonMaximise } from "../Components/Buttons/ButtonMaximise";
import { ButtonMinimise } from "../Components/Buttons/ButtonMinimise";
import { PanelWithImageThreeButtons } from "../Components/Panels/PanelWithIImageThreeButtons";
import { CategoryChartWizard } from "./CategoryChart/Wizard/CategoryChartWizard";
import { Helper } from "../../Utilities/Helpers/Helper";
import { StringExtensions } from "../../Utilities/Extensions/StringExtensions";
import { AdaptableBlotterState } from "../../Redux/Store/Interface/IAdaptableStore";
import * as ChartRedux from '../../Redux/ActionsReducers/ChartRedux'
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux'
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { CategoryChartComponent } from "./CategoryChart/CategoryChartComponent";
import { PieChartComponent } from "./PieChart/PieChartComponent";

/*
This is really only going to be for Category Charts.
As we add other chart types we will need to rethink this and some of the assumptions
*/
interface ChartDisplayPopupProps extends ChartDisplayPopupPropsBase<ChartDisplayPopupComponent> {
    ChartDefinitions: IChartDefinition[];
    CurrentChartDefinition: IChartDefinition;
    ChartData: any;
    ChartVisibility: ChartVisibility;

    onAddUpdateChartDefinition: (index: number, chartDefinition: IChartDefinition) => ChartRedux.ChartDefinitionAddUpdateAction,
    onSelectChartDefinition: (chartDefinition: string) => ChartRedux.ChartDefinitionSelectAction,
    onSetChartVisibility: (chartVisibility: ChartVisibility) => SystemRedux.ChartSetChartVisibiityAction
    // this we need to get from the child
    onUpdateChartProperties: (chartTitle: string, chartProperties: IChartProperties) => ChartRedux.ChartPropertiesUpdateAction,

}

export interface ChartDisplayPopupState {
    // Global
    EditedChartDefinition: IChartDefinition;

}

class ChartDisplayPopupComponent extends React.Component<ChartDisplayPopupProps, ChartDisplayPopupState> {

    constructor(props: ChartDisplayPopupProps) {
        super(props);


        this.state = { EditedChartDefinition: null };
    }

    componentWillReceiveProps(nextProps: ChartDisplayPopupProps, nextContext: any) {
        if (nextProps.CurrentChartDefinition.Name != this.props.CurrentChartDefinition.Name) {
            this.state = { EditedChartDefinition: null };
        }
    }

    render() {

        // temp till do properly
        let currentChartType: ChartType = this.props.CurrentChartDefinition.ChartType;

        let cssClassName: string = this.props.cssClassName + "__Charts";

        let closeButton = (this.props.ShowModal) ?
            null :
            <ButtonClose
                cssClassName={cssClassName}
                onClick={() => this.props.onClose()}
                bsStyle={PRIMARY_BSSTYLE}
                size={"small"}
                DisplayMode="Glyph"
                hideToolTip={true}
            />

        let editButton = (this.props.ChartVisibility == ChartVisibility.Minimised) ?
            null :
            <ButtonEdit
                cssClassName={cssClassName}
                style={{ marginRight: "5px" }}
                onClick={() => this.onEditChart()}
                bsStyle={PRIMARY_BSSTYLE}
                size={"small"}
                DisplayMode="Glyph+Text"
                overrideText="Edit Chart"
                hideToolTip={true}
            />


        let minmaxButton = (this.props.ShowModal) ?
            null :
            this.props.ChartVisibility == ChartVisibility.Minimised ?
                <ButtonMaximise
                    cssClassName={cssClassName}
                    onClick={() => this.onChartMaximised()}
                    bsStyle={PRIMARY_BSSTYLE}
                    size={"small"}
                    DisplayMode="Glyph"
                    hideToolTip={true}
                />
                :
                <ButtonMinimise
                    cssClassName={cssClassName}
                    onClick={() => this.onChartMinimised()}
                    bsStyle={PRIMARY_BSSTYLE}
                    size={"small"}
                    DisplayMode="Glyph"
                    hideToolTip={true}
                />


        // this is how we decide whether to show the chart...
        // let chartElement = (this.props.ChartVisibility == ChartVisibility.Maximised && this.props.ChartData != null && this.props.CurrentChartDefinition != null) ?


        return <span className={cssClassName}>
            <PanelWithImageThreeButtons
                cssClassName={cssClassName}
                header={StrategyConstants.ChartStrategyName}
                bsStyle={PRIMARY_BSSTYLE}
                style={{ marginRight: '30px' }}
                glyphicon={StrategyConstants.ChartGlyph}
                secondButton={closeButton}
                firstButton={editButton}
                thirdButton={minmaxButton}
            >

                {this.props.ChartVisibility == ChartVisibility.Maximised && this.props.ChartData != null && this.props.CurrentChartDefinition != null &&
                    <div>
                        {currentChartType == ChartType.CategoryChart ?
                            <CategoryChartComponent
                                CurrentChartDefinition={this.props.CurrentChartDefinition as ICategoryChartDefinition}
                                ChartData={this.props.ChartData}
                                ColorPalette={this.props.ColorPalette}
                                Columns={this.props.Columns}
                                cssClassName={this.props.cssClassName}
                                onUpdateChartProperties={(chartTitle, chartProperties) => this.props.onUpdateChartProperties(chartTitle, chartProperties)}
                            />
                            :
                            <PieChartComponent
                                CurrentChartDefinition={this.props.CurrentChartDefinition as IPieChartDefinition}
                                ChartData={this.props.ChartData}
                                //   ColorPalette={this.props.ColorPalette}
                                //   Columns={this.props.Columns}
                                cssClassName={this.props.cssClassName}
                            //  onUpdateChartProperties={(chartTitle, chartProperties)=> this.props.onUpdateChartProperties(chartTitle, chartProperties)}
                            />
                        }
                    </div>
                }

            </PanelWithImageThreeButtons>

            {this.state.EditedChartDefinition &&
                <CategoryChartWizard
                    cssClassName={cssClassName}
                    EditedAdaptableBlotterObject={this.state.EditedChartDefinition}
                    ConfigEntities={this.props.ChartDefinitions}
                    ModalContainer={this.props.ModalContainer}
                    Columns={this.props.Columns}
                    UserFilters={this.props.UserFilters}
                    SystemFilters={this.props.SystemFilters}
                    Blotter={this.props.Blotter}
                    WizardStartIndex={0}
                    onCloseWizard={() => this.onCloseWizard()}
                    onFinishWizard={() => this.onFinishWizard()}
                    canFinishWizard={() => this.canFinishWizard()}
                />
            }

        </span>
    }

    onEditChart(): void {
        this.setState({ EditedChartDefinition: Helper.cloneObject(this.props.CurrentChartDefinition) });
    }

    onChartMinimised() {
        this.props.onSetChartVisibility(ChartVisibility.Minimised);
    }

    onChartMaximised() {
        this.props.onSetChartVisibility(ChartVisibility.Maximised);
    }




    onCloseWizard() {
        this.setState({ EditedChartDefinition: null });
    }

    onFinishWizard() {
        let clonedObject: IChartDefinition = Helper.cloneObject(this.state.EditedChartDefinition);
        let index: number = this.props.ChartDefinitions.findIndex(cd => cd.Name == this.state.EditedChartDefinition.Name);
        this.props.onAddUpdateChartDefinition(index, clonedObject);
        this.setState({ EditedChartDefinition: null });
        this.props.onSelectChartDefinition(clonedObject.Name);
    }

    canFinishWizard() {
        return StringExtensions.IsNotNullOrEmpty(this.state.EditedChartDefinition.Name);
    }

}

function mapStateToProps(state: AdaptableBlotterState) {
    return {
        ChartDefinitions: state.Chart.ChartDefinitions,
        CurrentChartDefinition: state.Chart.ChartDefinitions.find(c => c.Name == state.Chart.CurrentChartName),
        ChartData: state.System.ChartData,
        ChartVisibility: state.System.ChartVisibility,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddUpdateChartDefinition: (index: number, chartDefinition: IChartDefinition) => dispatch(ChartRedux.ChartDefinitionAddUpdate(index, chartDefinition)),
        onSelectChartDefinition: (chartDefinition: string) => dispatch(ChartRedux.ChartDefinitionSelect(chartDefinition)),
        onSetChartVisibility: (chartVisibility: ChartVisibility) => dispatch(SystemRedux.ChartSetChartVisibility(chartVisibility)),
        onUpdateChartProperties: (chartTitle: string, chartProperties: IChartProperties) => dispatch(ChartRedux.ChartPropertiesUpdate(chartTitle, chartProperties)),

    };
}

export let ChartDisplayPopup = connect(mapStateToProps, mapDispatchToProps)(ChartDisplayPopupComponent);
