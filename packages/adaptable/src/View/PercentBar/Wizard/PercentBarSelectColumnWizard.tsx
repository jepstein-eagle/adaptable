import * as React from 'react';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { SelectionMode } from '../../../PredefinedConfig/Common/Enums';
import { ColumnSelector } from '../../Components/Selectors/ColumnSelector';
import { PercentBar, PercentBarRange } from '../../../PredefinedConfig/PercentBarState';
import WizardPanel from '../../../components/WizardPanel';
import { getHexForName, RED, DARK_GREEN } from '../../UIHelper';

export interface PercentBarSelectColumnWizardProps extends AdaptableWizardStepProps<PercentBar> {}
export interface PercentBarSelectColumnWizardState {
  ColumnId: string;
  Ranges: PercentBarRange[];
}

export class PercentBarSelectColumnWizard
  extends React.Component<PercentBarSelectColumnWizardProps, PercentBarSelectColumnWizardState>
  implements AdaptableWizardStep {
  constructor(props: PercentBarSelectColumnWizardProps) {
    super(props);
    this.state = {
      ColumnId: this.props.data!.ColumnId,
      Ranges: this.props.data!.Ranges,
    };
  }

  render(): any {
    return (
      <WizardPanel>
        <ColumnSelector
          SelectedColumnIds={[this.state.ColumnId]}
          ColumnList={this.props.api.columnApi.getNumericColumns()}
          onColumnChange={columns => this.onColumnSelectedChanged(columns)}
          SelectionMode={SelectionMode.Single}
        />
      </WizardPanel>
    );
  }

  private onColumnSelectedChanged(columns: AdaptableColumn[]) {
    if (columns.length > 0) {
      let distinctColumnsValues: number[] = this.props.api.columnApi.getDistinctRawValuesForColumn(
        columns[0].ColumnId
      );

      let minValue = Math.min(...distinctColumnsValues);
      let maxValue = Math.max(...distinctColumnsValues);

      const ranges: PercentBarRange[] = [];

      if (minValue < 0) {
        ranges.push({
          Min: minValue,
          Max: 0,
          Color: getHexForName(RED),
        });
      }

      if (maxValue > 0) {
        ranges.push({
          Min: 0,
          Max: maxValue,
          Color: getHexForName(DARK_GREEN),
        });
      }

      this.setState(
        {
          ColumnId: columns[0].ColumnId,
          Ranges: ranges,
        } as PercentBarSelectColumnWizardState,
        () => this.props.updateGoBackState()
      );
    } else {
      this.setState({ ColumnId: '' } as PercentBarSelectColumnWizardState, () =>
        this.props.updateGoBackState()
      );
    }
  }

  public canNext(): boolean {
    return StringExtensions.IsNotNullOrEmpty(this.state.ColumnId);
  }

  public canBack(): boolean {
    return true;
  }
  public next(): void {
    this.props.data!.ColumnId = this.state.ColumnId;
    this.props.data!.Ranges = this.state.Ranges;
  }

  public back(): void {
    //todo
  }
  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
    return 1;
  }
}
