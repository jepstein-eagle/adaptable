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
      { Key: 'Key', Value: this.props.data.ShortcutKey },
      { Key: 'Result', Value: this.props.data.ShortcutResult },
      { Key: 'Operation', Value: this.props.data.ShortcutOperation },
      { Key: 'Columns', Value: this.props.data.ColumnType },
    ];

    return (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.ShortcutStrategyFriendlyName}
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
    /* no implementation required   */
  }
  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
    return 1;
  }
}
