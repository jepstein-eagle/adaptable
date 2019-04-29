import * as React from "react";
import { AdaptableWizardStepProps, AdaptableWizardStep } from "../../../Wizard/Interface/IAdaptableWizard";
import { ICategoryChartDefinition } from "../../../../Utilities/Interface/BlotterObjects/Charting/IChartDefinition";
import { Expression } from "../../../../Utilities/Expression";
import { ExpressionHelper } from "../../../../Utilities/Helpers/ExpressionHelper";
import { Panel, FormGroup, Row, Col, HelpBlock, ControlLabel, Radio } from "react-bootstrap";
import { AdaptableBlotterForm } from "../../../Components/Forms/AdaptableBlotterForm";
import { ColumnSelector } from "../../../Components/Selectors/ColumnSelector";
import { SelectionMode } from "../../../../Utilities/Enums";
import { IColumn } from "../../../../Utilities/Interface/IColumn";
import { ArrayExtensions } from "../../../../Utilities/Extensions/ArrayExtensions";
import { StringExtensions } from "../../../../Utilities/Extensions/StringExtensions";

export interface CategoryChartXAxisWizardProps extends AdaptableWizardStepProps<ICategoryChartDefinition> {
}

export interface CategoryChartXAxisWizardState {
    XAxisColumnId: string,
    UseAllXAsisColumnValues: boolean,
    XAxisExpression?: Expression
}

export class CategoryChartXAxisWizard extends React.Component<CategoryChartXAxisWizardProps, CategoryChartXAxisWizardState> implements AdaptableWizardStep {
    constructor(props: CategoryChartXAxisWizardProps) {
        super(props)
        this.state = {
            XAxisColumnId: props.Data.XAxisColumnId,
            UseAllXAsisColumnValues: ExpressionHelper.IsNullOrEmptyExpression(this.props.Data.XAxisExpression),
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
                                <HelpBlock>Select a column for the X Axis.<br />
                                    Choose whether to show all values for this column or to filter them (performed in next step)</HelpBlock>
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
        let showAll: boolean = e.value == "All";
        let expression: Expression = this.state.XAxisExpression;
        if (!showAll && ExpressionHelper.IsNullOrEmptyExpression(expression)) {
            expression = ExpressionHelper.CreateEmptyExpression();
        }
        this.setState({ UseAllXAsisColumnValues: showAll, XAxisExpression: expression } as CategoryChartXAxisWizardState, () => this.props.UpdateGoBackState())
    }

    private onXAxisColumnChanged(columns: IColumn[]) {
        let isColumn: boolean = ArrayExtensions.IsNotNullOrEmpty(columns)
        this.setState({
            XAxisColumnId: isColumn ? columns[0].ColumnId : "",
            UseAllXAsisColumnValues: true,
        } as CategoryChartXAxisWizardState, () => this.props.UpdateGoBackState())
    }


    public canNext(): boolean {
        return (StringExtensions.IsNotNullOrEmpty(this.state.XAxisColumnId))
    }

    public canBack(): boolean { return true; }

    public Next(): void {
        this.props.Data.XAxisColumnId = this.state.XAxisColumnId
        this.props.Data.XAxisExpression = (this.state.UseAllXAsisColumnValues) ? null : this.state.XAxisExpression
        if (this.props.Data.XAxisColumnId != this.state.XAxisColumnId) {
            this.props.Data.XAxisExpression = null;
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
}


