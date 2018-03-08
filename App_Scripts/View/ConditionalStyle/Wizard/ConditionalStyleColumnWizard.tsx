import * as React from "react";
import { Radio, Col, Panel } from 'react-bootstrap';
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { IConditionalStyleCondition } from '../../../Strategy/Interface/IConditionalStyleStrategy';
import { ConditionalStyleScope, SelectionMode, PopoverType } from '../../../Core/Enums';
import { ColumnSelector } from '../../ColumnSelector';
import { StringExtensions } from '../../../Core/Extensions/StringExtensions';
import { AdaptableBlotterForm } from '../../AdaptableBlotterForm'
import { AdaptablePopover } from '../../AdaptablePopover';

export interface ConditionalStyleColumnWizardProps extends AdaptableWizardStepProps<IConditionalStyleCondition> {
    Columns: Array<IColumn>
}

export interface ConditionalStyleColumnWizardState {
    ColumnId: string,
    ConditionalStyleScope: ConditionalStyleScope,
}

export class ConditionalStyleColumnWizard extends React.Component<ConditionalStyleColumnWizardProps, ConditionalStyleColumnWizardState> implements AdaptableWizardStep {

    constructor(props: ConditionalStyleColumnWizardProps) {
        super(props)
        this.state = {
            ColumnId: this.props.Data.ColumnId,
            ConditionalStyleScope: this.props.Data.ConditionalStyleScope,
        }
    }

    render(): any {

        return <Panel header="Select Where the Conditional Style is Applied" bsStyle="primary">
            <AdaptableBlotterForm inline>
                <Col xs={12} style={radioMarginStyle}>

                    <Radio inline value="Row" checked={this.state.ConditionalStyleScope == ConditionalStyleScope.Row} onChange={(e) => this.onScopeSelectChanged(e)}>Whole Row</Radio>
                    {' '} {' '}<AdaptablePopover headerText={"Conditional Style: Whole Row"} bodyText={["The conditional style will be applied to alls cells in each matching row."]} popoverType={PopoverType.Info} />
                </Col>
                <Col xs={12} style={radioMarginStyle}>
                    <Radio inline value="Column" checked={this.state.ConditionalStyleScope == ConditionalStyleScope.Column} onChange={(e) => this.onScopeSelectChanged(e)}>Column</Radio>
                    {' '} {' '}<AdaptablePopover headerText={"Conditional Style: Single Column"} bodyText={["Pick the column from the list below which will have conditional style applied."]} popoverType={PopoverType.Info} />

                </Col>
            </AdaptableBlotterForm>
            <Col xs={12} style={radioMarginStyle}>
                {this.state.ConditionalStyleScope == ConditionalStyleScope.Column &&
                    <ColumnSelector SelectedColumnIds={[this.state.ColumnId]}
                        ColumnList={this.props.Columns}
                        onColumnChange={columns => this.onColumnSelectedChanged(columns)}
                        SelectionMode={SelectionMode.Single} />
                }
            </Col>
        </Panel>
    }



    private onColumnSelectedChanged(columns: IColumn[]) {
        this.setState({ ColumnId: columns.length > 0 ? columns[0].ColumnId : "" } as ConditionalStyleColumnWizardState, () => this.props.UpdateGoBackState())
    }

    private onScopeSelectChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (e.value == "Column") {
            this.setState({ ConditionalStyleScope: ConditionalStyleScope.Column } as ConditionalStyleColumnWizardState, () => this.props.UpdateGoBackState())
        } else {
            this.setState({ ConditionalStyleScope: ConditionalStyleScope.Row, ColumnId: "" } as ConditionalStyleColumnWizardState, () => this.props.UpdateGoBackState())
        }
    }

    public canNext(): boolean {

        if (!this.state.ConditionalStyleScope == null) {
            return false;
        }
        if (this.state.ConditionalStyleScope == ConditionalStyleScope.Column && StringExtensions.IsNullOrEmpty(this.state.ColumnId)) {
            return false;
        }
        return true;
    }

    public canBack(): boolean { return false; }
    public Next(): void {
        this.props.Data.ColumnId = this.state.ColumnId;
        this.props.Data.ConditionalStyleScope = this.state.ConditionalStyleScope;
    }

    public Back(): void { // todo
    }
    public StepName = this.props.StepName
}

let radioMarginStyle = {
    margin: '10px'
}

