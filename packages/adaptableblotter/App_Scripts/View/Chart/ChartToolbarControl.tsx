import * as React from "react";
import * as Redux from 'redux'
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux'
import * as ChartRedux from '../../Redux/ActionsReducers/ChartRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps'
import { Helper } from '../../Utilities/Helpers/Helper';
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups'
import { SortOrder, AccessLevel } from '../../Utilities/Enums';
import { InputGroup, DropdownButton, MenuItem } from "react-bootstrap";
import { ButtonClear } from "../Components/Buttons/ButtonClear";
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants'
import { IChartDefinition } from "../../Utilities/Interface/IAdaptableBlotterObjects";
import { ButtonShowChart } from "../Components/Buttons/ButtonShowChart";
import { ChartVisibility } from "../../Utilities/ChartEnums";
import { ButtonDelete } from "../Components/Buttons/ButtonDelete";


interface ChartToolbarControlComponentProps extends ToolbarStrategyViewPopupProps<ChartToolbarControlComponent> {
    ChartDefinitions: IChartDefinition[]
    CurrentChartDefinition: IChartDefinition
    onSelectChartDefinition: (chartDefinition: string) => ChartRedux.ChartDefinitionSelectAction;
    onNewChartDefinition: () => PopupRedux.PopupShowScreenAction;
    onEditChartDefinition: () => PopupRedux.PopupShowScreenAction;
    onShowChart: () => SystemRedux.ChartSetChartVisibiityAction;
}

class ChartToolbarControlComponent extends React.Component<ChartToolbarControlComponentProps, {}> {


    render() {
        const selectChartString: string = "Select a Chart"
        let cssClassName: string = this.props.cssClassName + "__Chart";

        let currentChartDefinitionName = this.props.CurrentChartDefinition == null ?
            selectChartString : this.props.CurrentChartDefinition.Title

        let sortedChartDefinitions: IChartDefinition[] = Helper.sortArrayWithProperty(SortOrder.Ascending, this.props.ChartDefinitions, "Title")

        let availablechartDefinitions: any[] = sortedChartDefinitions.filter(s => s.Title != currentChartDefinitionName).map((chartDefinition, index) => {
            return <MenuItem key={index} eventKey={index} onClick={() => this.onSelectedChartDefinitionChanged(chartDefinition.Title)} >{chartDefinition.Title}</MenuItem>
        })
        let content = <span>

            <InputGroup>
                <DropdownButton disabled={availablechartDefinitions.length == 0} style={{ minWidth: "120px" }}
                    className={cssClassName} bsSize={"small"} bsStyle={"default"} title={currentChartDefinitionName} id="Chart" componentClass={InputGroup.Button}>
                    {availablechartDefinitions}
                </DropdownButton>
                {currentChartDefinitionName != selectChartString &&
                    <InputGroup.Button>
                        <ButtonClear
                            bsStyle={"default"}
                            cssClassName={cssClassName}
                            onClick={() => this.onSelectedChartDefinitionChanged("")}
                            size={"small"}
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
                    size={"small"}
                    overrideTooltip="Show Chart"
                    overrideDisableButton={currentChartDefinitionName == selectChartString}
                    DisplayMode="Glyph"
                    AccessLevel={this.props.AccessLevel}
                />
                <ButtonNew
                    style={{ marginLeft: "2px" }}
                    cssClassName={cssClassName} onClick={() => this.props.onNewChartDefinition()}
                    size={"small"}
                    overrideTooltip="Create New Chart Definition"
                    DisplayMode="Glyph"
                    AccessLevel={this.props.AccessLevel}
                />

                <ButtonEdit
                    style={{ marginLeft: "2px" }}
                    cssClassName={cssClassName} onClick={() => this.props.onEditChartDefinition()}
                    size={"small"}
                    overrideTooltip="Edit Chart Definition"
                    overrideDisableButton={currentChartDefinitionName == selectChartString}
                    DisplayMode="Glyph"
                    AccessLevel={this.props.AccessLevel}
                />

                <ButtonDelete
                    style={{ marginLeft: "2px" }}
                    cssClassName={cssClassName}
                    size={"small"}
                    overrideTooltip="Delete Chart"
                    overrideDisableButton={currentChartDefinitionName == selectChartString}
                    DisplayMode="Glyph"
                    ConfirmAction={ChartRedux.ChartDefinitionDelete(this.props.CurrentChartDefinition)}
                    ConfirmationMsg={"Are you sure you want to delete '" + !this.props.CurrentChartDefinition ? "" : currentChartDefinitionName + "'?"}
                    ConfirmationTitle={"Delete Chart"}
                    AccessLevel={this.props.AccessLevel}
                />
            </span>
        </span>


        return <PanelDashboard cssClassName={cssClassName} headerText={StrategyConstants.ChartStrategyName} glyphicon={StrategyConstants.ChartGlyph} onClose={() => this.props.onClose(StrategyConstants.ChartStrategyId)} onConfigure={() => this.props.onConfigure()}>
            {content}
        </PanelDashboard>
    }

    onSelectedChartDefinitionChanged(chartDefinitionName: string) {
        //   let chartDefinition = this.props.ChartDefinitions.find(cd => cd.Title == chartDefinitionName);
        this.props.onSelectChartDefinition(chartDefinitionName);
    }

    onShowChart() {
        this.props.onShowChart();
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        CurrentChartDefinition: state.Chart.ChartDefinitions.find(c => c.Title == state.Chart.CurrentChartDefinition),
        ChartDefinitions: state.Chart.ChartDefinitions,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSelectChartDefinition: (chartDefinition: string) => dispatch(ChartRedux.ChartDefinitionSelect(chartDefinition)),
        onNewChartDefinition: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ChartStrategyId, ScreenPopups.ChartPopup, "New")),
        onEditChartDefinition: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ChartStrategyId, ScreenPopups.ChartPopup, "Edit")),
        onShowChart: () => dispatch(SystemRedux.ChartSetChartVisibility(ChartVisibility.Maximised)),
        onClose: (dashboardControl: string) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ChartStrategyId, ScreenPopups.ChartPopup))
    };
}

export let ChartToolbarControl = connect(mapStateToProps, mapDispatchToProps)(ChartToolbarControlComponent);
