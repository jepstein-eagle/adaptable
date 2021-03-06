import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import WizardPanel from '../../../components/WizardPanel';
import { AdaptableScope } from '../../../PredefinedConfig/Common/AdaptableScope';
import { ScopeComponent } from '../../Components/ScopeComponent';
import ArrayExtensions from '../../../Utilities/Extensions/ArrayExtensions';
import { WizardScopeState } from '../../Components/SharedProps/WizardScopeState';
import { Report } from '../../../PredefinedConfig/ExportState';

export interface ReportScopeWizardProps extends AdaptableWizardStepProps<Report> {}

export class ReportScopeWizard extends React.Component<ReportScopeWizardProps, WizardScopeState>
  implements AdaptableWizardStep {
  constructor(props: ReportScopeWizardProps) {
    super(props);

    this.state = {
      scope: this.props.data.Scope ? this.props.data.Scope : { All: true },
    };
  }

  render(): any {
    return (
      <WizardPanel data-name="scope-container" bodyProps={{ padding: 0 }}>
        {' '}
        <ScopeComponent
          api={this.props.api}
          scope={this.state.scope}
          updateScope={(scope: AdaptableScope) => this.onUpdateScope(scope)}
        />{' '}
      </WizardPanel>
    );
  }

  private onUpdateScope(scope: AdaptableScope) {
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
