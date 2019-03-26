import * as React from "react";
import { AdaptableWizardStepProps, AdaptableWizardStep } from "../../../Wizard/Interface/IAdaptableWizard";
import { IPieChartDefinition } from "../../../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { Panel, FormGroup, Row, Col, HelpBlock, ControlLabel, Radio } from "react-bootstrap";
import { AdaptableBlotterForm } from "../../../Components/Forms/AdaptableBlotterForm";
import { ColumnSelector } from "../../../Components/Selectors/ColumnSelector";
import { SelectionMode } from "../../../../Utilities/Enums";
import { IColumn } from "../../../../Utilities/Interface/IColumn";
import { ArrayExtensions } from "../../../../Utilities/Extensions/ArrayExtensions";
import { SecondaryColumnOperation } from "../../../../Utilities/ChartEnums";

export interface PieChartSecondaryColumnWizardProps extends AdaptableWizardStepProps<IPieChartDefinition> {
    //  ChartDefinitions: IChartDefinition[]
}

export interface PieChartSecondaryColumnWizardState {
    SecondaryColumnId?: string,
    SecondaryColumnOperation: SecondaryColumnOperation
}

export class PieChartSecondaryColumnWizard extends React.Component<PieChartSecondaryColumnWizardProps, PieChartSecondaryColumnWizardState> implements AdaptableWizardStep {
    constructor(props: PieChartSecondaryColumnWizardProps) {
        super(props)
        this.state = {
            SecondaryColumnId: props.Data.SecondaryColumnId,
            SecondaryColumnOperation: props.Data.SecondaryColumnOperation,
        }
    }

    render(): any {
        let cssClassName: string = this.props.cssClassName + "-settings"

        return <div className={cssClassName}>
            <Panel header="Secondary Column" bsStyle="primary">
                <AdaptableBlotterForm horizontal>

                    <FormGroup controlId="secondaryColumn">
                        <Row>
                            <Col xs={1} />
                            <Col xs={10}>
                                <HelpBlock>Select a Secondary Column for the Pie Chart.<br /><br/>
                                    Choose whether to show a count for these values or to sum them (latter option is only available for numeric columns)</HelpBlock>
                            </Col>
                            <Col xs={1} />
                        </Row>
                        <Row>
                            <Col xs={4} componentClass={ControlLabel}>Secondary Column: </Col>
                            <Col xs={6}>
                                <ColumnSelector cssClassName={cssClassName}
                                    placeHolder={"Choose a column (optional)"}
                                    SelectedColumnIds={[this.state.SecondaryColumnId]}
                                    ColumnList={this.props.Columns}
                                    onColumnChange={columns => this.onSecondaryColumnChanged(columns)}
                                    SelectionMode={SelectionMode.Single} />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} componentClass={ControlLabel}>Summary Type:</Col>
                            <Col xs={6} >
                                <Radio inline value="Count" checked={this.state.SecondaryColumnOperation == SecondaryColumnOperation.Count} onChange={(e) => this.onSecondaryColumnOperationChanged(e)}>Count</Radio>
                                <Radio inline value="Sum" checked={this.state.SecondaryColumnOperation == SecondaryColumnOperation.Sum} onChange={(e) => this.onSecondaryColumnOperationChanged(e)}>Sum</Radio>
                            </Col>
                        </Row>

                    </FormGroup>
                </AdaptableBlotterForm>
            </Panel>
        </div>
    }


    private onSecondaryColumnOperationChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ SecondaryColumnOperation: e.value as SecondaryColumnOperation } as PieChartSecondaryColumnWizardState, () => this.props.UpdateGoBackState())

    }

    private onSecondaryColumnChanged(columns: IColumn[]) {
        let isColumn: boolean = ArrayExtensions.IsNotNullOrEmpty(columns)
        this.setState({
            SecondaryColumnId: isColumn ? columns[0].ColumnId : "",
        } as PieChartSecondaryColumnWizardState, () => this.props.UpdateGoBackState())
    }


    public canNext(): boolean {
        return true;
    }

    public canBack(): boolean { return true; }

    public Next(): void {
        this.props.Data.SecondaryColumnId = this.state.SecondaryColumnId
        this.props.Data.SecondaryColumnOperation = this.state.SecondaryColumnOperation
    }

    public Back(): void {
        // todo
    }

    public GetIndexStepIncrement() {
        return 1;
    }
    public GetIndexStepDecrement() {
        return 1;
    }
}


