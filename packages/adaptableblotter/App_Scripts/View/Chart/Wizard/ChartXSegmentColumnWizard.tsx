import * as React from "react";
import { ControlLabel, FormGroup, Col, Panel, Row, Radio, HelpBlock } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { IChartDefinition } from "../../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { ColumnSelector } from "../../Components/Selectors/ColumnSelector";
import { SelectionMode } from "../../../Utilities/Enums";
import { IColumn } from "../../../Utilities/Interface/IColumn";
import { ArrayExtensions } from "../../../Utilities/Extensions/ArrayExtensions";
import { ExpressionHelper } from "../../../Utilities/Helpers/ExpressionHelper";
import { Expression } from "../../../Utilities/Expression";

export interface ChartXSegmentColumnWizardProps extends AdaptableWizardStepProps<IChartDefinition> {
}

export interface ChartXSegmentColumnWizardState {
    XSegmentColumnId: string,
    UseAllXSegmentColumnValues: boolean,
    XSegmentExpression: Expression
}

export class ChartXSegmentColumnWizard extends React.Component<ChartXSegmentColumnWizardProps, ChartXSegmentColumnWizardState> implements AdaptableWizardStep {
    constructor(props: ChartXSegmentColumnWizardProps) {
        super(props)
        this.state = {
            XSegmentColumnId: props.Data.XSegmentColumnId,
            UseAllXSegmentColumnValues: ExpressionHelper.IsEmptyExpression(this.props.Data.XSegmentExpression),
            XSegmentExpression: this.props.Data.XSegmentExpression
        }
    }
    render(): any {
        let cssClassName: string = this.props.cssClassName + "-settings"

        return <div className={cssClassName}>
            <Panel header="X Axis Segment Column" bsStyle="primary">
                <AdaptableBlotterForm horizontal>
                    <FormGroup controlId="segmentColumn">
                        <Row>  <Col xs={1} />
                            <Col xs={10}>
                                <HelpBlock>You can, optionally, segment the X Axis further by grouping totals against the values in another column</HelpBlock>
                            </Col>
                            <Col xs={1} />
                        </Row>
                        <Row>
                            <Col xs={4} componentClass={ControlLabel}>Segment Column: </Col>
                            <Col xs={6}>
                                <ColumnSelector cssClassName={cssClassName} SelectedColumnIds={[this.state.XSegmentColumnId]}
                                    ColumnList={this.props.Columns}
                                    onColumnChange={columns => this.onSegmentColumnChanged(columns)}
                                    SelectionMode={SelectionMode.Single} />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} componentClass={ControlLabel}>Segment Column Values:</Col>
                            <Col xs={6} >
                                <Radio inline value="All" checked={this.state.UseAllXSegmentColumnValues == true} onChange={(e) => this.onUseAllColumnValuesChanged(e)}>All</Radio>
                                <Radio inline value="Bespoke" checked={this.state.UseAllXSegmentColumnValues == false} onChange={(e) => this.onUseAllColumnValuesChanged(e)}>Bespoke</Radio>
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
        this.setState({ UseAllXSegmentColumnValues: showAll } as ChartXSegmentColumnWizardState, () => this.props.UpdateGoBackState())
    }


    onSegmentColumnChanged(columns: IColumn[]) {
        let isColumn: boolean = ArrayExtensions.IsNotNullOrEmpty(columns)
        this.setState({
            XSegmentColumnId: isColumn ? columns[0].ColumnId : "",
            UseAllXSegmentColumnValues: true,
        } as ChartXSegmentColumnWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean {
        return true;/// its not mandatory
    }

    public canBack(): boolean { return true; }

    public Next(): void {
        this.props.Data.XSegmentColumnId = this.state.XSegmentColumnId
        this.props.Data.XSegmentExpression = (this.state.UseAllXSegmentColumnValues) ? ExpressionHelper.CreateEmptyExpression() : this.state.XSegmentExpression
        if (this.props.Data.XSegmentColumnId != this.state.XSegmentColumnId) {
            this.props.Data.XSegmentExpression = ExpressionHelper.CreateEmptyExpression();
        }
    }

    public Back(): void {
        // todo
    }

    public GetIndexStepIncrement() {
        return (this.state.UseAllXSegmentColumnValues) ? 2 : 1
    }
    public GetIndexStepDecrement() {
        return (ExpressionHelper.IsEmptyExpression(this.props.Data.XAxisExpression)) ? 2 : 1
    }

}

