import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { ChartDisplayPopupPropsBase } from '../Components/SharedProps/ChartDisplayPopupPropsBase'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { IChartDefinition, IChartProperties } from "../../Api/Interface/IAdaptableBlotterObjects";
import { ButtonClose } from "../Components/Buttons/ButtonClose";
import { PRIMARY_BSSTYLE, DEFAULT_BSSTYLE, INFO_BSSTYLE } from "../../Utilities/Constants/StyleConstants";
import { StringExtensions } from "../../Utilities/Extensions/StringExtensions";
import { Row, Col, ControlLabel, FormControl, Checkbox, Radio } from "react-bootstrap";
import { EnumExtensions } from "../../Utilities/Extensions/EnumExtensions";
import { ButtonMinimise } from "../Components/Buttons/ButtonMinimise";
import { ButtonMaximise } from "../Components/Buttons/ButtonMaximise";
import * as ChartRedux from '../../Redux/ActionsReducers/ChartRedux'
// ig chart imports
import { IgrCategoryChart } from 'igniteui-react-charts/ES2015/igr-category-chart';
//import { IgrCategoryChartModule } from 'igniteui-react-charts/ES2015/igr-category-chart-module';
//import { IgrDataChartAnnotationModule } from 'igniteui-react-charts/ES2015/igr-data-chart-annotation-module';
import { ChartWizard } from "./Wizard/ChartWizard";
import { Helper } from "../../Utilities/Helpers/Helper";
import { ButtonEdit } from "../Components/Buttons/ButtonEdit";
import { ColumnHelper } from "../../Utilities/Helpers/ColumnHelper";
import { PanelWithImageThreeButtons } from "../Components/Panels/PanelWithIImageThreeButtons";
import { ChartSize, ChartType, ChartCrosshairsMode, AxisLabelsLocation, HorizontalAlignment, LabelVisibility } from "../../Utilities/ChartEnums";
import { PanelWithButton } from "../Components/Panels/PanelWithButton";
import { ColorPicker } from "../ColorPicker";
import { AdaptableBlotterForm } from "../Components/Forms/AdaptableBlotterForm";
import { ButtonGeneral } from "../Components/Buttons/ButtonGeneral";
import { DefaultChartProperties } from "../../api/DefaultChartProperties";


interface ChartDisplayPopupProps extends ChartDisplayPopupPropsBase<ChartDisplayPopupComponent> {
    ChartDefinitions: IChartDefinition[]
    CurrentChartDefinition: IChartDefinition
    ChartData: any
    onAddUpdateChartDefinition: (index: number, chartDefinition: IChartDefinition) => ChartRedux.ChartDefinitionAddUpdateAction,
    onUpdateChartProperties: (chartTitle: string, chartProperties: IChartProperties) => ChartRedux.ChartPropertiesUpdateAction,
    onSelectChartDefinition: (chartDefinition: IChartDefinition) => ChartRedux.ChartDefinitionSelectAction,
}



class ChartDisplayPopupComponent extends React.Component<ChartDisplayPopupProps, {}> {




    render() {

        return "chart here"
    }



}

function mapStateToProps(state: AdaptableBlotterState) {
    return {
        ChartDefinitions: state.Chart.ChartDefinitions,
        CurrentChartDefinition: state.Chart.CurrentChartDefinition,
        ChartData: state.System.ChartData,

    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddUpdateChartDefinition: (index: number, chartDefinition: IChartDefinition) => dispatch(ChartRedux.ChartDefinitionAddUpdate(index, chartDefinition)),
        onUpdateChartProperties: (chartTitle: string, chartProperties: IChartProperties) => dispatch(ChartRedux.ChartPropertiesUpdate(chartTitle, chartProperties)),
        onSelectChartDefinition: (chartDefinition: IChartDefinition) => dispatch(ChartRedux.ChartDefinitionSelect(chartDefinition)),
    };
}

export let ChartDisplayPopup = connect(mapStateToProps, mapDispatchToProps)(ChartDisplayPopupComponent);