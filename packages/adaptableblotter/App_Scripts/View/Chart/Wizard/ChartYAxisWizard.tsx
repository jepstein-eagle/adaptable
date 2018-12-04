import * as React from "react";
import { ControlLabel, FormGroup, Col, Panel, Well, Row } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { IChartDefinition } from "../../../Api/Interface/IAdaptableBlotterObjects";
import { ColumnSelector } from "../../Components/Selectors/ColumnSelector";
import { SelectionMode } from "../../../Utilities/Enums";
import { IColumn } from "../../../Api/Interface/IColumn";
import { ColumnHelper } from "../../../Utilities/Helpers/ColumnHelper";

export interface ChartYAxisWizardProps extends AdaptableWizardStepProps<IChartDefinition> {
    ChartDefinitions: IChartDefinition[]
    Columns: IColumn[]
}

export interface ChartYAxisWizardState {
    YAxisColumn: string,
}

export class ChartYAxisWizard extends React.Component<ChartYAxisWizardProps, ChartYAxisWizardState> implements AdaptableWizardStep {
    constructor(props: ChartYAxisWizardProps) {
        super(props)
        this.state = {
            YAxisColumn: props.Data.YAxisColumnId,
        }
    }
    render(): any {
        let cssClassName: string = this.props.cssClassName + "-settings"

        return <div className={cssClassName}>
            <Panel header="Chart Colum Y Axis" bsStyle="primary">
                <AdaptableBlotterForm horizontal>
                    <FormGroup controlId="yAxisColumn">
                        <Row>
                            <Col xs={1} />
                            <Col xs={10}>
                                <Well>Select a numeric column for the Y Axis. <br />
                                    This will show grouped totals accorrding to values in the X Axis.</Well>
                            </Col>
                            <Col xs={1} />
                        </Row>
                        <Row>
                            <Col xs={3} componentClass={ControlLabel}>Y Axis Column: </Col>
                            <Col xs={8}>
                                <ColumnSelector
                                    cssClassName={cssClassName}
                                    SelectedColumnIds={[this.state.YAxisColumn]}
                                    ColumnList={ColumnHelper.getNumericColumns(this.props.Columns)}
                                    onColumnChange={columns => this.onYAxisColumnChanged(columns)}
                                    SelectionMode={SelectionMode.Single} />
                            </Col>
                        </Row>
                    </FormGroup>
                </AdaptableBlotterForm>
            </Panel>

        </div>
    }



    onYAxisColumnChanged(columns: IColumn[]) {
        this.setState({
            YAxisColumn: columns.length > 0 ? columns[0].ColumnId : ""
        } as ChartYAxisWizardState, () => this.props.UpdateGoBackState())
    }


    public canNext(): boolean {
        return (StringExtensions.IsNotNullOrEmpty(this.state.YAxisColumn))
    }

    public canBack(): boolean { return true; }

    public Next(): void {
        this.props.Data.YAxisColumnId = this.state.YAxisColumn
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

