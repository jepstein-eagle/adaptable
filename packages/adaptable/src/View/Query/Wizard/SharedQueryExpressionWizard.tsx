import * as React from 'react';

import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { SharedQuery } from '../../../PredefinedConfig/QueryState';
import { DataType } from '../../../PredefinedConfig/Common/Enums';
import { defaultFunctions } from '../../../parser/src';
import ExpressionEditor from '../../../components/ExpressionEditor';

export interface SharedQueryExpressionWizardProps extends AdaptableWizardStepProps<SharedQuery> {}

export interface SharedQueryExpressionWizardState {
  Expression: string;
}

export class SharedQueryExpressionWizard
  extends React.Component<SharedQueryExpressionWizardProps, SharedQueryExpressionWizardState>
  implements AdaptableWizardStep {
  constructor(props: SharedQueryExpressionWizardProps) {
    super(props);
    this.state = { Expression: this.props.Data.Expression };
  }
  render(): any {
    const firstRow = this.props.Api.gridApi.getFirstRowNode().data;

    return (
      <ExpressionEditor
        value={this.state.Expression}
        onChange={(e: React.SyntheticEvent) => this.handleExpressionChange(e)}
        initialData={firstRow}
        columns={this.props.Api.columnApi.getColumns()}
        functions={defaultFunctions}
      />
    );
    /* {validationState ? (
        <ErrorBox marginTop={2}>{this.props.GetErrorMessage()}</ErrorBox>
      ) : null} */
  }

  handleExpressionChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ Expression: e.value }, () => this.props.UpdateGoBackState());
  }

  public canNext(): boolean {
    // TODO: validate expression
    return StringExtensions.IsNotNullOrEmpty(this.state.Expression);
  }
  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.Expression = this.state.Expression;
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
