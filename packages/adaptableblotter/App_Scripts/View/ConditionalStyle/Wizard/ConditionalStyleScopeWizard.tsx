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
import {  IColumnCategory } from "../../../Core/Interface/Interfaces";
import { ArrayExtensions } from "../../../Core/Extensions/ArrayExtensions";

export interface ConditionalStyleScopeWizardProps extends AdaptableWizardStepProps<IConditionalStyle> {
    Columns: Array<IColumn>
    ColumnCategories: Array<IColumnCategory>
}

export interface ConditionalStyleScopeWizardState {
    ColumnId: string;
    ColumnCategoryId: string;
    ConditionalStyleScope: ConditionalStyleScope;
}


export class ConditionalStyleScopeWizard extends React.Component<ConditionalStyleScopeWizardProps, ConditionalStyleScopeWizardState> implements AdaptableWizardStep {

    constructor(props: ConditionalStyleScopeWizardProps) {
        super(props)
        this.state = {
            ColumnId: StringExtensions.IsNull( this.props.Data.ColumnId)? "": this.props.Data.ColumnId,
            ColumnCategoryId:StringExtensions.IsNull( this.props.Data.ColumnCategoryId)? "": this.props.Data.ColumnCategoryId,
            ConditionalStyleScope: this.props.Data.ConditionalStyleScope as ConditionalStyleScope,
        }
    }

    render(): any {
        let cssClassName: string = this.props.cssClassName + "-scope"

        let optionColumnCategorys = this.props.ColumnCategories.map(cc => {
            return <option value={cc.ColumnCategoryId} key={cc.ColumnCategoryId}>{cc.ColumnCategoryId}</option>
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
                {ArrayExtensions.IsNotNullOrEmpty(this.props.ColumnCategories) &&
                    <Col xs={12} className="ab_large_margin">
                        <Radio className={cssClassName + "__radiobutton"} inline value="ColumnCategory" checked={this.state.ConditionalStyleScope == ConditionalStyleScope.ColumnCategory} onChange={(e) => this.onScopeSelectChanged(e)}>Column Category</Radio>
                        {' '} {' '}
                        <AdaptablePopover cssClassName={cssClassName} headerText={"Conditional Style: Column Categorys"} bodyText={["Pick the Column Category from the list below to apply the conditional style to all Column Categorys."]} MessageType={MessageType.Info} />
                    </Col>
                }
                {ArrayExtensions.IsNotNullOrEmpty(this.props.ColumnCategories) && this.state.ConditionalStyleScope == ConditionalStyleScope.ColumnCategory &&
                    <Col xs={12} className="ab_large_margin">
                        <FormControl componentClass="select" placeholder="select" value={this.state.ColumnCategoryId} onChange={(x) => this.onColumnCategorySelectedChanged(x)} >
                            <option value="select" key="select">Select a Column Category group</option>
                            {optionColumnCategorys}
                        </FormControl>
                    </Col>
                }
            </Panel>
        </div>
    }

    private onColumnSelectedChanged(columns: IColumn[]) {
        this.setState({ ColumnId: columns.length > 0 ? columns[0].ColumnId : "" } as ConditionalStyleScopeWizardState, () => this.props.UpdateGoBackState())
    }

    private onColumnCategorySelectedChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ ColumnCategoryId: e.value } as ConditionalStyleScopeWizardState, () => this.props.UpdateGoBackState())
    }

    private onScopeSelectChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (e.value == "Column") {
            this.setState({ ConditionalStyleScope: ConditionalStyleScope.Column } as ConditionalStyleScopeWizardState, () => this.props.UpdateGoBackState())
        } else if (e.value == "ColumnCategory") {
            this.setState({ ConditionalStyleScope: ConditionalStyleScope.ColumnCategory } as ConditionalStyleScopeWizardState, () => this.props.UpdateGoBackState())
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
        if (this.state.ConditionalStyleScope == ConditionalStyleScope.ColumnCategory && StringExtensions.IsEmpty(this.state.ColumnCategoryId)) {
            return false;
        }
        return true;
    }

    public canBack(): boolean { return false; }
    public Next(): void {
        this.props.Data.ColumnId = this.state.ColumnId;
        this.props.Data.ColumnCategoryId = this.state.ColumnCategoryId;
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


