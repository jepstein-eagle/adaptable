import * as React from 'react';
import { IColumn } from '../../../Utilities/Interface/IColumn';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { ExpressionHelper } from '../../../Utilities/Helpers/ExpressionHelper';
import { ColumnHelper } from '../../../Utilities/Helpers/ColumnHelper';
import { AlertHelper } from '../../../Utilities/Helpers/AlertHelper';
import { IKeyValuePair } from '../../../Utilities/Interface/IKeyValuePair';
import { AlertDefinition } from '../../../PredefinedConfig/RunTimeState/AlertState';
import { UserFilter } from '../../../PredefinedConfig/RunTimeState/UserFilterState';

export interface AlertSummaryWizardProps extends AdaptableWizardStepProps<AlertDefinition> {
  UserFilters: UserFilter[];
}

export class AlertSummaryWizard extends React.Component<AlertSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: AlertSummaryWizardProps) {
    super(props);
  }

  render(): any {
    let keyValuePairs: IKeyValuePair[] = [
      {
        Key: 'Column',
        Value: ColumnHelper.getFriendlyNameFromColumnId(
          this.props.Data.ColumnId,
          this.props.Columns
        ),
      },
      {
        Key: 'Rule',
        Value: AlertHelper.createAlertDescription(this.props.Data, this.props.Columns),
      },
      { Key: 'Alert Type', Value: this.props.Data.MessageType },
      {
        Key: 'Query',
        Value: ExpressionHelper.IsNotNullOrEmptyExpression(this.props.Data.Expression)
          ? ExpressionHelper.ConvertExpressionToString(
              this.props.Data.Expression,
              this.props.Columns
            )
          : 'None',
      },
    ];

    let summaryPage = (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.AlertStrategyName}
      />
    );
    return <div>{summaryPage}</div>;
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
    return ExpressionHelper.IsNullOrEmptyExpression(this.props.Data.Expression) ? 2 : 1;
  }
}
