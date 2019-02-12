import * as React from "react";
import { Panel, FormGroup, FormControl, HelpBlock } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { ICalculatedColumn } from "../../../Utilities/Interface/BlotterObjects/ICalculatedColumn";

export interface CalculatedColumnExpressionWizardProps extends AdaptableWizardStepProps<ICalculatedColumn> {
    IsExpressionValid: (expression: string) => void
    GetErrorMessage: () => string
}
export interface CalculatedColumnExpressionWizardState {
    ColumnExpression: string
}

export class CalculatedColumnExpressionWizard extends React.Component<CalculatedColumnExpressionWizardProps, CalculatedColumnExpressionWizardState> implements AdaptableWizardStep {
    constructor(props: CalculatedColumnExpressionWizardProps) {
        super(props);
        this.state = { ColumnExpression: this.props.Data.ColumnExpression }
    }
    render(): any {
        let validationState: "error" | null = StringExtensions.IsNullOrEmpty(this.props.GetErrorMessage()) ? null : "error"
        let cssClassName: string = this.props.cssClassName + "-expression"
       
       return <div className={cssClassName}>
            <Panel header="Calculated Column Expression" bsStyle="primary">
                <AdaptableBlotterForm>
                    <FormGroup controlId="formInlineName" validationState={validationState}>
                        <FormControl value={this.state.ColumnExpression} componentClass="textarea" placeholder="Enter expression" onChange={(e) => this.handleExpressionChange(e)} />
                        <FormControl.Feedback />
                        <HelpBlock>{this.props.GetErrorMessage()}</HelpBlock>
                    </FormGroup>
                </AdaptableBlotterForm>
            </Panel>
        </div>
    }

    handleExpressionChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.IsExpressionValid(e.value)
        this.setState({ ColumnExpression: e.value }, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean {
        return StringExtensions.IsNotNullOrEmpty(this.state.ColumnExpression)
            && StringExtensions.IsNullOrEmpty(this.props.GetErrorMessage());
    }
    public canBack(): boolean { return true; }
    public Next(): void { this.props.Data.ColumnExpression = this.state.ColumnExpression }
    public Back(): void {  //todo
    }
    public GetIndexStepIncrement() {
        return 1;
    }
    public GetIndexStepDecrement() {
        return 1;
    }
   
}