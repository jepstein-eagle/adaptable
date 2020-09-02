import * as React from 'react';

import * as StrategyConstants from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';
import {
  AdaptableWizardStepProps,
  AdaptableWizardStep,
} from '@adaptabletools/adaptable/src/View/Wizard/Interface/IAdaptableWizard';
import { SparklinesChartDefinition } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
import { WizardSummaryPage } from '@adaptabletools/adaptable/src/View/Components/WizardSummaryPage';
import { KeyValuePair } from '@adaptabletools/adaptable/src/Utilities/Interface/KeyValuePair';

export interface SparklinesChartSummaryWizardProps
  extends AdaptableWizardStepProps<SparklinesChartDefinition> {}

export class SparklinesChartSummaryWizard
  extends React.Component<SparklinesChartSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: SparklinesChartSummaryWizardProps) {
    super(props);
  }
  render(): any {
    let keyValuePairs: KeyValuePair[] = [
      { Key: 'Name', Value: this.props.data.Name },
      { Key: 'Description', Value: this.props.data.Description },
      {
        Key: 'Column',
        Value: this.props.api.columnApi.getFriendlyNameFromColumnId(this.props.data.ColumnId),
      },
      {
        Key: 'Expression',
        Value: this.props.api.queryApi.QueryObjectToString(this.props.data),
      },
    ];

    return (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.ChartStrategyFriendlyName}
      />
    );
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
    //
  }
  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
    return 1;
  }
}
