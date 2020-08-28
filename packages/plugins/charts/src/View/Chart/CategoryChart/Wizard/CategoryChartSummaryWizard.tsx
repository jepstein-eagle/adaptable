import * as React from 'react';
import * as StrategyConstants from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';
import {
  AdaptableWizardStepProps,
  AdaptableWizardStep,
} from '@adaptabletools/adaptable/src/View/Wizard/Interface/IAdaptableWizard';
import { CategoryChartDefinition } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
import { KeyValuePair } from '@adaptabletools/adaptable/src/Utilities/Interface/KeyValuePair';
import { WizardSummaryPage } from '@adaptabletools/adaptable/src/View/Components/WizardSummaryPage';

export interface CategoryChartSummaryWizardProps
  extends AdaptableWizardStepProps<CategoryChartDefinition> {}

export class CategoryChartSummaryWizard extends React.Component<CategoryChartSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: CategoryChartSummaryWizardProps) {
    super(props);
  }
  render(): any {
    let friendlyNames = this.props.Data.YAxisColumnIds.map(c => {
      return this.props.Api.columnApi.getFriendlyNameFromColumnId(c);
    });
    let keyValuePairs: KeyValuePair[] = [
      { Key: 'Name', Value: this.props.Data.Name },
      { Key: 'Description', Value: this.props.Data.Description },
      { Key: 'Y Axis Column(s)', Value: friendlyNames.join(', ') },
      { Key: 'Total', Value: this.props.Data.YAxisTotal },
      {
        Key: 'X Axis Column',
        Value: this.props.Api.columnApi.getFriendlyNameFromColumnId(this.props.Data.XAxisColumnId),
      },
      { Key: 'X Axis Values', Value: this.props.Data.XAxisExpression },
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
  public Next(): void {
    //
  }
  public Back(): void {
    //
  }
  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
