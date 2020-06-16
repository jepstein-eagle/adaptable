import * as React from 'react';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { ExpressionHelper } from '../../../Utilities/Helpers/ExpressionHelper';
import { KeyValuePair } from '../../../Utilities/Interface/KeyValuePair';
import { AlertDefinition } from '../../../PredefinedConfig/AlertState';
import { UserFilter } from '../../../PredefinedConfig/UserFilterState';

export interface AlertSummaryWizardProps extends AdaptableWizardStepProps<AlertDefinition> {}

export class AlertSummaryWizard extends React.Component<AlertSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: AlertSummaryWizardProps) {
    super(props);
  }

  render(): any {
    let alertDefinition: AlertDefinition = this.props.Data as AlertDefinition;
    let keyValuePairs: KeyValuePair[] = [
      {
        Key: 'Column',
        Value: this.props.Api.gridApi.getFriendlyNameFromColumnId(alertDefinition.ColumnId),
      },
      {
        Key: 'Rule',
        Value: this.props.Api.internalApi
          .getStrategyService()
          .createAlertDescription(alertDefinition, this.props.Api.gridApi.getColumns()),
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
        Value: ExpressionHelper.IsNotNullOrEmptyExpression(alertDefinition.Expression)
          ? ExpressionHelper.ConvertExpressionToString(alertDefinition.Expression, this.props.Api)
          : 'None',
      },
    ];

    return (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.AlertStrategyFriendlyName}
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
    /* no implementation */
  }

  public Back(): void {
    /* no implementation */
  }

  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    let alertDefinition: AlertDefinition = this.props.Data as AlertDefinition;
    return ExpressionHelper.IsNullOrEmptyExpression(alertDefinition.Expression) ? 2 : 1;
  }
}
