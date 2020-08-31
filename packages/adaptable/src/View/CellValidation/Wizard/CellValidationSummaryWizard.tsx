import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { CellValidationRule } from '../../../PredefinedConfig/CellValidationState';
import { KeyValuePair } from '../../../Utilities/Interface/KeyValuePair';
import StringExtensions from '../../../Utilities/Extensions/StringExtensions';

export interface CellValidationSummaryWizardProps
  extends AdaptableWizardStepProps<CellValidationRule> {}

export class CellValidationSummaryWizard
  extends React.Component<CellValidationSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: CellValidationSummaryWizardProps) {
    super(props);
  }

  render(): any {
    let keyValuePairs: KeyValuePair[] = [
      {
        Key: 'Scope',
        Value: this.props.api.scopeApi.getScopeToString(this.props.data.Scope),
      },
      { Key: 'Mode', Value: this.props.data.ActionMode },
      {
        Key: 'Rule',
        Value: this.props.api.internalApi
          .getValidationService()
          .createCellValidationDescription(this.props.data),
      },
      {
        Key: 'Query',
        Value: this.setExpressionDescription(this.props.data),
      },
    ];

    return (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.CellValidationStrategyFriendlyName}
      />
    );
  }

  private setExpressionDescription(cellValidation: CellValidationRule): string {
    let expression = this.props.api.queryApi.getExpressionForQueryObject(cellValidation);
    return expression ? expression : 'No Expression';
  }

  public canNext(): boolean {
    return true;
  }

  public canBack(): boolean {
    return true;
  }
  public next(): void {
    /* no implementation */
  }

  public back(): void {
    /* no implementation */
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
