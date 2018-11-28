import * as React from "react";
import * as Redux from 'redux'
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as ChartRedux from '../../Redux/ActionsReducers/ChartRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps'
import { StringExtensions } from '../../Core/Extensions/StringExtensions'
import { Helper } from '../../Core/Helpers/Helper';
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Core/Constants/StrategyConstants'
import * as ScreenPopups from '../../Core/Constants/ScreenPopups'
import { SortOrder, AccessLevel } from '../../Core/Enums';
import { InputGroup, DropdownButton, MenuItem } from "react-bootstrap";
import { ButtonClear } from "../Components/Buttons/ButtonClear";
import * as GeneralConstants from '../../Core/Constants/GeneralConstants'
import { IChartDefinition } from "../../Api/Interface/IAdaptableBlotterObjects";
import { ButtonShowChart } from "../Components/Buttons/ButtonShowChart";
import { EntitlementHelper } from "../../Core/Helpers/EntitlementHelper";
import { IEntitlement } from "../../Core/Interface/Interfaces";


interface ChartToolbarControlComponentProps extends ToolbarStrategyViewPopupProps<ChartToolbarControlComponent> {
    ChartDefinitions: IChartDefinition[]
    CurrentChartName: string
     onSelectChartDefinition: (chartDefinitionName: string) => ChartRedux.ChartDefinitionSelectAction;
    onNewChartDefinition: () => PopupRedux.PopupShowScreenAction;
    onEditChartDefinition: () => PopupRedux.PopupShowScreenAction;
    onShowChart: () => PopupRedux.PopupShowChartAction;
}


interface ChartState {
    currentChartDefinition: IChartDefinition
    chartData: any
}

class ChartToolbarControlComponent extends React.Component<ChartToolbarControlComponentProps, ChartState> {


    render() {
        const selectSearchString: string = "Select a Chart"
        let cssClassName: string = this.props.cssClassName + "__Chart";
        let savedSearch: IChartDefinition = this.props.ChartDefinitions.find(s => s.Name == this.props.CurrentChartName);

        let currentSearchName = StringExtensions.IsNullOrEmpty(this.props.CurrentChartName) ?
            selectSearchString : this.props.CurrentChartName

        let sortedChartes: IChartDefinition[] = Helper.sortArrayWithProperty(SortOrder.Ascending, this.props.ChartDefinitions, "Name")

        let availablechartDefinitions: any[] = sortedChartes.filter(s => s.Name != this.props.CurrentChartName).map((chartDefinition, index) => {
            return <MenuItem key={index} eventKey={index} onClick={() => this.onSelectedChartDefinitionChanged(chartDefinition.Name)} >{chartDefinition.Name}</MenuItem>
        })
        let content = <span>

            <InputGroup>
                <DropdownButton disabled={availablechartDefinitions.length == 0} style={{ minWidth: "120px" }}
                    className={cssClassName} bsSize={"small"} bsStyle={"default"} title={currentSearchName} id="Chart" componentClass={InputGroup.Button}>
                    {availablechartDefinitions}
                </DropdownButton>
                {currentSearchName != selectSearchString &&
                    <InputGroup.Button>
                        <ButtonClear
                            bsStyle={"default"}
                            cssClassName={cssClassName}
                            onClick={() => this.onSelectedChartDefinitionChanged("")}
                            size={"small"}
                            overrideTooltip="Clear Chart"
                            overrideDisableButton={currentSearchName == selectSearchString}
                             DisplayMode="Glyph" 
                            AccessLevel={this.props.AccessLevel}
                            />
                    </InputGroup.Button>
                }
            </InputGroup>

            <span className={this.props.AccessLevel==AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : ""}>
                <ButtonShowChart
                    style={{ marginLeft: "2px" }}
                    cssClassName={cssClassName} onClick={() => this.onShowChart()}
                    size={"small"}
                    overrideTooltip="Show Chart"
                    overrideDisableButton={currentSearchName == selectSearchString}
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
                    overrideDisableButton={currentSearchName == selectSearchString}
                    DisplayMode="Glyph" 
                    AccessLevel={this.props.AccessLevel}
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

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        CurrentChartName: state.Chart.CurrentChartName,
        ChartDefinitions: state.Chart.ChartDefinitions,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSelectChartDefinition: (ChartName: string) => dispatch(ChartRedux.ChartDefinitionSelect(ChartName)),
         onNewChartDefinition: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ChartStrategyId,ScreenPopups.ChartPopup,  "New")),
        onEditChartDefinition: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ChartStrategyId,ScreenPopups.ChartPopup,  "Edit")),
        onShowChart: () => dispatch(PopupRedux.PopupShowChart()),
        onClose: (dashboardControl: string) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ChartStrategyId,ScreenPopups.ChartPopup))
    };
}

export let ChartToolbarControl = connect(mapStateToProps, mapDispatchToProps)(ChartToolbarControlComponent);
