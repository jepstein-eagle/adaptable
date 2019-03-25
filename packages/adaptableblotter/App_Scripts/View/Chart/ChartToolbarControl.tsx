import * as React from "react";
import * as Redux from 'redux'
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux'
import * as ChartRedux from '../../Redux/ActionsReducers/ChartRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps'
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups'
import { SortOrder, AccessLevel } from '../../Utilities/Enums';
import { InputGroup, DropdownButton, MenuItem, OverlayTrigger, Tooltip, Glyphicon } from "react-bootstrap";
import { ButtonClear } from "../Components/Buttons/ButtonClear";
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants'
import { IChartDefinition } from "../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { ButtonShowChart } from "../Components/Buttons/ButtonShowChart";
import { ChartVisibility } from "../../Utilities/ChartEnums";
import { ButtonDelete } from "../Components/Buttons/ButtonDelete";
import { ArrayExtensions } from "../../Utilities/Extensions/ArrayExtensions";
import { DEFAULT_BSSTYLE, INFO_BSSTYLE } from "../../Utilities/Constants/StyleConstants";


interface ChartToolbarControlComponentProps extends ToolbarStrategyViewPopupProps<ChartToolbarControlComponent> {
    ChartDefinitions: IChartDefinition[]
    CurrentChartDefinition: IChartDefinition

    onSelectChartDefinition: (chartDefinition: string) => ChartRedux.ChartDefinitionSelectAction;
    onNewChartDefinition: (popupParams: string) => PopupRedux.PopupShowScreenAction;
    onEditChartDefinition: (popupParams: string) => PopupRedux.PopupShowScreenAction;
    onShowChart: () => SystemRedux.ChartSetChartVisibiityAction;
}

class ChartToolbarControlComponent extends React.Component<ChartToolbarControlComponentProps, {}> {


    render() {
        const selectChartString: string = "Select a Chart"
        let cssClassName: string = this.props.cssClassName + "__Chart";

        let currentChartDefinitionName = this.props.CurrentChartDefinition == null ?
            selectChartString : this.props.CurrentChartDefinition.Name

        let sortedChartDefinitions: IChartDefinition[] = ArrayExtensions.sortArrayWithProperty(SortOrder.Ascending, this.props.ChartDefinitions, "Title")

        let availablechartDefinitions: any[] = sortedChartDefinitions.filter(s => s.Name != currentChartDefinitionName).map((chartDefinition, index) => {
            return <MenuItem key={index} eventKey={index} onClick={() => this.onSelectedChartDefinitionChanged(chartDefinition.Name)} >{chartDefinition.Name}</MenuItem>
        })

        const plusGlyph: any = <OverlayTrigger key={"exportOverlay"} overlay={<Tooltip id="tooltipButton" > {"Create New Chart Definition"}</Tooltip >}>
            <Glyphicon glyph={'plus'} />
        </OverlayTrigger>

        let categoryChartMenuItem = <MenuItem disabled={this.props.AccessLevel == AccessLevel.ReadOnly} onClick={() => this.props.onNewChartDefinition("New | CategoryChart")} key={"categoryChart"}>{"Category Chart"}</MenuItem>
        let pieChartMenuItem = <MenuItem disabled={this.props.AccessLevel == AccessLevel.ReadOnly} onClick={() => this.props.onNewChartDefinition("New | PieChart")} key={"pieChart"}>{"Pie Chart"}</MenuItem>


        let dropdownStyle: string = (this.props.UseSingleColourForButtons) ? DEFAULT_BSSTYLE : INFO_BSSTYLE


        let content = <span>

            <InputGroup>
                <DropdownButton disabled={availablechartDefinitions.length == 0} style={{ minWidth: "120px" }}
                    className={cssClassName} bsSize={this.props.DashboardSize} bsStyle={"default"} title={currentChartDefinitionName} id="Chart" componentClass={InputGroup.Button}>
                    {availablechartDefinitions}
                </DropdownButton>
                {currentChartDefinitionName != selectChartString &&
                    <InputGroup.Button>
                        <ButtonClear
                            bsStyle={"default"}
                            cssClassName={cssClassName}
                            onClick={() => this.onSelectedChartDefinitionChanged("")}
                            size={this.props.DashboardSize}
                            overrideTooltip="Clear Chart"
                            overrideDisableButton={currentChartDefinitionName == selectChartString}
                            DisplayMode="Glyph"
                            AccessLevel={this.props.AccessLevel}
                        />
                    </InputGroup.Button>
                }
            </InputGroup>

            <span className={this.props.AccessLevel == AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : ""}>
                <ButtonShowChart
                    style={{ marginLeft: "2px" }}
                    cssClassName={cssClassName} onClick={() => this.onShowChart()}
                    size={this.props.DashboardSize}
                    overrideTooltip="Show Chart"
                    overrideDisableButton={currentChartDefinitionName == selectChartString}
                    DisplayMode="Glyph"
                    AccessLevel={this.props.AccessLevel}
                    showDefaultStyle={this.props.UseSingleColourForButtons}
                />
                <DropdownButton
                    style={{ marginLeft: "5px" }}
                    bsSize={this.props.DashboardSize}
                    bsStyle={dropdownStyle}
                    title={plusGlyph}
                    id="chartDropdown"
                >
                    {categoryChartMenuItem}
                    {pieChartMenuItem}

                </DropdownButton>

               
                <ButtonEdit
                    style={{ marginLeft: "2px" }}
                    cssClassName={cssClassName} 
                    onClick={() => this.props.onEditChartDefinition("Edit | CategoryChart")}
                    size={this.props.DashboardSize}
                    overrideTooltip="Edit Chart Definition"
                    overrideDisableButton={currentChartDefinitionName == selectChartString}
                    DisplayMode="Glyph"
                    AccessLevel={this.props.AccessLevel}
                    showDefaultStyle={this.props.UseSingleColourForButtons}
                />

                <ButtonDelete
                    style={{ marginLeft: "2px" }}
                    cssClassName={cssClassName}
                    size={this.props.DashboardSize}
                    overrideTooltip="Delete Chart"
                    overrideDisableButton={currentChartDefinitionName == selectChartString}
                    DisplayMode="Glyph"
                    ConfirmAction={ChartRedux.ChartDefinitionDelete(this.props.CurrentChartDefinition)}
                    ConfirmationMsg={"Are you sure you want to delete '" + currentChartDefinitionName + "'?"}
                    ConfirmationTitle={"Delete Chart"}
                    AccessLevel={this.props.AccessLevel}
                    showDefaultStyle={this.props.UseSingleColourForButtons}
                />
            </span>
        </span>


        return <PanelDashboard cssClassName={cssClassName} headerText={StrategyConstants.ChartStrategyName} glyphicon={StrategyConstants.ChartGlyph} onClose={() => this.props.onClose(StrategyConstants.ChartStrategyId)} onConfigure={() => this.props.onConfigure()}>
            {content}
        </PanelDashboard>
    }

    onSelectedChartDefinitionChanged(chartDefinitionName: string) {
        this.props.onSelectChartDefinition(chartDefinitionName);
    }

    onShowChart() {
        this.props.onShowChart();
    }
}

function mapStateToProps(state: AdaptableBlotterState) {
    return {
        CurrentChartDefinition: state.Chart.ChartDefinitions.find(c => c.Name == state.Chart.CurrentChartName),
        ChartDefinitions: state.Chart.ChartDefinitions,

    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSelectChartDefinition: (chartDefinition: string) => dispatch(ChartRedux.ChartDefinitionSelect(chartDefinition)),
        onNewChartDefinition: (popupParams: string) => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ChartStrategyId, ScreenPopups.ChartPopup, popupParams)),
        onEditChartDefinition: (popupParams: string) => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ChartStrategyId, ScreenPopups.ChartPopup, popupParams)),
        onShowChart: () => dispatch(SystemRedux.ChartSetChartVisibility(ChartVisibility.Maximised)),
        onClose: (dashboardControl: string) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ChartStrategyId, ScreenPopups.ChartPopup))
    };
}

export let ChartToolbarControl = connect(mapStateToProps, mapDispatchToProps)(ChartToolbarControlComponent);
