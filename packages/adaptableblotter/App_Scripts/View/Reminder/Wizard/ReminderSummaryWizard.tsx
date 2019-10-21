import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { UserFilter } from '../../../PredefinedConfig/RunTimeState/UserFilterState';
import { Reminder } from '../../../PredefinedConfig/RunTimeState/ReminderState';
import { IKeyValuePair } from '../../../Utilities/Interface/IKeyValuePair';
import { UIHelper } from '../../UIHelper';

export interface ReminderSummaryWizardProps extends AdaptableWizardStepProps<Reminder> {}

export class ReminderSummaryWizard extends React.Component<ReminderSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: ReminderSummaryWizardProps) {
    super(props);
  }

  render(): any {
    let keyValuePairs: IKeyValuePair[] = [
      { Key: 'Header', Value: this.props.Data.Alert.Header },
      { Key: 'Message', Value: this.props.Data.Alert.Msg },
      { Key: 'Message Type', Value: this.props.Data.Alert.AlertDefinition.MessageType },
      {
        Key: 'Show as Popup',
        Value: this.props.Data.Alert.AlertDefinition.AlertProperties.ShowPopup ? 'True' : 'False',
      },
      { Key: 'Schedule', Value: UIHelper.getScheduleDescription(this.props.Data.Schedule) },
    ];

    let summaryPage = (
      <WizardSummaryPage
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.ReminderStrategyName}
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
    return 1;
  }
}
