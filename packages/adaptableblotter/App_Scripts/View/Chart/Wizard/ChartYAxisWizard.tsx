import * as React from "react";
import { ControlLabel, FormGroup, Col, Panel, Well, Row, Radio } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { IChartDefinition } from "../../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { ColumnSelector } from "../../Components/Selectors/ColumnSelector";
import { SelectionMode, MessageType } from "../../../Utilities/Enums";
import { IColumn } from "../../../Utilities/Interface/IColumn";
import { ColumnHelper } from "../../../Utilities/Helpers/ColumnHelper";
import { ArrayExtensions } from "../../../Utilities/Extensions/ArrayExtensions";
import { AxisTotal } from "../../../Utilities/ChartEnums";
import { AdaptablePopover } from "../../AdaptablePopover";

export interface ChartYAxisWizardProps extends AdaptableWizardStepProps<IChartDefinition> {
    ChartDefinitions: IChartDefinition[]
   }

export interface ChartYAxisWizardState {
    YAxisColumnIds: string[],
    YAxisTotal: AxisTotal
}

export class ChartYAxisWizard extends React.Component<ChartYAxisWizardProps, ChartYAxisWizardState> implements AdaptableWizardStep {
    constructor(props: ChartYAxisWizardProps) {
        super(props)
        this.state = {
            YAxisColumnIds: props.Data.YAxisColumnIds,
            YAxisTotal: props.Data.YAxisTotal as AxisTotal
        }
    }
    render(): any {
        let cssClassName: string = this.props.cssClassName + "-settings"
        let newLabelText: string = "Y Axis Column"
        let idsCount: number = this.state.YAxisColumnIds.length + 1
        if (ArrayExtensions.IsNotNullOrEmpty(this.state.YAxisColumnIds)) {
            let additionalLabelTextString = ' (' + idsCount + ')'
            newLabelText = newLabelText + additionalLabelTextString;
        }
        let availableCols = this.getAvailableNumericColumns("")
        let newRow = ArrayExtensions.IsNotNullOrEmpty(availableCols) ?
            this.createRow(idsCount, newLabelText, cssClassName, "", this.state.YAxisColumnIds.length, availableCols)
            : null;

        let existingColumnRows = this.state.YAxisColumnIds.map((colId, index) => {
            let columnNumber: number = index + 1;
            let labelText: string = "Y Axis Column (" + columnNumber + ")"
            let availableNumericCols = this.getAvailableNumericColumns(colId)
            return this.createRow(columnNumber, labelText, cssClassName, colId, index, availableNumericCols);
        })


        return <div className={cssClassName}>
            <Panel header="Chart: Y (Vertical) Axis Column(s)" bsStyle="primary">

                <AdaptableBlotterForm horizontal>
                    <FormGroup controlId="yAxisColumn">
                        <Row>
                            <Col xs={1} />
                            <Col xs={10}>
                                <Well>Select numeric column(s) for the Y Axis. <br />
                                    You can choose as many columns as required.<br />
                                    Check the 'Display Total' to specify how this column is grouped.</Well>
                            </Col>
                            <Col xs={1} />
                        </Row>
                        <Row>
                            <Col xs={3} componentClass={ControlLabel}>Display Total:</Col>
                            <Col xs={7} >
                                <Radio inline value="Sum" checked={this.state.YAxisTotal == AxisTotal.Sum} onChange={(e) => this.onYAisTotalChanged(e)}>Sum</Radio>
                                <Radio inline value="Average" checked={this.state.YAxisTotal == AxisTotal.Average} onChange={(e) => this.onYAisTotalChanged(e)}>Average</Radio>
                                {' '} {' '}
                                <AdaptablePopover cssClassName={cssClassName} headerText={"Chart Y Axis: Display Total"} bodyText={["Choose whether the X Axis is grouped according to the sum of it values (by X Axis) or their average."]} />
                            </Col>
                        </Row>

                        {existingColumnRows}
                        {newRow}

                    </FormGroup>
                </AdaptableBlotterForm>
            </Panel>

        </div>
    }

    createRow(columnNumber: number, labelText: string, cssClassName: string, colId: string, index: number, availableCols: IColumn[]): any {
        return <Row key={columnNumber} style={{ marginTop: '10px' }}>
            <Col xs={3} componentClass={ControlLabel}>{labelText}</Col>
            <Col xs={8}>
                <ColumnSelector
                    key={"colSelect" + columnNumber}
                    cssClassName={cssClassName}
                    SelectedColumnIds={[colId]}
                    ColumnList={availableCols}
                    onColumnChange={columns => this.onYAxisColumnChanged(columns, index)}
                    SelectionMode={SelectionMode.Single} />
            </Col>
        </Row>
    }


    onYAxisColumnChanged(columns: IColumn[], index: number) {
        let column: string = columns.length > 0 ? columns[0].ColumnId : ""
        let currentColumns = this.state.YAxisColumnIds;
        if (column == "") {
            if (ArrayExtensions.IsNotNullOrEmpty(currentColumns)) {
                currentColumns.splice(index, 1);
            }
        } else {
            if (currentColumns.length <= index) {
                currentColumns.push(column)
            } else {
                currentColumns[index] = column;
            }
        }
        this.setState({ YAxisColumnIds: currentColumns } as ChartYAxisWizardState, () => this.props.UpdateGoBackState())
    }

    private onYAisTotalChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let axisTotal: AxisTotal = (e.value == "Sum") ? AxisTotal.Sum : AxisTotal.Average;
        this.setState({ YAxisTotal: axisTotal } as ChartYAxisWizardState, () => this.props.UpdateGoBackState())
    }

    getAvailableNumericColumns(selectedColumnId: string): IColumn[] {
        let cols: IColumn[] = []
        ColumnHelper.getNumericColumns(this.props.Columns).forEach(c => {
            if (c.ColumnId == selectedColumnId) {
                cols.push(c);
            } else {
                if (ArrayExtensions.NotContainsItem(this.state.YAxisColumnIds, c.ColumnId)) {
                    cols.push(c);
                }
            }
        });
        return cols;
    }


    public canNext(): boolean {
        return (ArrayExtensions.IsNotNullOrEmpty(this.state.YAxisColumnIds))
    }

    public canBack(): boolean { return true; }

    public Next(): void {
        this.props.Data.YAxisColumnIds = this.state.YAxisColumnIds;
        this.props.Data.YAxisTotal = this.state.YAxisTotal
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

