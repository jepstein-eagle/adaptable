import * as React from 'react';

import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StyleVisualItem } from '../../Components/StyleVisualItem';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { ConditionalStyle } from '../../../PredefinedConfig/ConditionalStyleState';
import { KeyValuePair } from '../../../Utilities/Interface/KeyValuePair';
import StringExtensions from '../../../Utilities/Extensions/StringExtensions';

export interface ConditionalStyleSummaryWizardProps
  extends AdaptableWizardStepProps<ConditionalStyle> {}

export class ConditionalStyleSummaryWizard
  extends React.Component<ConditionalStyleSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: ConditionalStyleSummaryWizardProps) {
    super(props);
  }

  render(): any {
    let keyValuePairs: KeyValuePair[] = [
      { Key: 'Scope', Value: this.props.api.scopeApi.getScopeToString(this.props.data.Scope) },
      {
        Key: 'Condition',
        Value:
          StringExtensions.IsNotNullOrEmpty(this.props.data.Expression) ||
          StringExtensions.IsNotNullOrEmpty(this.props.data.SharedQueryId)
            ? this.props.api.queryApi.QueryObjectToString(this.props.data)
            : this.props.api.predicateApi.predicateToString(this.props.data.Predicate),
      },
      { Key: 'Exclude Grouped Rows', Value: this.getExcludedGroupedRows() },
      { Key: 'Style', Value: <StyleVisualItem Style={this.props.data.Style} /> },
      {
        Key: 'Query Type',
        Value: StringExtensions.IsNullOrEmpty(this.props.data.Expression) ? 'Shared' : 'Custom',
      },
    ];

    return (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.ConditionalStyleStrategyFriendlyName}
      />
    );
  }

  private getExcludedGroupedRows(): string {
    return this.props.data.ExcludeGroupedRows != null &&
      this.props.data.ExcludeGroupedRows != undefined &&
      this.props.data.ExcludeGroupedRows == true
      ? 'True'
      : 'False';
  }

  public canNext(): boolean {
    return true;
  }

  public canBack(): boolean {
    return true;
  }
  public next(): void {
    //
  }

  public back(): void {
    // todo
  }

  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
    return StringExtensions.IsNullOrEmpty(this.props.data.Expression) ||
      StringExtensions.IsNullOrEmpty(this.props.data.SharedQueryId)
      ? 2
      : 1;
  }
}
