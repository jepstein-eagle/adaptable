import * as React from 'react';

import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';

import { CalculatedColumn } from '../../../PredefinedConfig/RunTimeState/CalculatedColumnState';
import Panel from '../../../components/Panel';
import ErrorBox from '../../../components/ErrorBox';
import Textarea from '../../../components/Textarea';
import WizardPanel from '../../../components/WizardPanel';

export interface CalculatedColumnExpressionWizardProps
  extends AdaptableWizardStepProps<CalculatedColumn> {
  IsExpressionValid: (expression: string) => void;
  GetErrorMessage: () => string;
}
export interface CalculatedColumnExpressionWizardState {
  ColumnExpression: string;
}

export class CalculatedColumnExpressionWizard
  extends React.Component<
    CalculatedColumnExpressionWizardProps,
    CalculatedColumnExpressionWizardState
  >
  implements AdaptableWizardStep {
  constructor(props: CalculatedColumnExpressionWizardProps) {
    super(props);
    this.state = { ColumnExpression: this.props.Data.ColumnExpression };
  }
  render(): any {
    let validationState: 'error' | null = StringExtensions.IsNullOrEmpty(
      this.props.GetErrorMessage()
    )
      ? null
      : 'error';

    return (
      <WizardPanel header="Calculated Column Expression" borderRadius="none" border="none">
        <Textarea
          value={this.state.ColumnExpression}
          placeholder="Enter expression"
          autoFocus
          onChange={(e: React.SyntheticEvent) => this.handleExpressionChange(e)}
          style={{ width: '100%' }}
        ></Textarea>

        {validationState ? <ErrorBox marginTop={2}>{this.props.GetErrorMessage()}</ErrorBox> : null}
      </WizardPanel>
    );
  }

  handleExpressionChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.props.IsExpressionValid(e.value);
    this.setState({ ColumnExpression: e.value }, () => this.props.UpdateGoBackState());
  }

  public canNext(): boolean {
    return (
      StringExtensions.IsNotNullOrEmpty(this.state.ColumnExpression) &&
      StringExtensions.IsNullOrEmpty(this.props.GetErrorMessage())
    );
  }
  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.ColumnExpression = this.state.ColumnExpression;
  }
  public Back(): void {
    //todo
  }
  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
