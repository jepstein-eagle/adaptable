import * as React from "react";
import { ControlLabel, FormGroup, Col, Panel, Row, Well, Radio } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { IChartDefinition } from "../../../Utilities/Interface/IAdaptableBlotterObjects";
import { ColumnSelector } from "../../Components/Selectors/ColumnSelector";
import { SelectionMode } from "../../../Utilities/Enums";
import { IColumn } from "../../../Utilities/Interface/IColumn";
import { ArrayExtensions } from "../../../Utilities/Extensions/ArrayExtensions";
import { IAdaptableBlotter } from "../../../Utilities/Interface/IAdaptableBlotter";
import { ExpressionHelper } from "../../../Utilities/Helpers/ExpressionHelper";
import { Expression } from "../../../Utilities/Expression";

export interface ChartXAxisWizardProps extends AdaptableWizardStepProps<IChartDefinition> {
    ChartDefinitions: IChartDefinition[]
    Columns: IColumn[]
    Blotter: IAdaptableBlotter
}

export interface ChartXAxisWizardState {
    XAxisColumnId: string,
    UseAllXAsisColumnValues: boolean,
    XAxisExpression: Expression
}

export class ChartXAxisWizard extends React.Component<ChartXAxisWizardProps, ChartXAxisWizardState> implements AdaptableWizardStep {
    constructor(props: ChartXAxisWizardProps) {
        super(props)
        this.state = {
            XAxisColumnId: props.Data.XAxisColumnId,
            UseAllXAsisColumnValues: ExpressionHelper.IsEmptyExpression(this.props.Data.XAxisExpression),
            XAxisExpression: this.props.Data.XAxisExpression
        }
    }

    render(): any {
        let cssClassName: string = this.props.cssClassName + "-settings"

        return <div className={cssClassName}>
            <Panel header="Chart: X (Horizontal) Axis Column" bsStyle="primary">
                <AdaptableBlotterForm horizontal>

                    <FormGroup controlId="xAxisColumn">
                        <Row>
                            <Col xs={1} />
                            <Col xs={10}>
                                <Well>Select a column for the X Axis.<br />In the next step you can filter which values to display</Well>
                            </Col>
                            <Col xs={1} />
                        </Row>
                        <Row>
                            <Col xs={4} componentClass={ControlLabel}>X Axis Column: </Col>
                            <Col xs={6}>
                                <ColumnSelector cssClassName={cssClassName} SelectedColumnIds={[this.state.XAxisColumnId]}
                                    ColumnList={this.props.Columns}
                                    onColumnChange={columns => this.onXAxisColumnChanged(columns)}
                                    SelectionMode={SelectionMode.Single} />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} componentClass={ControlLabel}>X Axis Column Values:</Col>
                            <Col xs={6} >
                                <Radio inline value="All" checked={this.state.UseAllXAsisColumnValues == true} onChange={(e) => this.onUseAllColumnValuesChanged(e)}>All</Radio>
                                <Radio inline value="Filtered" checked={this.state.UseAllXAsisColumnValues == false} onChange={(e) => this.onUseAllColumnValuesChanged(e)}>Filtered</Radio>
                            </Col>
                        </Row>

                    </FormGroup>
                </AdaptableBlotterForm>
            </Panel>
        </div>
    }


    private onUseAllColumnValuesChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let showAll: boolean = e.value == "All"
        this.setState({ UseAllXAsisColumnValues: showAll } as ChartXAxisWizardState, () => this.props.UpdateGoBackState())
    }

    private onXAxisColumnChanged(columns: IColumn[]) {
        let isColumn: boolean = ArrayExtensions.IsNotNullOrEmpty(columns)
        this.setState({
            XAxisColumnId: isColumn ? columns[0].ColumnId : "",
            UseAllXAsisColumnValues: true,
        } as ChartXAxisWizardState, () => this.props.UpdateGoBackState())
    }


    public canNext(): boolean {
        return (StringExtensions.IsNotNullOrEmpty(this.state.XAxisColumnId))
    }

    public canBack(): boolean { return true; }

    public Next(): void {
        this.props.Data.XAxisColumnId = this.state.XAxisColumnId
        this.props.Data.XAxisExpression = (this.state.UseAllXAsisColumnValues) ? ExpressionHelper.CreateEmptyExpression() : this.state.XAxisExpression
        if (this.props.Data.XAxisColumnId != this.state.XAxisColumnId) {
            this.props.Data.XAxisExpression = ExpressionHelper.CreateEmptyExpression();
        }
    }

    public Back(): void {
        // todo
    }

    public GetIndexStepIncrement() {
        return (this.state.UseAllXAsisColumnValues) ? 2 : 1
    }
    public GetIndexStepDecrement() {
        return 1;
    }
    public StepName = this.props.StepName
}


