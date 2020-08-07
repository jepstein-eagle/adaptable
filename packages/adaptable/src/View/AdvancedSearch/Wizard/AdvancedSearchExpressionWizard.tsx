import * as React from 'react';

import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import Panel from '../../../components/Panel';
import Input from '../../../components/Input';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';

import { AdvancedSearch } from '../../../PredefinedConfig/AdvancedSearchState';
import { ArrayExtensions } from '../../../Utilities/Extensions/ArrayExtensions';

import { Flex, Box } from 'rebass';
import ErrorBox from '../../../components/ErrorBox';
import WizardPanel from '../../../components/WizardPanel';

export interface AdvancedSearchExpressionWizardProps
  extends AdaptableWizardStepProps<AdvancedSearch> {}

export interface AdvancedSearchExpressionWizardState {
  NewExpression: string;
}

export class AdvancedSearchExpressionWizard
  extends React.Component<AdvancedSearchExpressionWizardProps, AdvancedSearchExpressionWizardState>
  implements AdaptableWizardStep {
  constructor(props: AdvancedSearchExpressionWizardProps) {
    super(props);
    this.state = {
      NewExpression: props.Data.NewExpression,
    };
  }
  render(): any {
    return (
      <textarea
        value={this.state.NewExpression}
        onChange={event => this.setState({ NewExpression: event.target.value })}
      />
    );
  }

  public canNext(): boolean {
    return true;
  }

  public canBack(): boolean {
    return true;
  }

  public Next(): void {
    this.props.Data.NewExpression = this.state.NewExpression;
  }

  public Back(): void {
    // todo
  }

  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
