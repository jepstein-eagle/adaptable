import { Shortcut } from '../../../PredefinedConfig/RunTimeState/ShortcutState';
/// <reference path="../../typings/index.d.ts" />
import * as React from 'react';

import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { DataType, MathOperation } from '../../../PredefinedConfig/Common/Enums';

import WizardPanel from '../../../components/WizardPanel';
import Radio from '../../../components/Radio';
import HelpBlock from '../../../components/HelpBlock';
import { Flex } from 'rebass';

export interface ShortcutTypeWizardProps extends AdaptableWizardStepProps<Shortcut> {}
export interface ShortcutTypeWizardState {
  ColumnType: 'Number' | 'Date';
}

export class ShortcutTypeWizard
  extends React.Component<ShortcutTypeWizardProps, ShortcutTypeWizardState>
  implements AdaptableWizardStep {
  constructor(props: ShortcutTypeWizardProps) {
    super(props);
    this.state = {
      ColumnType: this.props.Data.ColumnType,
    };
  }

  render() {
    return (
      <WizardPanel header="Select Where Shortcut is Applied">
        <HelpBlock marginBottom={2}>
          <p>
            Numeric column shortuts perform a mathematical operation on the current contents of the
            cell.
          </p>
          <p>Date shortcuts replace the cell contents with a new Date value.</p>
        </HelpBlock>

        <Flex flexDirection="column" padding={2}>
          <Radio
            marginBottom={2}
            value="Number"
            checked={this.state.ColumnType == DataType.Number}
            onChange={(_, e: any) => this.onColumTypeChanged(e)}
          >
            Numeric Columns
          </Radio>
          <Radio
            marginBottom={2}
            value="Date"
            checked={this.state.ColumnType == DataType.Date}
            onChange={(_, e: any) => this.onColumTypeChanged(e)}
          >
            Date Columns
          </Radio>
        </Flex>
      </WizardPanel>
    );
  }

  private onColumTypeChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    if (e.value == 'Number') {
      this.setState({ ColumnType: DataType.Number } as ShortcutTypeWizardState, () =>
        this.props.UpdateGoBackState()
      );
    } else {
      this.setState({ ColumnType: DataType.Date } as ShortcutTypeWizardState, () =>
        this.props.UpdateGoBackState()
      );
    }
  }

  public canNext(): boolean {
    return this.state.ColumnType != null;
  }
  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.ColumnType = this.state.ColumnType;
    if (this.state.ColumnType == DataType.Date) {
      this.props.Data.ShortcutOperation = MathOperation.Replace;
    }
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
