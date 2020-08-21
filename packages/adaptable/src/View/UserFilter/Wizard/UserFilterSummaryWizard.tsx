import * as React from 'react';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { ExpressionHelper } from '../../../Utilities/Helpers/ExpressionHelper';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { KeyValuePair } from '../../../Utilities/Interface/KeyValuePair';
import { UserFilter } from '../../../PredefinedConfig/FilterState';

export interface UserFilterSummaryWizardProps extends AdaptableWizardStepProps<UserFilter> {}

export class UserFilterSummaryWizard extends React.Component<UserFilterSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: UserFilterSummaryWizardProps) {
    super(props);
  }
  render() {
    let keyValuePairs: KeyValuePair[] = [
      { Key: 'Name', Value: this.props.Data.Name },
      {
        Key: 'Column',
        Value: this.props.Api.columnApi.getFriendlyNameFromColumnId(this.props.Data.ColumnId),
      },
      {
        Key: 'Query',
        Value: ExpressionHelper.ConvertExpressionToString(
          this.props.Data.Expression,
          this.props.Api
        ),
      },
    ];

    return (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.UserFilterStrategyFriendlyName}
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
    return 1;
  }
}
