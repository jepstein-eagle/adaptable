/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { ControlLabel, Radio, FormGroup, FormControl, Button, Form, Col, Panel, ListGroup, Row, ButtonGroup, Jumbotron, ListGroupItem } from 'react-bootstrap';
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { IConditionalStyleCondition } from '../../Core/interface/IConditionalStyleStrategy';
import { ConditionalStyleScope, ColumnType, LeafExpressionOperator, SortOrder, SelectionMode, PopoverType } from '../../Core/Enums';
import { Expression } from '../../Core/Expression/Expression';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { UserFilterState } from '../../Redux/ActionsReducers/Interface/IState';
import { ColorPicker } from '../ColorPicker';
import { Helper } from '../../Core/Helper'
import { SingleListBox } from '../SingleListBox'
import { StringExtensions } from '../../Core/Extensions';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { AdaptablePopover } from '../AdaptablePopover';

interface ConditionalStyleColumnWizardProps extends AdaptableWizardStepProps<IConditionalStyleCondition> {
    Columns: Array<IColumn>
}

interface ConditionalStyleColumnWizardState {
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

        let selectedColumnValues: string[] = StringExtensions.IsNullOrEmpty(this.state.ColumnId) ? [] : [this.state.ColumnId];

        return <div>
            <Panel header="Select Where the Conditional Style is Applied" bsStyle="primary">

                <AdaptableBlotterForm inline>
                    <Col xs={12} style={radioMarginStyle}>
                        <Radio value="Column" checked={this.state.ConditionalStyleScope == ConditionalStyleScope.Column} onChange={(e) => this.onScopeSelectChanged(e)}> Single Column </Radio>
                             {' '}<AdaptablePopover headerText={"Conditional Style: Column"} bodyText={"Pick the column from the list below which will have conditional style applied."} popoverType={PopoverType.Info} />
                   </Col>
                    <Col xs={12} style={radioMarginStyle}>
                        <Radio value="Row" checked={this.state.ConditionalStyleScope == ConditionalStyleScope.Row} onChange={(e) => this.onScopeSelectChanged(e)}> Entire Row </Radio>
                              {' '}<AdaptablePopover headerText={"Conditional Style: Row"} bodyText={"The conditional style will be applied to every cell in a matching row."} popoverType={PopoverType.Info} />
                    </Col>
                     <Col xs={12} style={radioMarginStyle}>
                     </Col>
                </AdaptableBlotterForm>


                {this.state.ConditionalStyleScope == ConditionalStyleScope.Column &&

                    <SingleListBox style={divStyle}
                        Values={this.props.Columns}
                        UiSelectedValues={selectedColumnValues}
                        DisplayMember="FriendlyName"
                        ValueMember="ColumnId"
                        SortMember="FriendlyName"
                        onSelectedChange={(list) => this.onColumnSelectedChanged(list)}
                        SelectionMode={SelectionMode.Single}>
                    </SingleListBox>
                }


            </Panel>
        </div>
    }



    private onColumnSelectedChanged(selectedColumnValues: Array<any>) {
        this.setState({ ColumnId: selectedColumnValues[0] } as ConditionalStyleColumnWizardState, () => this.props.UpdateGoBackState())
    }

    private onScopeSelectChanged(event: React.FormEvent) {
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

    public Back(): void { }
    public StepName = "Conditional Style Scope"
}

let divStyle = {
    'overflowY': 'auto',
    'height': '300px',
    'marginBottom': '0',
    'marginLeft': '0px'
}


let radioMarginStyle = {
    margin: '5px'
}


let noMarginStyle = {
    margin: '0px'
}