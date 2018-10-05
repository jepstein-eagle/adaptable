import * as React from "react";
import { Radio, Col, Panel } from 'react-bootstrap';
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { ConditionalStyleScope, SelectionMode, MessageType } from '../../../Core/Enums';
import { StringExtensions } from '../../../Core/Extensions/StringExtensions';
import { AdaptablePopover } from '../../AdaptablePopover';
import { ColumnSelector } from "../../Components/Selectors/ColumnSelector";
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { IConditionalStyle } from "../../../Core/Api/Interface/IAdaptableBlotterObjects";

export interface ConditionalStyleScopeWizardProps extends AdaptableWizardStepProps<IConditionalStyle> {
    Columns: Array<IColumn>
}

export interface ConditionalStyleScopeWizardState {
    ColumnId: string,
    ConditionalStyleScope: ConditionalStyleScope,
}

export class ConditionalStyleScopeWizard extends React.Component<ConditionalStyleScopeWizardProps, ConditionalStyleScopeWizardState> implements AdaptableWizardStep {

    constructor(props: ConditionalStyleScopeWizardProps) {
        super(props)
        this.state = {
            ColumnId: this.props.Data.ColumnId,
            ConditionalStyleScope: this.props.Data.ConditionalStyleScope as ConditionalStyleScope,
        }
    }

    render(): any {
        let cssClassName: string = this.props.cssClassName + "-scope"
       
        return <div className={cssClassName}>
             <Panel header="Select Where the Conditional Style is Applied" bsStyle="primary">
                <AdaptableBlotterForm inline>
                    <Col xs={12} className="ab_large_margin">
                        <Radio className={cssClassName + "__radiobutton"} inline value="Row" checked={this.state.ConditionalStyleScope == ConditionalStyleScope.Row} onChange={(e) => this.onScopeSelectChanged(e)}>Whole Row</Radio>
                        {' '} {' '}
                        <AdaptablePopover cssClassName={cssClassName}  headerText={"Conditional Style: Whole Row"} bodyText={["The conditional style will be applied to alls cells in each matching row."]} MessageType={MessageType.Info} />
                    </Col>
                    <Col xs={12} className="ab_large_margin">
                        <Radio className={cssClassName + "__radiobutton"} inline value="Column" checked={this.state.ConditionalStyleScope == ConditionalStyleScope.Column} onChange={(e) => this.onScopeSelectChanged(e)}>Column</Radio>
                        {' '} {' '}
                        <AdaptablePopover  cssClassName={cssClassName} headerText={"Conditional Style: Single Column"} bodyText={["Pick the column from the list below which will have conditional style applied."]} MessageType={MessageType.Info} />
                    </Col>
                </AdaptableBlotterForm>
                <Col xs={12} className="ab_large_margin">
                    <ColumnSelector cssClassName={cssClassName} disabled={this.state.ConditionalStyleScope == ConditionalStyleScope.Row} SelectedColumnIds={[this.state.ColumnId]}
                        ColumnList={this.props.Columns}
                        onColumnChange={columns => this.onColumnSelectedChanged(columns)}
                        SelectionMode={SelectionMode.Single} />
                </Col>
            </Panel>
        </div>
    }



    private onColumnSelectedChanged(columns: IColumn[]) {
        this.setState({ ColumnId: columns.length > 0 ? columns[0].ColumnId : "" } as ConditionalStyleScopeWizardState, () => this.props.UpdateGoBackState())
    }

    private onScopeSelectChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (e.value == "Column") {
            this.setState({ ConditionalStyleScope: ConditionalStyleScope.Column } as ConditionalStyleScopeWizardState, () => this.props.UpdateGoBackState())
        } else {
            this.setState({ ConditionalStyleScope: ConditionalStyleScope.Row, ColumnId: "" } as ConditionalStyleScopeWizardState, () => this.props.UpdateGoBackState())
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

    public GetIndexStepIncrement() {
        return 1;
    }
    public GetIndexStepDecrement() {
        return 1;
    }
    public StepName = this.props.StepName
}


