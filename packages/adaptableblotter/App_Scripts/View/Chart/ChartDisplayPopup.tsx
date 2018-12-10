import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { ChartDisplayPopupPropsBase } from '../Components/SharedProps/ChartDisplayPopupPropsBase'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { IChartDefinition } from "../../Api/Interface/IAdaptableBlotterObjects";
import { ButtonClose } from "../Components/Buttons/ButtonClose";
import { PRIMARY_BSSTYLE } from "../../Utilities/Constants/StyleConstants";
import { StringExtensions } from "../../Utilities/Extensions/StringExtensions";
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from "react-bootstrap";
import { EnumExtensions } from "../../Utilities/Extensions/EnumExtensions";
import { ChartType, ChartCrosshairsMode } from "../../Utilities/Enums";
import { PanelWithImageTwoButtons } from "../Components/Panels/PanelWithIImageTwoButtons";
import { ButtonMinimise } from "../Components/Buttons/ButtonMinimise";
import { ButtonMaximise } from "../Components/Buttons/ButtonMaximise";
// ig chart imports
import { IgrCategoryChart } from 'igniteui-react-charts/ES5/igr-category-chart';
import { IgrCategoryChartModule } from 'igniteui-react-charts/ES5/igr-category-chart-module';
//import { IgrDataChartAnnotationModule } from 'igniteui-react-charts/ES5/igr-data-chart-annotation-module';
//import { EasingFunctions } from 'igniteui-react-core/ES5/EasingFunctions';

interface ChartDisplayPopupProps extends ChartDisplayPopupPropsBase<ChartDisplayPopupComponent> {
    ChartDefinitions: IChartDefinition[]
    CurrentChart: string
    ChartData: any
}

export interface ChartDisplayPopupWizardState {
    ChartType: ChartType,
    ChartCrosshairsMode: ChartCrosshairsMode,
    CurrentChartDefinition: IChartDefinition,
    IsMinimised: boolean

}

class ChartDisplayPopupComponent extends React.Component<ChartDisplayPopupProps, ChartDisplayPopupWizardState> {

    constructor(props: ChartDisplayPopupProps) {
        super(props);
        let currentChartDefinition: IChartDefinition = this.props.ChartDefinitions.find(cd => cd.Title == this.props.CurrentChart);

        this.state = {
            CurrentChartDefinition: currentChartDefinition,
            ChartType: ChartType.Column,
            IsMinimised: false,
            ChartCrosshairsMode: ChartCrosshairsMode.Default
        }
        IgrCategoryChartModule.register();
      //  IgrDataChartAnnotationModule.register();
    }

    render() {

        let cssClassName: string = this.props.cssClassName + "__Charts";

        let closeButton = (this.props.showModal) ?
            null :
            <ButtonClose
                cssClassName={cssClassName}
                onClick={() => this.props.onClose()}
                bsStyle={PRIMARY_BSSTYLE}
                size={"small"}
                DisplayMode="Glyph"
                hideToolTip={true}
            />

        let minmaxButton = (this.props.showModal) ?
            null :
            this.state.IsMinimised ?
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

        let chartData = (this.state.IsMinimised == false && this.props.ChartData != null && StringExtensions.IsNotEmpty(this.props.CurrentChart)) ?
            <IgrCategoryChart
               // size
            width="900px"
                height="500px"
                // titles
                chartTitle={this.props.CurrentChart}

                yAxisMinimumValue={0}
                chartType={this.state.ChartType}
               
                yAxisTitle={this.state.CurrentChartDefinition.YAxisColumnId}
                xAxisTitle={this.state.CurrentChartDefinition.XAxisColumnId}
                
                dataSource={this.props.ChartData} 
                crosshairsDisplayMode={this.state.ChartCrosshairsMode}
                crosshairsSnapToData={true}
                crosshairsAnnotationEnabled={true}
                isTransitionInEnabled={true}
              //  transitionInEasingFunction={EasingFunctions.cubicEase}
                transitionInDuration={1000}
                finalValueAnnotationsVisible={true}

               // calloutsVisible={true}
               // calloutsXMemberPath="index"
               // calloutsYMemberPath="yValue"
               // calloutsLabelMemberPath="content"
               // calloutsContentMemberPath="yValue"
                />
            :
            null;

        let optionChartTypes = EnumExtensions.getNames(ChartType).map((enumName) => {
            return <option key={enumName} value={enumName}>{enumName as ChartType}</option>
        })

        let optionCrossHairModeTypes = EnumExtensions.getNames(ChartCrosshairsMode).map((enumName) => {
            return <option key={enumName} value={enumName}>{enumName as ChartCrosshairsMode}</option>
        })

        return <div className={cssClassName}>
            <PanelWithImageTwoButtons
                cssClassName={cssClassName}
                header={StrategyConstants.ChartStrategyName}
                style={{ width: '1500px' }}
                bsStyle="primary"
                glyphicon={StrategyConstants.ChartGlyph}
                secondButton={minmaxButton}
                firstButton={closeButton}
            >
                {this.state.IsMinimised == false &&
                    <Row>
                        <Col xs={9}>
                            {this.props.ChartData != null &&
                                chartData
                            }
                        </Col>
                        <Col xs={3}>
                            <Row>
                                <Col xs={10}>
                                    <h4>Chart Settings</h4>
                                </Col>
                            </Row>
                            <FormGroup controlId="formChartType">

                                <Row>
                                    <Col xs={3}>
                                        <ControlLabel>Type:</ControlLabel>
                                    </Col>
                                    <Col xs={6}>
                                        <FormControl componentClass="select" placeholder="select" value={this.state.ChartType} onChange={(x) => this.onChartTypeChange(x)} >
                                            {optionChartTypes}
                                        </FormControl>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup controlId="formCrosshairs">

                                <Row>
                                    <Col xs={3}>
                                        <ControlLabel>CrossHairs:</ControlLabel>
                                    </Col>
                                    <Col xs={6}>
                                        <FormControl componentClass="select" placeholder="select" value={this.state.ChartCrosshairsMode} onChange={(x) => this.onCrosshairsModeChange(x)} >
                                            {optionCrossHairModeTypes}
                                        </FormControl>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col xs={3}>
                                        <ControlLabel>Value:</ControlLabel>
                                    </Col>
                                    <Col xs={6}>
                                        <FormControl
                                            type="number"
                                            placeholder="Enter Number"

                                        />
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Col>

                    </Row>
                }
            </PanelWithImageTwoButtons>



        </div>
    }

    onChartMinimised() {
        this.setState({ IsMinimised: true, } as ChartDisplayPopupWizardState)
    }

    onChartMaximised() {
        this.setState({ IsMinimised: false, } as ChartDisplayPopupWizardState)
    }

    onChartTypeChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ ChartType: e.value, } as ChartDisplayPopupWizardState)
    }

    onCrosshairsModeChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ ChartCrosshairsMode: e.value, } as ChartDisplayPopupWizardState)
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        ChartDefinitions: state.Chart.ChartDefinitions,
        CurrentChart: state.Chart.CurrentChart,
        ChartService: ownProps.ChartService,
        ChartData: state.ChartInternal.ChartData
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {

    };
}

export let ChartDisplayPopup = connect(mapStateToProps, mapDispatchToProps)(ChartDisplayPopupComponent);
