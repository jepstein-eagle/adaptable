import * as React from "react";
import { ControlLabel, FormGroup, Col, Panel, Well, Row, Radio } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { StringExtensions } from '../../../Core/Extensions/StringExtensions';
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { IChartDefinition } from "../../../Core/Api/Interface/IAdaptableBlotterObjects";
import { ColumnSelector } from "../../Components/Selectors/ColumnSelector";
import { SelectionMode, DistinctCriteriaPairValue } from "../../../Core/Enums";
import { IColumn } from "../../../Core/Interface/IColumn";
import { ArrayExtensions } from "../../../Core/Extensions/ArrayExtensions";
import { IRawValueDisplayValuePair } from "../../UIInterfaces";
import { SingleListBox } from "../../Components/ListBox/SingleListBox";
import * as GeneralConstants from '../../../Core/Constants/GeneralConstants';
import { IAdaptableBlotter } from "../../../Core/Interface/IAdaptableBlotter";

export interface ChartAdditionalColumnWizardProps extends AdaptableWizardStepProps<IChartDefinition> {
    ChartDefinitions: IChartDefinition[]
    Columns: IColumn[]
   Blotter : IAdaptableBlotter
}

export interface ChartAdditionalColumnWizardState {
    AdditionalColumn: string,
    AdditionalColumnValues: string[],
    UseAllAdditionalColumnValues: boolean,
    AvailableAdditionalColumnValues: IRawValueDisplayValuePair[]
}

export class ChartAdditionalColumnWizard extends React.Component<ChartAdditionalColumnWizardProps, ChartAdditionalColumnWizardState> implements AdaptableWizardStep {
    constructor(props: ChartAdditionalColumnWizardProps) {
        super(props)
        let hasDistinctColumnValues: boolean = ArrayExtensions.IsNotNullOrEmpty(props.Data.AdditionalColumnValues) && props.Data.AdditionalColumnValues[0] != GeneralConstants.ALL_COLUMN_VALUES
        this.state = {
            AdditionalColumn: props.Data.AdditionalColumn,
            AdditionalColumnValues: props.Data.AdditionalColumnValues ? props.Data.AdditionalColumnValues : [],
            UseAllAdditionalColumnValues: (hasDistinctColumnValues) ? false : true,
            AvailableAdditionalColumnValues: (StringExtensions.IsNotNullOrEmpty(this.props.Data.AdditionalColumn)) ?
                props.Blotter.getColumnValueDisplayValuePairDistinctList(props.Data.AdditionalColumn, DistinctCriteriaPairValue.DisplayValue) :
                null
        }
    }
    render(): any {
        let cssClassName: string = this.props.cssClassName + "-settings"

        return <div className={cssClassName}>
            <Panel header="X Axis Additional Column" bsStyle="primary">
                <AdaptableBlotterForm horizontal>
                    <FormGroup controlId="additionalColumn">
                        <Col xs={3} />
                        <Col xs={7}>
                            <Well>You can, optionally, segment the X Axis further by grouping totals against the values in another column</Well>
                        </Col>
                        <Col xs={3} componentClass={ControlLabel}>Additional Column: </Col>
                        <Col xs={7}>
                            <ColumnSelector cssClassName={cssClassName} SelectedColumnIds={[this.state.AdditionalColumn]}
                                ColumnList={this.props.Columns}
                                onColumnChange={columns => this.onAdditionalColumnChanged(columns)}
                                SelectionMode={SelectionMode.Single} />
                        </Col>
                        <Row>
                            <Col xs={4} componentClass={ControlLabel}>X Axis Column Values:</Col>
                            <Col xs={6} >
                                <Radio inline value="All" checked={this.state.UseAllAdditionalColumnValues == true} onChange={(e) => this.onUseAllColumnValuesChanged(e)}>All</Radio>
                                <Radio inline value="Bespoke" checked={this.state.UseAllAdditionalColumnValues == false} onChange={(e) => this.onUseAllColumnValuesChanged(e)}>Bespoke</Radio>
                            </Col>
                        </Row>

                    </FormGroup>
                </AdaptableBlotterForm>

                {StringExtensions.IsNotNullOrEmpty(this.state.AdditionalColumn) && this.state.UseAllAdditionalColumnValues == false &&
                    <div>
                        <SingleListBox Values={this.state.AvailableAdditionalColumnValues}
                            cssClassName={cssClassName}
                            UiSelectedValues={this.state.AdditionalColumnValues}
                            DisplayMember={DistinctCriteriaPairValue[DistinctCriteriaPairValue.DisplayValue]}
                            ValueMember={DistinctCriteriaPairValue[DistinctCriteriaPairValue.DisplayValue]}
                            SortMember={DistinctCriteriaPairValue[DistinctCriteriaPairValue.RawValue]}
                            onSelectedChange={(list) => this.onColumnValuesChange(list)}
                            SelectionMode={SelectionMode.Multi}>
                        </SingleListBox>
                    </div>
                }

            </Panel>
        </div>
    }

    private onUseAllColumnValuesChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let showAll: boolean = e.value == "All"
        let colValues: string[] = (showAll) ? [GeneralConstants.ALL_COLUMN_VALUES] : []
        this.setState({ UseAllAdditionalColumnValues: showAll, AdditionalColumnValues: colValues } as ChartAdditionalColumnWizardState, () => this.props.UpdateGoBackState())
    }

    onColumnValuesChange(list: any[]): any {
        this.setState({ AdditionalColumnValues: list } as ChartAdditionalColumnWizardState, () => this.props.UpdateGoBackState())
    }

    onAdditionalColumnChanged(columns: IColumn[]) {
        let isColumn: boolean = ArrayExtensions.IsNotNullOrEmpty(columns)
        this.setState({
            AdditionalColumn: isColumn ? columns[0].ColumnId : "",
            UseAllAdditionalColumnValues: true,
            AdditionalColumnValues: [GeneralConstants.ALL_COLUMN_VALUES],
            AvailableAdditionalColumnValues: isColumn ?
                this.props.Blotter.getColumnValueDisplayValuePairDistinctList(columns[0].ColumnId, DistinctCriteriaPairValue.DisplayValue) :
                null
        } as ChartAdditionalColumnWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean {
        if (StringExtensions.IsNotNullOrEmpty(this.state.AdditionalColumn) && ArrayExtensions.IsNullOrEmpty(this.state.AdditionalColumnValues)) {
            return false
        }
        return true;
    }

    public canBack(): boolean { return true; }

    public Next(): void {
        this.props.Data.AdditionalColumn = this.state.AdditionalColumn
        this.props.Data.AdditionalColumnValues = this.state.AdditionalColumnValues
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

