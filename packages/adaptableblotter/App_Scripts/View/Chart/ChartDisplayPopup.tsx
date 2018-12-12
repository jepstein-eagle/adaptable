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
import { Row, Col, FormGroup, ControlLabel, FormControl, Button, Checkbox, Panel } from "react-bootstrap";
import { EnumExtensions } from "../../Utilities/Extensions/EnumExtensions";
import { ChartType, ChartCrosshairsMode, ChartSize } from "../../Utilities/Enums";
import { PanelWithImageTwoButtons } from "../Components/Panels/PanelWithIImageTwoButtons";
import { ButtonMinimise } from "../Components/Buttons/ButtonMinimise";
import { ButtonMaximise } from "../Components/Buttons/ButtonMaximise";
// ig chart imports
//import { IgrCategoryChart } from 'igniteui-react-charts/ES2015/igr-category-chart';
//import { IgrCategoryChartModule } from 'igniteui-react-charts/ES2015/igr-category-chart-module';
//import { IgrDataChartAnnotationModule } from 'igniteui-react-charts/ES2015/igr-data-chart-annotation-module';
//import { EasingFunctions } from 'igniteui-react-core/ES2015/EasingFunctions';


interface ChartDisplayPopupProps extends ChartDisplayPopupPropsBase<ChartDisplayPopupComponent> {
    ChartDefinitions: IChartDefinition[]
    CurrentChartDefinition: IChartDefinition
    ChartData: any
}

export interface ChartDisplayPopupWizardState {
    ChartType: ChartType,
    ChartCrosshairsMode: ChartCrosshairsMode,
    ChartSize: ChartSize,
    SpanCrossHairsToData: boolean,
    EnableCrosshairsAnnotations: boolean,
    EnableFinalValueAnnotations: boolean,
    IsMinimised: boolean

}

class ChartDisplayPopupComponent extends React.Component<ChartDisplayPopupProps, ChartDisplayPopupWizardState> {

    constructor(props: ChartDisplayPopupProps) {
        super(props);
       
        this.state = {
            ChartType: ChartType.Column,
            ChartSize: ChartSize.Medium,
            SpanCrossHairsToData: false,
            EnableCrosshairsAnnotations: false,
            EnableFinalValueAnnotations: false,
            IsMinimised: false,
            ChartCrosshairsMode: ChartCrosshairsMode.None
        }
    //    IgrCategoryChartModule.register();
    //    IgrDataChartAnnotationModule.register();
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

        let chartWidth: string = this.setChartWidth();
        let chartHeight: string = this.setChartHeight();
        let panelWidth: string = this.setPanelWidth();
        let chartColumnSize: number = this.setChartColumnSize();
        let legendColumnSize: number = this.setLegendColumnSize();

        let chartData =null;// (this.state.IsMinimised == false && this.props.ChartData != null && this.props.CurrentChartDefinition != null) ?
      //  null
        /*  
        <IgrCategoryChart
                // datasource
                dataSource={this.props.ChartData}
                // chart type
                chartType={this.state.ChartType}
                // size
                width={chartWidth}
                height={chartHeight}
                // titles
                chartTitle={this.props.CurrentChartDefinition.Title}
                subtitle={this.props.CurrentChartDefinition.SubTitle}
                // yAxis
                // yAxisMinimumValue={0}  // need this?
                yAxisTitle={this.props.CurrentChartDefinition.YAxisColumnId}
                // xAxis
                xAxisTitle={this.props.CurrentChartDefinition.XAxisColumnId}
                // crosshairs
                crosshairsDisplayMode={this.state.ChartCrosshairsMode}
                crosshairsSnapToData={this.state.SpanCrossHairsToData}
                crosshairsAnnotationEnabled={this.state.EnableCrosshairsAnnotations}
                // transitions
                isTransitionInEnabled={true}
               // transitionInEasingFunction={EasingFunctions.cubicEase}
                transitionInDuration={1000}
                finalValueAnnotationsVisible={this.state.EnableFinalValueAnnotations}

            // callouts - not doing yet as not sure how we can with dynamic data...
            // calloutsVisible={true}
            // calloutsXMemberPath="index"
            // calloutsYMemberPath="yValue"
            // calloutsLabelMemberPath="content"
            // calloutsContentMemberPath="yValue"


            // properties used in ig example
            //    xAxisFormatLabel={this.formatDateLabel}

            />
            */
         //   :
         //   null;

        let optionChartTypes = EnumExtensions.getNames(ChartType).map((enumName) => {
            return <option key={enumName} value={enumName}>{enumName as ChartType}</option>
        })

        let optionCrossHairModeTypes = EnumExtensions.getNames(ChartCrosshairsMode).map((enumName) => {
            return <option key={enumName} value={enumName}>{enumName as ChartCrosshairsMode}</option>
        })

        let optionChartSizes = EnumExtensions.getNames(ChartSize).map((enumName) => {
            return <option key={enumName} value={enumName}>{enumName as ChartSize}</option>
        })

        return <div className={cssClassName}>
            <PanelWithImageTwoButtons
                cssClassName={cssClassName}
                header={StrategyConstants.ChartStrategyName}
                style={{ width: panelWidth }}
                bsStyle={PRIMARY_BSSTYLE}
                glyphicon={StrategyConstants.ChartGlyph}
                secondButton={minmaxButton}
                firstButton={closeButton}
            >
                {this.state.IsMinimised == false &&
                    <Row>
                        <Col xs={chartColumnSize}>
                            {this.props.ChartData != null &&
                                chartData
                            }
                        </Col>
                        <Col xs={legendColumnSize}>
                            <Panel>
                                <Row>
                                    <Col xs={10}>
                                        <h4>Chart Settings</h4>
                                    </Col>
                                </Row>
                                <FormGroup controlId="formChartType">

                                    <Row>
                                        <Col xs={4}>
                                            <ControlLabel>Type</ControlLabel>
                                        </Col>
                                        <Col xs={8}>
                                            <FormControl componentClass="select" placeholder="select" value={this.state.ChartType} onChange={(x) => this.onChartTypeChange(x)} >
                                                {optionChartTypes}
                                            </FormControl>
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup controlId="formSize">
                                    <Row>
                                        <Col xs={4}>
                                            <ControlLabel>Size</ControlLabel>
                                        </Col>
                                        <Col xs={8}>
                                            <FormControl bsSize={"small"} componentClass="select" placeholder="select" value={this.state.ChartSize} onChange={(x) => this.onChartSizeChange(x)} >
                                                {optionChartSizes}
                                            </FormControl>
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup controlId="formFinalValueAnnotations">
                                    <Row>
                                        <Col xs={4}>
                                        </Col>
                                        <Col xs={8}>
                                            <Checkbox inline onChange={(e) => this.onEnableFinalValueAnnotationsOptionChanged(e)} checked={this.state.EnableFinalValueAnnotations} >Show Annotations</Checkbox>
                                        </Col>
                                    </Row>
                                </FormGroup>
                                {this.state.ChartSize != ChartSize.XSmall &&
                                    <FormGroup controlId="formCrosshairs">

                                        <Row>
                                            <Col xs={4}>
                                                <ControlLabel>Crosshairs</ControlLabel>
                                            </Col>
                                            <Col xs={8}>
                                                <FormControl componentClass="select" placeholder="select" value={this.state.ChartCrosshairsMode} onChange={(x) => this.onCrosshairsModeChange(x)} >
                                                    {optionCrossHairModeTypes}
                                                </FormControl>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={4}>
                                            </Col>
                                            <Col xs={7}>
                                                <Checkbox disabled={this.state.ChartCrosshairsMode == ChartCrosshairsMode.None} onChange={(e) => this.onSpanCrossHairsToDataOptionChanged(e)} checked={this.state.SpanCrossHairsToData} >Snap to Data</Checkbox>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={4}>
                                            </Col>
                                            <Col xs={7}>
                                                <Checkbox inline disabled={this.state.ChartCrosshairsMode == ChartCrosshairsMode.None} onChange={(e) => this.onEnableCrosshairsAnnotationsOptionChanged(e)} checked={this.state.EnableCrosshairsAnnotations} >Crosshair Legend</Checkbox>
                                            </Col>
                                        </Row>

                                    </FormGroup>
                                }
                            </Panel>
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

    onChartSizeChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ ChartSize: e.value, } as ChartDisplayPopupWizardState)
    }

    onCrosshairsModeChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ ChartCrosshairsMode: e.value, } as ChartDisplayPopupWizardState)
    }

    private onSpanCrossHairsToDataOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ SpanCrossHairsToData: e.checked } as ChartDisplayPopupWizardState)
    }

    private onEnableCrosshairsAnnotationsOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ EnableCrosshairsAnnotations: e.checked } as ChartDisplayPopupWizardState)
    }

    private onEnableFinalValueAnnotationsOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ EnableFinalValueAnnotations: e.checked } as ChartDisplayPopupWizardState)
    }

    setChartHeight(): string {
        switch (this.state.ChartSize) {
            case ChartSize.XSmall:
                return '350px';
            case ChartSize.Small:
                return '450px';
            case ChartSize.Medium:
                return '600px';
            case ChartSize.Large:
                return '750px';
            case ChartSize.XLarge:
                return '850px';
        }
    }

    setChartWidth(): string {
        switch (this.state.ChartSize) {
            case ChartSize.XSmall:
                return '350px';
            case ChartSize.Small:
                return '600px';
            case ChartSize.Medium:
                return '800px';
            case ChartSize.Large:
                return '1000px';
            case ChartSize.XLarge:
                return '1100px';
        }
    }

    setPanelWidth(): string {
        switch (this.state.ChartSize) {
            case ChartSize.XSmall:
                return '600px';
            case ChartSize.Small:
                return '900px';
            case ChartSize.Medium:
                return '1200px';
            case ChartSize.Large:
                return '1350px';
            case ChartSize.XLarge:
                return '1500px';
        }
    }

    setChartColumnSize(): number {
        switch (this.state.ChartSize) {
            case ChartSize.XSmall:
                return 7;
            case ChartSize.Small:
            case ChartSize.Medium:
                return 8;
            case ChartSize.Large:
            case ChartSize.XLarge:
                return 9;
        }
    }

    setLegendColumnSize(): number {
        switch (this.state.ChartSize) {
            case ChartSize.XSmall:
                return 5;
            case ChartSize.Small:
            case ChartSize.Medium:
                return 4;
            case ChartSize.Large:
            case ChartSize.XLarge:
                return 3;
        }
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        ChartDefinitions: state.Chart.ChartDefinitions,
        CurrentChartDefinition: state.ChartInternal.CurrentChartDefinition,
        ChartService: ownProps.ChartService,
        ChartData: state.ChartInternal.ChartData
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {

    };
}

export let ChartDisplayPopup = connect(mapStateToProps, mapDispatchToProps)(ChartDisplayPopupComponent);
