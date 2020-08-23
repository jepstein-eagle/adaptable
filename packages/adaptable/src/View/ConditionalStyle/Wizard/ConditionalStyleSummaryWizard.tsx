import * as React from 'react';

import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StyleVisualItem } from '../../Components/StyleVisualItem';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { ConditionalStyle } from '../../../PredefinedConfig/ConditionalStyleState';
import { KeyValuePair } from '../../../Utilities/Interface/KeyValuePair';
import StringExtensions from '../../../Utilities/Extensions/StringExtensions';

export interface ConditionalStyleSummaryWizardProps
  extends AdaptableWizardStepProps<ConditionalStyle> {}

export class ConditionalStyleSummaryWizard
  extends React.Component<ConditionalStyleSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: ConditionalStyleSummaryWizardProps) {
    super(props);
  }

  render(): any {
    let keyValuePairs: KeyValuePair[] = [
      { Key: 'Scope', Value: this.getScope() },
      { Key: 'Exclude Grouped Rows', Value: this.getExcludedGroupedRows() },
      { Key: 'Style', Value: <StyleVisualItem Style={this.props.Data.Style} /> },
      {
        Key: 'Query Type',
        Value: StringExtensions.IsNullOrEmpty(this.props.Data.Expression) ? 'Shared' : 'Custom',
      },
      {
        Key: 'Expression',
        Value: this.props.Api.sharedQueryApi.getExpressionForQueryObject(this.props.Data),
      },
    ];

    return (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.ConditionalStyleStrategyFriendlyName}
      />
    );
  }

  private getScope(): string {
    switch (this.props.Data.ConditionalStyleScope) {
      case 'Row':
        return 'Row';
      case 'Column':
        return (
          'Column:' + this.props.Api.columnApi.getFriendlyNameFromColumnId(this.props.Data.ColumnId)
        );
      //  case 'DataType':
      //     return this.props.Data.DataType + ' Columns';

      case 'ColumnCategory':
        return 'Category: ' + this.props.Data.ColumnCategoryId;
    }
  }

  private getExcludedGroupedRows(): string {
    return this.props.Data.ExcludeGroupedRows != null &&
      this.props.Data.ExcludeGroupedRows != undefined &&
      this.props.Data.ExcludeGroupedRows == true
      ? 'True'
      : 'False';
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
    // todo
  }

  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
