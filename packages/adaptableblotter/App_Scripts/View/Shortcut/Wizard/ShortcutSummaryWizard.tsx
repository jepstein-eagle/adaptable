import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { KeyValuePair } from '../../../Utilities/Interface/KeyValuePair';
import { Shortcut } from '../../../PredefinedConfig/ShortcutState';

export interface ShortcutSummaryWizardProps extends AdaptableWizardStepProps<Shortcut> {}

export class ShortcutSummaryWizard extends React.Component<ShortcutSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: ShortcutSummaryWizardProps) {
    super(props);
  }

  render() {
    let keyValuePairs: KeyValuePair[] = [
      { Key: 'Key', Value: this.props.Data.ShortcutKey },
      { Key: 'Result', Value: this.props.Data.ShortcutResult },
      { Key: 'Operation', Value: this.props.Data.ShortcutOperation },
      { Key: 'Columns', Value: this.props.Data.ColumnType },
    ];

    let summaryPage = (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.ShortcutStrategyName}
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
    //
  }
  public Back(): void {
    /* no implementation required   */
  }
  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
