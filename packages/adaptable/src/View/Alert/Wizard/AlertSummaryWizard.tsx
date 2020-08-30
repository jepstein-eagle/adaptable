import * as React from 'react';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { KeyValuePair } from '../../../Utilities/Interface/KeyValuePair';
import { AlertDefinition } from '../../../PredefinedConfig/AlertState';
import StringExtensions from '../../../Utilities/Extensions/StringExtensions';

export interface AlertSummaryWizardProps extends AdaptableWizardStepProps<AlertDefinition> {}

export class AlertSummaryWizard extends React.Component<AlertSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: AlertSummaryWizardProps) {
    super(props);
  }

  render(): any {
    let alertDefinition: AlertDefinition = this.props.data as AlertDefinition;
    let keyValuePairs: KeyValuePair[] = [
      {
        Key: 'Column',
        Value: this.props.api.columnApi.getFriendlyNameFromColumnId(alertDefinition.ColumnId),
      },
      {
        Key: 'Rule',
        Value: this.props.api.internalApi
          .getStrategyService()
          .createAlertDescription(alertDefinition, this.props.api.columnApi.getColumns()),
      },
      { Key: 'Alert Type', Value: alertDefinition.MessageType },
      {
        Key: 'Show Popup',
        Value: alertDefinition.AlertProperties.ShowPopup ? 'True' : 'False',
      },
      {
        Key: 'Highlight Cell',
        Value: alertDefinition.AlertProperties.HighlightCell ? 'True' : 'False',
      },
      {
        Key: 'Query',
        Value: this.setExpressionDescription(this.props.data),
      },
    ];

    return (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.AlertStrategyFriendlyName}
      />
    );
  }

  private setExpressionDescription(alert: AlertDefinition): string {
    let expression = this.props.api.queryApi.getExpressionForQueryObject(alert);
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
