import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { SelectionMode } from '../../../PredefinedConfig/Common/Enums';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { ColumnSelector } from '../../Components/Selectors/ColumnSelector';
import { PlusMinusRule } from '../../../PredefinedConfig/PlusMinusState';
import WizardPanel from '../../../components/WizardPanel';

export interface PlusMinusColumnWizardProps extends AdaptableWizardStepProps<PlusMinusRule> {}

export interface PlusMinusColumnWizardState {
  SelectedColumnId: string;
}

export class PlusMinusColumnWizard
  extends React.Component<PlusMinusColumnWizardProps, PlusMinusColumnWizardState>
  implements AdaptableWizardStep {
  constructor(props: PlusMinusColumnWizardProps) {
    super(props);
    this.state = { SelectedColumnId: this.props.Data.ColumnId };
  }
  render(): any {
    return (
      <WizardPanel>
        <ColumnSelector
          SelectedColumnIds={[this.state.SelectedColumnId]}
          ColumnList={this.props.Api.columnApi.getNumericColumns()}
          onColumnChange={columns => this.onColumnSelectedChanged(columns)}
          SelectionMode={SelectionMode.Single}
        />
      </WizardPanel>
    );
  }

  private onColumnSelectedChanged(columns: AdaptableColumn[]) {
    this.setState({ SelectedColumnId: columns.length > 0 ? columns[0].ColumnId : '' }, () =>
      this.props.UpdateGoBackState()
    );
  }
  public canNext(): boolean {
    return StringExtensions.IsNotNullOrEmpty(this.state.SelectedColumnId);
  }
  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.ColumnId = this.state.SelectedColumnId;
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
