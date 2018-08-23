import * as React from "react";
import { ControlLabel, FormGroup, Col, Panel, Well } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { StringExtensions } from '../../../Core/Extensions/StringExtensions';
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { IChartDefinition } from "../../../Core/Api/Interface/AdaptableBlotterObjects";
import { ColumnSelector } from "../../Components/Selectors/ColumnSelector";
import { SelectionMode } from "../../../Core/Enums";
import { IColumn } from "../../../Core/Interface/IColumn";

export interface ChartAdditionalColumnWizardProps extends AdaptableWizardStepProps<IChartDefinition> {
    ChartDefinitions: IChartDefinition[]
    Columns: IColumn[]
   }

export interface ChartAdditionalColumnWizardState {
      AdditionalColumn: string,
    }

export class ChartAdditionalColumnWizard extends React.Component<ChartAdditionalColumnWizardProps, ChartAdditionalColumnWizardState> implements AdaptableWizardStep {
    constructor(props: ChartAdditionalColumnWizardProps) {
        super(props)
        this.state = {
            AdditionalColumn: props.Data.AdditionalColumn,
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
                        </FormGroup>
                        </AdaptableBlotterForm>
                        
                
            </Panel>
        </div>
    }

   
    onAdditionalColumnChanged(columns: IColumn[]) {
        this.setState({
            AdditionalColumn: columns.length > 0 ? columns[0].ColumnId : ""
        } as ChartAdditionalColumnWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean {
        return (StringExtensions.IsNotNullOrEmpty(this.state.AdditionalColumn))
    }

    public canBack(): boolean { return true; }

    public Next(): void {
         this.props.Data.AdditionalColumn = this.state.AdditionalColumn
    }
    public Back(): void {
        // todo
    }

    public GetIndexStepIncrement() {
        return (StringExtensions.IsNullOrEmpty( this.state.AdditionalColumn))? 2: 1
    }
    public GetIndexStepDecrement() {
        return 1;
    }
    public StepName = this.props.StepName
}

