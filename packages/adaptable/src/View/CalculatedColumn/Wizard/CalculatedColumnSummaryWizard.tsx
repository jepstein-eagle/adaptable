import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { KeyValuePair } from '../../../Utilities/Interface/KeyValuePair';
import { CalculatedColumn } from '../../../PredefinedConfig/CalculatedColumnState';

export interface CalculatedColumnSummaryWizardProps
  extends AdaptableWizardStepProps<CalculatedColumn> {}

export class CalculatedColumnSummaryWizard
  extends React.Component<CalculatedColumnSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: CalculatedColumnSummaryWizardProps) {
    super(props);
    this.state = { ColumnId: this.props.Data.ColumnId, ErrorMessage: null };
  }
  render(): any {
    let keyValuePairs: KeyValuePair[] = [
      { Key: 'Column ID', Value: this.props.Data.ColumnId },
      { Key: 'Column Name', Value: this.props.Data.FriendlyName },
      {
        Key: 'Expression',
        Value: this.props.Api.internalApi
          .getCalculatedColumnExpressionService()
          .GetExpressionString(
            this.props.Data.ColumnExpression,
            this.props.Api.gridApi.getColumns()
          ),
      },
      { Key: 'DataType', Value: this.props.Data.CalculatedColumnSettings.DataType },
      { Key: 'Width', Value: this.props.Data.CalculatedColumnSettings.Width },
      {
        Key: 'Filterable',
        Value: this.props.Data.CalculatedColumnSettings.Filterable ? 'True' : 'False',
      },
      {
        Key: 'Resizable',
        Value: this.props.Data.CalculatedColumnSettings.Resizable ? 'True' : 'False',
      },
      {
        Key: 'Groupable',
        Value: this.props.Data.CalculatedColumnSettings.Groupable ? 'True' : 'False',
      },
      {
        Key: 'Sortable',
        Value: this.props.Data.CalculatedColumnSettings.Sortable ? 'True' : 'False',
      },
      {
        Key: 'Pivotable',
        Value: this.props.Data.CalculatedColumnSettings.Pivotable ? 'True' : 'False',
      },
      {
        Key: 'Aggregatable',
        Value: this.props.Data.CalculatedColumnSettings.Aggregatable ? 'True' : 'False',
      },
    ];

    return (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.CalculatedColumnStrategyFriendlyName}
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
