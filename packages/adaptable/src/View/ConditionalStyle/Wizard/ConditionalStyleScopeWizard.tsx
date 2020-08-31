import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { ConditionalStyle } from '../../../PredefinedConfig/ConditionalStyleState';
import { Box, Flex } from 'rebass';
import Radio from '../../../components/Radio';
import WizardPanel from '../../../components/WizardPanel';
import HelpBlock from '../../../components/HelpBlock';
import CheckBox from '../../../components/CheckBox';
import { ScopeDataType, Scope } from '../../../PredefinedConfig/Common/Scope';
import { DualListBoxEditor, DisplaySize } from '../../Components/ListBox/DualListBoxEditor';
import Panel from '../../../components/Panel';
import { ScopeComponent } from '../../Components/ScopeComponent';
import ArrayExtensions from '../../../Utilities/Extensions/ArrayExtensions';

export interface ConditionalStyleScopeWizardProps
  extends AdaptableWizardStepProps<ConditionalStyle> {}

export interface ConditionalStyleScopeWizardState {
  Scope: Scope;
}

export class ConditionalStyleScopeWizard
  extends React.Component<ConditionalStyleScopeWizardProps, ConditionalStyleScopeWizardState>
  implements AdaptableWizardStep {
  constructor(props: ConditionalStyleScopeWizardProps) {
    super(props);

    this.state = {
      Scope: this.props.data.Scope,
    };
  }

  render(): any {
    return (
      <WizardPanel>
        {' '}
        <ScopeComponent
          api={this.props.api}
          scope={this.props.data.Scope}
          updateScope={(scope: Scope) => this.onUpdateScope(scope)}
        />{' '}
      </WizardPanel>
    );
  }

  private onUpdateScope(scope: Scope) {
    console.log('scope received', scope);
    this.setState({ Scope: scope } as ConditionalStyleScopeWizardState, () =>
      this.props.updateGoBackState()
    );
  }

  public canNext(): boolean {
    if (this.state.Scope == undefined) {
      return false;
    }
    if (
      'ColumnIds' in this.state.Scope &&
      ArrayExtensions.IsNullOrEmpty(this.props.api.scopeApi.getColumnIdsInScope(this.state.Scope))
    ) {
      return false;
    }
    if (
      'DataTypes' in this.state.Scope &&
      ArrayExtensions.IsNullOrEmpty(this.props.api.scopeApi.getDataTypesInScope(this.state.Scope))
    ) {
      return false;
    }
    return true;
  }

  public canBack(): boolean {
    return false;
  }
  public next(): void {
    this.props.data.Scope = this.state.Scope;
  }

  public back(): void {
    // todo
  }

  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
    return 1;
  }
}
