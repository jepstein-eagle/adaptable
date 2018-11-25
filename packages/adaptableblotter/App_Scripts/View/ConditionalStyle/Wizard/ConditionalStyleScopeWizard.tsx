import * as React from "react";
import { Radio, Col, Panel, FormControl } from 'react-bootstrap';
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { ConditionalStyleScope, SelectionMode, MessageType } from '../../../Core/Enums';
import { StringExtensions } from '../../../Core/Extensions/StringExtensions';
import { AdaptablePopover } from '../../AdaptablePopover';
import { ColumnSelector } from "../../Components/Selectors/ColumnSelector";
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { IConditionalStyle } from "../../../Core/Api/Interface/IAdaptableBlotterObjects";
import {  ILinkedColumn } from "../../../Core/Interface/Interfaces";
import { ArrayExtensions } from "../../../Core/Extensions/ArrayExtensions";

export interface ConditionalStyleScopeWizardProps extends AdaptableWizardStepProps<IConditionalStyle> {
    Columns: Array<IColumn>
    LinkedColumns: Array<ILinkedColumn>
}

export interface ConditionalStyleScopeWizardState {
    ColumnId: string;
    LinkedColumnId: string;
    ConditionalStyleScope: ConditionalStyleScope;
}


export class ConditionalStyleScopeWizard extends React.Component<ConditionalStyleScopeWizardProps, ConditionalStyleScopeWizardState> implements AdaptableWizardStep {

    constructor(props: ConditionalStyleScopeWizardProps) {
        super(props)
        this.state = {
            ColumnId: StringExtensions.IsNull( this.props.Data.ColumnId)? "": this.props.Data.ColumnId,
            LinkedColumnId:StringExtensions.IsNull( this.props.Data.LinkedColumnId)? "": this.props.Data.LinkedColumnId,
            ConditionalStyleScope: this.props.Data.ConditionalStyleScope as ConditionalStyleScope,
        }
    }

    render(): any {
        let cssClassName: string = this.props.cssClassName + "-scope"

        let optionLinkedColumns = this.props.LinkedColumns.map(cc => {
            return <option value={cc.LinkedColumnId} key={cc.LinkedColumnId}>{cc.LinkedColumnId}</option>
        })

        return <div className={cssClassName}>
            <Panel header="Select Where the Conditional Style is Applied" bsStyle="primary">
                <AdaptableBlotterForm inline>
                    <Col xs={12} className="ab_large_margin">
                        <Radio className={cssClassName + "__radiobutton"} inline value="Row" checked={this.state.ConditionalStyleScope == ConditionalStyleScope.Row} onChange={(e) => this.onScopeSelectChanged(e)}>Whole Row</Radio>
                        {' '} {' '}
                        <AdaptablePopover cssClassName={cssClassName} headerText={"Conditional Style: Whole Row"} bodyText={["The conditional style will be applied to alls cells in each matching row."]} MessageType={MessageType.Info} />
                    </Col>
                    <Col xs={12} className="ab_large_margin">
                        <Radio className={cssClassName + "__radiobutton"} inline value="Column" checked={this.state.ConditionalStyleScope == ConditionalStyleScope.Column} onChange={(e) => this.onScopeSelectChanged(e)}>Column</Radio>
                        {' '} {' '}
                        <AdaptablePopover cssClassName={cssClassName} headerText={"Conditional Style: Single Column"} bodyText={["Pick the column from the list below which will have conditional style applied."]} MessageType={MessageType.Info} />
                    </Col>
                </AdaptableBlotterForm>
                {this.state.ConditionalStyleScope == ConditionalStyleScope.Column &&
                    <Col xs={12} className="ab_large_margin">
                        <ColumnSelector cssClassName={cssClassName} SelectedColumnIds={[this.state.ColumnId]}
                            ColumnList={this.props.Columns}
                            onColumnChange={columns => this.onColumnSelectedChanged(columns)}
                            SelectionMode={SelectionMode.Single} />
                    </Col>
                }
                {ArrayExtensions.IsNotNullOrEmpty(this.props.LinkedColumns) &&
                    <Col xs={12} className="ab_large_margin">
                        <Radio className={cssClassName + "__radiobutton"} inline value="LinkedColumn" checked={this.state.ConditionalStyleScope == ConditionalStyleScope.LinkedColumn} onChange={(e) => this.onScopeSelectChanged(e)}>Linked Columns</Radio>
                        {' '} {' '}
                        <AdaptablePopover cssClassName={cssClassName} headerText={"Conditional Style: Linked Columns"} bodyText={["Pick the linked column from the list below to apply the conditional style to all linked columns."]} MessageType={MessageType.Info} />
                    </Col>
                }
                {ArrayExtensions.IsNotNullOrEmpty(this.props.LinkedColumns) && this.state.ConditionalStyleScope == ConditionalStyleScope.LinkedColumn &&
                    <Col xs={12} className="ab_large_margin">
                        <FormControl componentClass="select" placeholder="select" value={this.state.LinkedColumnId} onChange={(x) => this.onLinkedColumnSelectedChanged(x)} >
                            <option value="select" key="select">Select Linked Columns</option>
                            {optionLinkedColumns}
                        </FormControl>
                    </Col>
                }
            </Panel>
        </div>
    }

    private onColumnSelectedChanged(columns: IColumn[]) {
        this.setState({ ColumnId: columns.length > 0 ? columns[0].ColumnId : "" } as ConditionalStyleScopeWizardState, () => this.props.UpdateGoBackState())
    }

    private onLinkedColumnSelectedChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ LinkedColumnId: e.value } as ConditionalStyleScopeWizardState, () => this.props.UpdateGoBackState())
    }

    private onScopeSelectChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (e.value == "Column") {
            this.setState({ ConditionalStyleScope: ConditionalStyleScope.Column } as ConditionalStyleScopeWizardState, () => this.props.UpdateGoBackState())
        } else if (e.value == "LinkedColumn") {
            this.setState({ ConditionalStyleScope: ConditionalStyleScope.LinkedColumn } as ConditionalStyleScopeWizardState, () => this.props.UpdateGoBackState())
        } else {
            this.setState({ ConditionalStyleScope: ConditionalStyleScope.Row, ColumnId: "" } as ConditionalStyleScopeWizardState, () => this.props.UpdateGoBackState())
        }
    }

    public canNext(): boolean {

        if (!this.state.ConditionalStyleScope == null) {
            return false;
        }
        if (this.state.ConditionalStyleScope == ConditionalStyleScope.Column && StringExtensions.IsEmpty(this.state.ColumnId)) {
            return false;
        }
        if (this.state.ConditionalStyleScope == ConditionalStyleScope.LinkedColumn && StringExtensions.IsEmpty(this.state.LinkedColumnId)) {
            return false;
        }
        return true;
    }

    public canBack(): boolean { return false; }
    public Next(): void {
        this.props.Data.ColumnId = this.state.ColumnId;
        this.props.Data.LinkedColumnId = this.state.LinkedColumnId;
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


