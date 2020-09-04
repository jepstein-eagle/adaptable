import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { ConditionalStyle } from '../../../PredefinedConfig/ConditionalStyleState';
import WizardPanel from '../../../components/WizardPanel';
import { Scope } from '../../../PredefinedConfig/Common/Scope';
import { ScopeComponent } from '../../Components/ScopeComponent';
import ArrayExtensions from '../../../Utilities/Extensions/ArrayExtensions';
import { WizardScopeState } from '../../Components/SharedProps/WizardScopeState';
import { Box } from 'rebass';
import HelpBlock from '../../../components/HelpBlock';
import CheckBox from '../../../components/CheckBox';

export interface ConditionalStyleScopeWizardProps
  extends AdaptableWizardStepProps<ConditionalStyle> {}

export interface ConditionalStyleScopeWizardState extends WizardScopeState {
  ExcludeGroupedRows: boolean;
}

export class ConditionalStyleScopeWizard
  extends React.Component<ConditionalStyleScopeWizardProps, ConditionalStyleScopeWizardState>
  implements AdaptableWizardStep {
  constructor(props: ConditionalStyleScopeWizardProps) {
    super(props);
    console.log('style scope', this.props.data.Scope);
    this.state = {
      scope: this.props.data.Scope ? this.props.data.Scope : undefined,
      ExcludeGroupedRows: this.props.data.ExcludeGroupedRows,
    };
  }

  render(): any {
    return (
      <WizardPanel>
        {' '}
        <ScopeComponent
          api={this.props.api}
          scope={this.state.scope}
          updateScope={(scope: Scope) => this.onUpdateScope(scope)}
        />{' '}
        <Box marginLeft={3} marginTop={2}>
          <HelpBlock marginBottom={2}>
            Exclude any cells in a Grouped Row when applying the Conditional Style
          </HelpBlock>

          <CheckBox
            onChange={(checked: boolean) => this.onExludeGroupedRowsChanged(checked)}
            checked={this.state.ExcludeGroupedRows}
          >
            Exclude Grouped Rows
          </CheckBox>
        </Box>
      </WizardPanel>
    );
  }
  private onExludeGroupedRowsChanged(checked: boolean) {
    this.setState({ ExcludeGroupedRows: checked } as ConditionalStyleScopeWizardState, () =>
      this.props.updateGoBackState()
    );
  }

  private onUpdateScope(scope: Scope) {
    this.setState({ scope: scope } as WizardScopeState, () => this.props.updateGoBackState());
  }

  public canNext(): boolean {
    if (this.state.scope == undefined) {
      return false;
    }
    if (
      'ColumnIds' in this.state.scope &&
      ArrayExtensions.IsNullOrEmpty(this.props.api.scopeApi.getColumnIdsInScope(this.state.scope))
    ) {
      return false;
    }
    if (
      'DataTypes' in this.state.scope &&
      ArrayExtensions.IsNullOrEmpty(this.props.api.scopeApi.getDataTypesInScope(this.state.scope))
    ) {
      return false;
    }
    return true;
  }

  public canBack(): boolean {
    return false;
  }
  public next(): void {
    this.props.data.Scope = this.state.scope;
    this.props.data.ExcludeGroupedRows = this.state.ExcludeGroupedRows;
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
