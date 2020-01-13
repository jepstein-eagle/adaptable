import * as React from 'react';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { SelectionMode } from '../../../PredefinedConfig/Common/Enums';
import { ColumnSelector } from '../../Components/Selectors/ColumnSelector';
import { PercentBar } from '../../../PredefinedConfig/PercentBarState';
import { ColumnHelper } from '../../../Utilities/Helpers/ColumnHelper';
import WizardPanel from '../../../components/WizardPanel';

export interface PercentBarSelectColumnWizardProps extends AdaptableWizardStepProps<PercentBar> {}
export interface PercentBarSelectColumnWizardState {
  ColumnId: string;
  MinValue: number;
  MaxValue: number;
}

export class PercentBarSelectColumnWizard
  extends React.Component<PercentBarSelectColumnWizardProps, PercentBarSelectColumnWizardState>
  implements AdaptableWizardStep {
  constructor(props: PercentBarSelectColumnWizardProps) {
    super(props);
    this.state = {
      ColumnId: this.props.Data.ColumnId,
      MinValue: this.props.Data.MinValue,
      MaxValue: this.props.Data.MaxValue,
    };
  }

  render(): any {
    return (
      <WizardPanel>
        <ColumnSelector
          SelectedColumnIds={[this.state.ColumnId]}
          ColumnList={this.props.Adaptable.api.gridApi.getNumericColumns()}
          onColumnChange={columns => this.onColumnSelectedChanged(columns)}
          SelectionMode={SelectionMode.Single}
        />
      </WizardPanel>
    );
  }

  private onColumnSelectedChanged(columns: AdaptableColumn[]) {
    if (columns.length > 0) {
      let distinctColumnsValues: number[] = this.props.Adaptable.StrategyService.getDistinctColumnValues(
        columns[0].ColumnId
      );
      let minValue = Math.min(...distinctColumnsValues);
      let maxValue = Math.max(...distinctColumnsValues);
      this.setState(
        {
          ColumnId: columns[0].ColumnId,
          MinValue: minValue,
          MaxValue: maxValue,
        } as PercentBarSelectColumnWizardState,
        () => this.props.UpdateGoBackState()
      );
    } else {
      this.setState({ ColumnId: '' } as PercentBarSelectColumnWizardState, () =>
        this.props.UpdateGoBackState()
      );
    }
  }

  public canNext(): boolean {
    return StringExtensions.IsNotNullOrEmpty(this.state.ColumnId);
  }

  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.ColumnId = this.state.ColumnId;
    this.props.Data.MinValue = this.state.MinValue;
    this.props.Data.MaxValue = this.state.MaxValue;
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
