import * as React from "react";
import { Radio, FormGroup, FormControl, Button, Form, Row, Col, Panel, Well, Checkbox, HelpBlock } from 'react-bootstrap';
import { IColumn } from '../../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../../Wizard/Interface/IAdaptableWizard'
import { ICellValidationRule } from '../../../Strategy/Interface/ICellValidationStrategy';
import { IRangeExpression } from '../../../Core/Interface/IExpression';
import { DataType, CellValidationMode, LeafExpressionOperator, PopoverType } from '../../../Core/Enums';
import { StringExtensions } from '../../../Core/Extensions/StringExtensions';
import { AdaptableBlotterForm } from '../../AdaptableBlotterForm'
import { AdaptablePopover } from '../../AdaptablePopover';

export interface CellValidationSelectQueryWizardProps extends AdaptableWizardStepProps<ICellValidationRule> {
    Columns: Array<IColumn>
}
export interface CellValidationSelectQueryWizardState {
    HasExpression: boolean;
}

export class CellValidationSelectQueryWizard extends React.Component<CellValidationSelectQueryWizardProps, CellValidationSelectQueryWizardState> implements AdaptableWizardStep {
    constructor(props: CellValidationSelectQueryWizardProps) {
        super(props)
        this.state = {
            HasExpression: this.props.Data.HasExpression,
        }
    }

    public componentDidMount() {
        // would rather not but only way I can see to force page to show Finish (which is default)
        this.props.UpdateGoBackState(this.state.HasExpression == false);
    }

    render(): any {

        return <div>
            <Panel header="Cell Validation Query" bsStyle="primary">

                <AdaptableBlotterForm inline >
                    <Col xs={12}>
                        <HelpBlock>A Query is used if the rule is dependent on other values in the row.<br />The rule will only be activated and checked if the Query passes.</HelpBlock>
                    </Col>
                    <Col xs={12}>
                        <Checkbox inline onChange={(e) => this.onOtherExpressionOptionChanged(e)} checked={this.state.HasExpression}>Use Validation Query</Checkbox>
                        {' '}<AdaptablePopover headerText={"Validation Rule: Query"} bodyText={["Create a query (in next step) which will stipulate other cell values required for the Rule."]} popoverType={PopoverType.Info} />
                    </Col>
                </AdaptableBlotterForm>

            </Panel>
        </div>

    }



    private onOtherExpressionOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ HasExpression: e.checked } as CellValidationSelectQueryWizardState, () => this.props.UpdateGoBackState(e.checked == false))
    }



    public canNext(): boolean {
        return true;
    }

    public canBack(): boolean { return true; }
    public Next(): void {
        this.props.Data.HasExpression = this.state.HasExpression;
    }

    public Back(): void { }
    public StepName = this.props.StepName
}


let divStyle = {
    margin: '10px'
}

