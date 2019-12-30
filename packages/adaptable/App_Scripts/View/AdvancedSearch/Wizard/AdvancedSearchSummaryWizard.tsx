import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { ExpressionHelper } from '../../../Utilities/Helpers/ExpressionHelper';

import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdvancedSearch } from '../../../PredefinedConfig/AdvancedSearchState';
import { KeyValuePair } from '../../../Utilities/Interface/KeyValuePair';
import { UserFilter } from '../../../PredefinedConfig/UserFilterState';

export interface AdvancedSearchSummaryWizardProps extends AdaptableWizardStepProps<AdvancedSearch> {
  UserFilters: UserFilter[];
}

export class AdvancedSearchSummaryWizard
  extends React.Component<AdvancedSearchSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: AdvancedSearchSummaryWizardProps) {
    super(props);
  }
  render(): any {
    let keyValuePairs: KeyValuePair[] = [
      { Key: 'Name', Value: this.props.Data.Name },
      {
        Key: 'Query',
        Value: ExpressionHelper.ConvertExpressionToString(
          this.props.Data.Expression,
          this.props.Columns
        ),
      },
    ];

    let summaryPage = (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.AdvancedSearchStrategyFriendlyName}
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
    // todo
  }
  public Back(): void {
    // todo
  }

  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
