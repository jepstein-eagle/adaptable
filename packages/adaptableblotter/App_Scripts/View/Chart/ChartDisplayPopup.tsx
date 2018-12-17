import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { ChartDisplayPopupPropsBase } from '../Components/SharedProps/ChartDisplayPopupPropsBase'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { IChartDefinition, IUserFilter } from "../../Api/Interface/IAdaptableBlotterObjects";
import { ButtonClose } from "../Components/Buttons/ButtonClose";
import { PRIMARY_BSSTYLE } from "../../Utilities/Constants/StyleConstants";
import { StringExtensions } from "../../Utilities/Extensions/StringExtensions";
import { Row, Col, FormGroup, ControlLabel, FormControl, Button, Checkbox, Panel } from "react-bootstrap";
import { EnumExtensions } from "../../Utilities/Extensions/EnumExtensions";
import { ChartType, ChartCrosshairsMode, ChartSize } from "../../Utilities/Enums";
import { PanelWithImageTwoButtons } from "../Components/Panels/PanelWithIImageTwoButtons";
import { ButtonMinimise } from "../Components/Buttons/ButtonMinimise";
import { ButtonMaximise } from "../Components/Buttons/ButtonMaximise";
import * as ChartRedux from '../../Redux/ActionsReducers/ChartRedux'
import * as ChartInternalRedux from '../../Redux/ActionsReducers/ChartInternalRedux'
// ig chart imports
import { IgrCategoryChart } from 'igniteui-react-charts/ES2015/igr-category-chart';
import { IgrCategoryChartModule } from 'igniteui-react-charts/ES2015/igr-category-chart-module';
import { IgrDataChartAnnotationModule } from 'igniteui-react-charts/ES2015/igr-data-chart-annotation-module';
import { EasingFunctions } from 'igniteui-react-core/ES2015/EasingFunctions';
import { ChartWizard } from "./Wizard/ChartWizard";
import { IColumn } from "../../Api/Interface/IColumn";
import { Helper } from "../../Utilities/Helpers/Helper";
import { ButtonEdit } from "../Components/Buttons/ButtonEdit";
import { ColumnHelper } from "../../Utilities/Helpers/ColumnHelper";
import { PanelWithImageThreeButtons } from "../Components/Panels/PanelWithIImageThreeButtons";


interface ChartDisplayPopupProps extends ChartDisplayPopupPropsBase<ChartDisplayPopupComponent> {
    ChartDefinitions: IChartDefinition[]
    CurrentChartDefinition: IChartDefinition
    ChartData: any
    onAddUpdateChartDefinition: (index: number, chartDefinition: IChartDefinition) => ChartRedux.ChartDefinitionAddUpdateAction,
    onSelectChartDefinition: (chartDefinition: IChartDefinition) => ChartInternalRedux.ChartDefinitionSelectAction,

}

export interface ChartDisplayPopupWizardState {
    ChartType: ChartType;
    ChartCrosshairsMode: ChartCrosshairsMode;
    ChartSize: ChartSize;
    SpanCrossHairsToData: boolean;
    EnableCrosshairsAnnotations: boolean;
    EnableFinalValueAnnotations: boolean;
    SetYAxisMinimumValue: boolean;
    YAxisMinimumValue?: number;
    IsMinimised: boolean;
    EditedChartDefinition: IChartDefinition;
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
            SetYAxisMinimumValue: false,
            YAxisMinimumValue: undefined,
            IsMinimised: false,
            ChartCrosshairsMode: ChartCrosshairsMode.None,
            EditedChartDefinition: null

        }
        IgrCategoryChartModule.register();
        IgrDataChartAnnotationModule.register();
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

        let editButton = (this.state.IsMinimised) ?
            null :
            <ButtonEdit
                cssClassName={cssClassName}
                style={{ marginRight: "5px" }}
                onClick={() => this.onEdit()}
                bsStyle={PRIMARY_BSSTYLE}
                size={"small"}
                DisplayMode="Glyph+Text"
                overrideText="Edit Chart"
                hideToolTip={true}
            />
            ;

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

        let chartData = (this.state.IsMinimised == false && this.props.ChartData != null && this.props.CurrentChartDefinition != null) ?

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
                yAxisMinimumValue={this.state.YAxisMinimumValue}
                yAxisTitle={this.props.CurrentChartDefinition.YAxisColumnIds.map(c => {
                    return ColumnHelper.getFriendlyNameFromColumnId(c, this.props.Columns)
                }).join(', ')}
                // xAxis
                xAxisTitle={ColumnHelper.getFriendlyNameFromColumnId(this.props.CurrentChartDefinition.XAxisColumnId, this.props.Columns)}
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
            :
            null;

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
            <PanelWithImageThreeButtons
                cssClassName={cssClassName}
                header={StrategyConstants.ChartStrategyName}
                style={{ width: panelWidth }}
                bsStyle={PRIMARY_BSSTYLE}
                glyphicon={StrategyConstants.ChartGlyph}
                secondButton={closeButton}
                firstButton={editButton}
                thirdButton={minmaxButton}
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
                                            <FormControl componentClass="select" placeholder="select" value={this.state.ChartSize} onChange={(x) => this.onChartSizeChange(x)} >
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
                                    <div>
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
                                                    <Checkbox inline disabled={this.state.ChartCrosshairsMode == ChartCrosshairsMode.None} onChange={(e) => this.onEnableCrosshairsAnnotationsOptionChanged(e)} checked={this.state.EnableCrosshairsAnnotations} >Show Legend</Checkbox>
                                                </Col>
                                            </Row>

                                        </FormGroup>
                                        <FormGroup controlId="formYAxisMinValue">
                                            <Row>
                                                <Col xs={4}>
                                                    <ControlLabel>Y Axis</ControlLabel>
                                                </Col>
                                                <Col xs={7}>
                                                    <Checkbox onChange={(e) => this.onSetYAxisMinValueOptionChanged(e)} checked={this.state.SetYAxisMinimumValue} >Set Min Value</Checkbox>
                                                </Col>
                                            </Row>
                                            {this.state.SetYAxisMinimumValue &&
                                                <Row>
                                                    <Col xs={4} />
                                                    <Col xs={8}>
                                                        <FormControl
                                                            type="number"
                                                            placeholder="Enter Number"
                                                            onChange={this.onYAxisMinValueChanged}
                                                            value={this.state.YAxisMinimumValue}
                                                        />
                                                    </Col>
                                                </Row>
                                            }
                                        </FormGroup>
                                    </div>
                                }
                            </Panel>
                        </Col>

                    </Row>
                }
            </PanelWithImageThreeButtons>

            {this.state.EditedChartDefinition &&
                <ChartWizard
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

        </div>
    }

    onEdit(): void {
        this.setState({ EditedChartDefinition: Helper.cloneObject(this.props.CurrentChartDefinition) });
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

    private onSetYAxisMinValueOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (e.checked) {
            this.setState({ SetYAxisMinimumValue: true } as ChartDisplayPopupWizardState)
        } else { // set YAxisMinValue to undefined
            this.setState({ SetYAxisMinimumValue: e.checked, YAxisMinimumValue: undefined } as ChartDisplayPopupWizardState)
        }

    }

    private onYAxisMinValueChanged = (e: any) => {
        this.setState({ YAxisMinimumValue: Number(e.target.value) } as ChartDisplayPopupWizardState)
    }

    onCloseWizard() {
        this.setState({ EditedChartDefinition: null });
    }

    onFinishWizard() {
        let clonedObject: IChartDefinition = Helper.cloneObject(this.state.EditedChartDefinition);
        let index: number = this.props.ChartDefinitions.findIndex(cd => cd.Title == this.state.EditedChartDefinition.Title);
        this.props.onAddUpdateChartDefinition(index, clonedObject);
        this.setState({ EditedChartDefinition: null });
        this.props.onSelectChartDefinition(clonedObject);
    }

    canFinishWizard() {
        return StringExtensions.IsNotNullOrEmpty(this.state.EditedChartDefinition.Title);
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
        ChartData: state.ChartInternal.ChartData,

    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddUpdateChartDefinition: (index: number, chartDefinition: IChartDefinition) => dispatch(ChartRedux.ChartDefinitionAddUpdate(index, chartDefinition)),
        onSelectChartDefinition: (chartDefinition: IChartDefinition) => dispatch(ChartInternalRedux.ChartDefinitionSelect(chartDefinition)),

    };
}

export let ChartDisplayPopup = connect(mapStateToProps, mapDispatchToProps)(ChartDisplayPopupComponent);
