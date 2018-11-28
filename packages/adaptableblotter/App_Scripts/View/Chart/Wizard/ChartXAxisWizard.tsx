import * as React from "react";
import { ControlLabel, FormGroup, Col, Panel, Checkbox, Row, Well, Radio } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { IChartDefinition } from "../../../Api/Interface/IAdaptableBlotterObjects";
import { ColumnSelector } from "../../Components/Selectors/ColumnSelector";
import { SelectionMode, MessageType, DistinctCriteriaPairValue } from "../../../Core/Enums";
import { IColumn } from "../../../Core/Interface/IColumn";
import { AdaptablePopover } from "../../AdaptablePopover";
import * as GeneralConstants from '../../../Core/Constants/GeneralConstants';
import { ArrayExtensions } from "../../../Utilities/Extensions/ArrayExtensions";
import { SingleListBox } from "../../Components/ListBox/SingleListBox";
import { IRawValueDisplayValuePair } from "../../UIInterfaces";
import { IAdaptableBlotter } from "../../../Core/Interface/IAdaptableBlotter";

export interface ChartXAxisWizardProps extends AdaptableWizardStepProps<IChartDefinition> {
    ChartDefinitions: IChartDefinition[]
    Columns: IColumn[]
    Blotter: IAdaptableBlotter
}

export interface ChartXAxisWizardState {
    XAxisColumn: string,
    XAxisColumnValues: string[],
    UseAllXAsisColumnValues: boolean,
    AvailableXAxisColumnValues: IRawValueDisplayValuePair[]
}

export class ChartXAxisWizard extends React.Component<ChartXAxisWizardProps, ChartXAxisWizardState> implements AdaptableWizardStep {
    constructor(props: ChartXAxisWizardProps) {
        super(props)
        let hasDistinctColumnValues: boolean = props.Data.XAxisColumnValues.length > 0 && props.Data.XAxisColumnValues[0] != GeneralConstants.ALL_COLUMN_VALUES
        this.state = {

            XAxisColumn: props.Data.XAxisColumnId,
            XAxisColumnValues: props.Data.XAxisColumnValues,
            UseAllXAsisColumnValues: (hasDistinctColumnValues) ? false : true,
            AvailableXAxisColumnValues: (StringExtensions.IsNotNullOrEmpty(this.props.Data.XAxisColumnId)) ?
                props.Blotter.getColumnValueDisplayValuePairDistinctList(props.Data.XAxisColumnId, DistinctCriteriaPairValue.DisplayValue) :
                null
        }
    }

    render(): any {
        let cssClassName: string = this.props.cssClassName + "-settings"

        return <div className={cssClassName}>
            <Panel header="Chart Colum X Axis" bsStyle="primary">
                <AdaptableBlotterForm horizontal>

                    <FormGroup controlId="xAxisColumn">
                        <Row>
                            <Col xs={1} />
                            <Col xs={10}>
                                <Well>Select a numeric column for the X Axis.</Well>
                            </Col>
                            <Col xs={1} />
                        </Row>
                        <Row>
                            <Col xs={4} componentClass={ControlLabel}>X Axis Column: </Col>
                            <Col xs={6}>
                                <ColumnSelector cssClassName={cssClassName} SelectedColumnIds={[this.state.XAxisColumn]}
                                    ColumnList={this.props.Columns}
                                    onColumnChange={columns => this.onXAxisColumnChanged(columns)}
                                    SelectionMode={SelectionMode.Single} />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} componentClass={ControlLabel}>X Axis Column Values:</Col>
                            <Col xs={6} >
                                <Radio inline value="All" checked={this.state.UseAllXAsisColumnValues == true} onChange={(e) => this.onUseAllColumnValuesChanged(e)}>All</Radio>
                                <Radio inline value="Bespoke" checked={this.state.UseAllXAsisColumnValues == false} onChange={(e) => this.onUseAllColumnValuesChanged(e)}>Bespoke</Radio>
                            </Col>
                        </Row>

                    </FormGroup>

                </AdaptableBlotterForm>

                {StringExtensions.IsNotNullOrEmpty(this.state.XAxisColumn) && this.state.UseAllXAsisColumnValues == false &&
                    <Row>
                        <Col xs={3}></Col>
                        <Col xs={6}>
                            <Panel className="ab_no-padding-anywhere-panel" style={divStyle}>
                                <SingleListBox
                                    Values={this.state.AvailableXAxisColumnValues}
                                    cssClassName={cssClassName}
                                    UiSelectedValues={this.state.XAxisColumnValues}
                                    DisplayMember={DistinctCriteriaPairValue[DistinctCriteriaPairValue.DisplayValue]}
                                    ValueMember={DistinctCriteriaPairValue[DistinctCriteriaPairValue.DisplayValue]}
                                    SortMember={DistinctCriteriaPairValue[DistinctCriteriaPairValue.RawValue]}
                                    onSelectedChange={(list) => this.onColumnValuesChange(list)}
                                    SelectionMode={SelectionMode.Multi}>
                                </SingleListBox>
                            </Panel>
                        </Col>
                        <Col xs={3}></Col>
                    </Row>
                }

            </Panel>

        </div>
    }

    private onUseAllColumnValuesChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let showAll: boolean = e.value == "All"
        let colValues: string[] = (showAll) ? [GeneralConstants.ALL_COLUMN_VALUES] : []
        this.setState({ UseAllXAsisColumnValues: showAll, XAxisColumnValues: colValues } as ChartXAxisWizardState, () => this.props.UpdateGoBackState())
    }

    private onXAxisColumnChanged(columns: IColumn[]) {
        let isColumn: boolean = ArrayExtensions.IsNotNullOrEmpty(columns)
        this.setState({
            XAxisColumn: isColumn ? columns[0].ColumnId : "",
            UseAllXAsisColumnValues: true,
            XAxisColumnValues: [GeneralConstants.ALL_COLUMN_VALUES],
            AvailableXAxisColumnValues: isColumn ?
                this.props.Blotter.getColumnValueDisplayValuePairDistinctList(columns[0].ColumnId, DistinctCriteriaPairValue.DisplayValue) :
                null
        } as ChartXAxisWizardState, () => this.props.UpdateGoBackState())
    }

    private onColumnValuesChange(list: any[]): any {
        this.setState({ XAxisColumnValues: list } as ChartXAxisWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean {
        return (StringExtensions.IsNotNullOrEmpty(this.state.XAxisColumn) && ArrayExtensions.IsNotNullOrEmpty(this.state.XAxisColumnValues))
    }

    public canBack(): boolean { return true; }

    public Next(): void {
        this.props.Data.XAxisColumnId = this.state.XAxisColumn
        this.props.Data.XAxisColumnValues = this.state.XAxisColumnValues
    }
    
    public Back(): void {
        // todo
    }

    public GetIndexStepIncrement() {
        return 1
    }
    public GetIndexStepDecrement() {
        return 1;
    }
    public StepName = this.props.StepName
}


let divStyle: React.CSSProperties = {
    'overflowY': 'auto',
    'height': '200px',
    'marginTop': '2px'
}