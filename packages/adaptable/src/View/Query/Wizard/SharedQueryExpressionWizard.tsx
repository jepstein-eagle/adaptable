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
    this.state = { Expression: this.props.data.Expression };
  }
  render(): any {
    const firstNode = this.props.api.gridApi.getFirstRowNode();
    const initialData = firstNode ? firstNode.data : {};

    return (
      <ExpressionEditor
        value={this.state.Expression}
        onChange={(e: React.SyntheticEvent) => this.handleExpressionChange(e)}
        initialData={initialData}
        columns={this.props.api.columnApi.getColumns()}
        functions={defaultFunctions}
        api={this.props.api}
      />
    );
    /* {validationState ? (
        <ErrorBox marginTop={2}>{this.props.GetErrorMessage()}</ErrorBox>
      ) : null} */
  }

  handleExpressionChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ Expression: e.value }, () => this.props.updateGoBackState());
  }

  public canNext(): boolean {
    // TODO: validate expression
    return StringExtensions.IsNotNullOrEmpty(this.state.Expression);
  }
  public canBack(): boolean {
    return true;
  }
  public next(): void {
    this.props.data.Expression = this.state.Expression;
  }
  public back(): void {
    //todo
  }
  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
    return 1;
  }
}
