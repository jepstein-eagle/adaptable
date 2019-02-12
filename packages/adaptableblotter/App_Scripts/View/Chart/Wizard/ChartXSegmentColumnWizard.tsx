import * as React from "react";
import { ControlLabel, FormGroup, Col, Panel, Row, Radio, HelpBlock } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { IChartDefinition } from "../../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { ColumnSelector } from "../../Components/Selectors/ColumnSelector";
import { SelectionMode, DistinctCriteriaPairValue } from "../../../Utilities/Enums";
import { IColumn } from "../../../Utilities/Interface/IColumn";
import { ArrayExtensions } from "../../../Utilities/Extensions/ArrayExtensions";
import { IRawValueDisplayValuePair } from "../../UIInterfaces";
import { SingleListBox } from "../../Components/ListBox/SingleListBox";
import * as GeneralConstants from '../../../Utilities/Constants/GeneralConstants';
import { IAdaptableBlotter } from "../../../Utilities/Interface/IAdaptableBlotter";
import { ExpressionHelper } from "../../../Utilities/Helpers/ExpressionHelper";
import { Expression } from "../../../Utilities/Expression";

export interface ChartXSegmentColumnWizardProps extends AdaptableWizardStepProps<IChartDefinition> {
    //    ChartDefinitions: IChartDefinition[]
}

export interface ChartXSegmentColumnWizardState {
    AdditionalColumnId: string,
    UseAllAdditionalColumnValues: boolean,
    XSegmentExpression: Expression
}

export class ChartXSegmentColumnWizard extends React.Component<ChartXSegmentColumnWizardProps, ChartXSegmentColumnWizardState> implements AdaptableWizardStep {
    constructor(props: ChartXSegmentColumnWizardProps) {
        super(props)
        this.state = {
            AdditionalColumnId: props.Data.XSegmentColumnId,
            UseAllAdditionalColumnValues: ExpressionHelper.IsEmptyExpression(this.props.Data.XSegmentExpression),
            XSegmentExpression: this.props.Data.XSegmentExpression
        }
    }
    render(): any {
        let cssClassName: string = this.props.cssClassName + "-settings"

        return <div className={cssClassName}>
            <Panel header="X Axis Additional Column" bsStyle="primary">
                <AdaptableBlotterForm horizontal>
                    <FormGroup controlId="additionalColumn">
                        <Row>  <Col xs={1} />
                            <Col xs={10}>
                                <HelpBlock>You can, optionally, segment the X Axis further by grouping totals against the values in another column</HelpBlock>
                            </Col>
                            <Col xs={1} />
                        </Row>
                        <Row>
                            <Col xs={4} componentClass={ControlLabel}>Additional Column: </Col>
                            <Col xs={6}>
                                <ColumnSelector cssClassName={cssClassName} SelectedColumnIds={[this.state.AdditionalColumnId]}
                                    ColumnList={this.props.Columns}
                                    onColumnChange={columns => this.onAdditionalColumnChanged(columns)}
                                    SelectionMode={SelectionMode.Single} />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} componentClass={ControlLabel}>Additional Column Values:</Col>
                            <Col xs={6} >
                                <Radio inline value="All" checked={this.state.UseAllAdditionalColumnValues == true} onChange={(e) => this.onUseAllColumnValuesChanged(e)}>All</Radio>
                                <Radio inline value="Bespoke" checked={this.state.UseAllAdditionalColumnValues == false} onChange={(e) => this.onUseAllColumnValuesChanged(e)}>Bespoke</Radio>
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
        this.setState({ UseAllAdditionalColumnValues: showAll } as ChartXSegmentColumnWizardState, () => this.props.UpdateGoBackState())
    }

   
    onAdditionalColumnChanged(columns: IColumn[]) {
        let isColumn: boolean = ArrayExtensions.IsNotNullOrEmpty(columns)
        this.setState({
            AdditionalColumnId: isColumn ? columns[0].ColumnId : "",
            UseAllAdditionalColumnValues: true,
        } as ChartXSegmentColumnWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean {
        return (StringExtensions.IsNotNullOrEmpty(this.state.AdditionalColumnId))
    }

    public canBack(): boolean { return true; }

    public Next(): void {
        this.props.Data.XSegmentColumnId = this.state.AdditionalColumnId
        this.props.Data.XSegmentExpression = (this.state.UseAllAdditionalColumnValues) ? ExpressionHelper.CreateEmptyExpression() : this.state.XSegmentExpression
        if (this.props.Data.XSegmentColumnId != this.state.AdditionalColumnId) {
            this.props.Data.XSegmentExpression = ExpressionHelper.CreateEmptyExpression();
        }  }
    public Back(): void {
        // todo
    }

    public GetIndexStepIncrement() {
        return (this.state.UseAllAdditionalColumnValues) ? 2 : 1
    }
    public GetIndexStepDecrement() {
        return (ExpressionHelper.IsEmptyExpression(this.props.Data.XAxisExpression)) ? 2 : 1
    }

}

