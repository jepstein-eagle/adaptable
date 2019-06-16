import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { FreeTextColumn } from '../../../PredefinedConfig/RunTimeState/FreeTextColumnState';
import { ArrayExtensions } from '../../../Utilities/Extensions/ArrayExtensions';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { IKeyValuePair } from '../../../Utilities/Interface/IKeyValuePair';

export interface FreeTextColumnSummaryWizardProps
  extends AdaptableWizardStepProps<FreeTextColumn> {}
export class FreeTextColumnSummaryWizard
  extends React.Component<FreeTextColumnSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: FreeTextColumnSummaryWizardProps) {
    super(props);
    this.state = { ColumnId: this.props.Data.ColumnId };
  }

  render() {
    let cssClassName: string = this.props.cssClassName + '-summary';

    let keyValuePairs: IKeyValuePair[] = [
      { Key: 'Name', Value: this.props.Data.ColumnId },
      {
        Key: 'Default Value',
        Value: StringExtensions.IsNullOrEmpty(this.props.Data.DefaultValue)
          ? '[None]'
          : this.props.Data.DefaultValue,
      },
      {
        Key: 'No. Stored Values',
        Value: ArrayExtensions.IsNullOrEmpty(this.props.Data.FreeTextStoredValues)
          ? 0
          : this.props.Data.FreeTextStoredValues.length,
      },
    ];

    let summaryPage = (
      <WizardSummaryPage
        cssClassName={cssClassName}
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.FreeTextColumnStrategyName}
      />
    );
    return <div className={cssClassName}>{summaryPage}</div>;
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
