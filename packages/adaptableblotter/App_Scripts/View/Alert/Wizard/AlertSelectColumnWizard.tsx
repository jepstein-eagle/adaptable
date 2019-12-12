import * as React from 'react';

import { AdaptableBlotterColumn } from '../../../PredefinedConfig/Common/AdaptableBlotterColumn';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { SelectionMode } from '../../../PredefinedConfig/Common/Enums';
import { ColumnSelector } from '../../Components/Selectors/ColumnSelector';
import { AlertDefinition } from '../../../PredefinedConfig/AlertState';
import WizardPanel from '../../../components/WizardPanel';

export interface AlertSelectColumnWizardProps extends AdaptableWizardStepProps<AlertDefinition> {}
export interface AlertSelectColumnWizardState {
  ColumnId: string;
}

export class AlertSelectColumnWizard
  extends React.Component<AlertSelectColumnWizardProps, AlertSelectColumnWizardState>
  implements AdaptableWizardStep {
  constructor(props: AlertSelectColumnWizardProps) {
    super(props);
    this.state = {
      ColumnId: this.props.Data.ColumnId,
    };
  }

  render(): any {
    return (
      <WizardPanel>
        <ColumnSelector
          SelectedColumnIds={[this.state.ColumnId]}
          ColumnList={this.props.Columns}
          onColumnChange={columns => this.onColumnSelectedChanged(columns)}
          SelectionMode={SelectionMode.Single}
        />
      </WizardPanel>
    );
  }

  private onColumnSelectedChanged(columns: AdaptableBlotterColumn[]) {
    this.setState(
      { ColumnId: columns.length > 0 ? columns[0].ColumnId : '' } as AlertSelectColumnWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return StringExtensions.IsNotNullOrEmpty(this.state.ColumnId);
  }

  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.ColumnId = this.state.ColumnId;
  }

  public Back(): void {
    //todo
  }
  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
