import * as React from "react";
import { ControlLabel, FormGroup, Col, Panel, Well, Row } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { IChartDefinition } from "../../../Api/Interface/IAdaptableBlotterObjects";
import { ColumnSelector } from "../../Components/Selectors/ColumnSelector";
import { SelectionMode } from "../../../Utilities/Enums";
import { IColumn } from "../../../Api/Interface/IColumn";
import { ColumnHelper } from "../../../Utilities/Helpers/ColumnHelper";
import { ArrayExtensions } from "../../../Utilities/Extensions/ArrayExtensions";
import { StringExtensions } from "../../../Utilities/Extensions/StringExtensions";

export interface ChartYAxisWizardProps extends AdaptableWizardStepProps<IChartDefinition> {
    ChartDefinitions: IChartDefinition[]
    Columns: IColumn[]
}

export interface ChartYAxisWizardState {
    YAxisColumnIds: string[],
}

export class ChartYAxisWizard extends React.Component<ChartYAxisWizardProps, ChartYAxisWizardState> implements AdaptableWizardStep {
    constructor(props: ChartYAxisWizardProps) {
        super(props)
        this.state = {
            YAxisColumnIds: props.Data.YAxisColumnIds,
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

        let newRow = this.createRow(idsCount, newLabelText, cssClassName, "", this.state.YAxisColumnIds.length);

        let existingColumnRows = this.state.YAxisColumnIds.map((colId, index) => {
            let columnNumber: number = index + 1;
            let labelText: string = "Y Axis Column (" + columnNumber + ")"
            return this.createRow(columnNumber, labelText, cssClassName, colId, index);
          })


        return <div className={cssClassName}>
            <Panel header="Chart Colum Y Axis" bsStyle="primary">
                <AdaptableBlotterForm horizontal>
                    <FormGroup controlId="yAxisColumn">
                        <Row>
                            <Col xs={1} />
                            <Col xs={10}>
                                <Well>Select a numeric column for the Y Axis. <br />
                                    This will show grouped totals according to values in the X Axis.</Well>
                            </Col>
                            <Col xs={1} />
                        </Row>
                        {existingColumnRows}
                        {newRow}

                    </FormGroup>
                </AdaptableBlotterForm>
            </Panel>

        </div>
    }

    createRow(columnNumber: number, labelText: string, cssClassName: string, colId: string, index: number): any {
        return <Row key={columnNumber}>
            <Col xs={3} componentClass={ControlLabel}>{labelText}</Col>
            <Col xs={8}>
                <ColumnSelector
                    key={"colSelect" + columnNumber}
                    cssClassName={cssClassName}
                    SelectedColumnIds={[colId]}
                    ColumnList={this.getAvailableNumericColumns(colId)}
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
        this.props.Data.YAxisColumnIds = this.state.YAxisColumnIds
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

