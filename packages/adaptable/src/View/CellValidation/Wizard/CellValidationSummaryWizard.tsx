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
        Key: 'Column',
        Value: this.props.Api.columnApi.getFriendlyNameFromColumnId(this.props.Data.ColumnId),
      },
      { Key: 'Mode', Value: this.props.Data.ActionMode },
      {
        Key: 'Rule',
        Value: this.props.Api.internalApi
          .getValidationService()
          .createCellValidationDescription(this.props.Data, this.props.Api.columnApi.getColumns()),
      },
      {
        Key: 'Query',
        Value: this.setExpressionDescription(this.props.Data),
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
    let expression = this.props.Api.queryApi.getExpressionForQueryObject(cellValidation);
    return expression ? expression : 'No Expression';
  }

  public canNext(): boolean {
    return true;
  }

  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    /* no implementation */
  }

  public Back(): void {
    /* no implementation */
  }

  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return StringExtensions.IsNullOrEmpty(this.props.Data.Expression) ||
      StringExtensions.IsNullOrEmpty(this.props.Data.SharedQueryId)
      ? 2
      : 1;
  }
}
