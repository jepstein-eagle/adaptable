import * as React from 'react';
import { IColumn } from '../../../Utilities/Interface/IColumn';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { SelectionMode, DistinctCriteriaPairValue } from '../../../PredefinedConfig/Common/Enums';
import { ColumnSelector } from '../../Components/Selectors/ColumnSelector';
import { ColumnHelper } from '../../../Utilities/Helpers/ColumnHelper';
import WizardPanel from '../../../components/WizardPanel';
import { SparklineColumn } from '../../../PredefinedConfig/DesignTimeState/SparklineColumnState';

export interface SparklinesSelectColumnWizardProps
  extends AdaptableWizardStepProps<SparklineColumn> {}
export interface SparklinesSelectColumnWizardState extends SparklineColumn {}

export class SparklinesSelectColumnWizard
  extends React.Component<SparklinesSelectColumnWizardProps, SparklinesSelectColumnWizardState>
  implements AdaptableWizardStep {
  constructor(props: SparklinesSelectColumnWizardProps) {
    super(props);
    this.state = {
      ColumnId: this.props.Data.ColumnId,
      SparklineType: this.props.Data.SparklineType,
      MinimumValue: this.props.Data.MinimumValue,
      MaximumValue: this.props.Data.MaximumValue,
    };
  }

  render(): any {
    return (
      <WizardPanel>
        <ColumnSelector
          SelectedColumnIds={[this.state.ColumnId]}
          ColumnList={ColumnHelper.getNumericArrayColumns(this.props.Columns)}
          onColumnChange={columns => this.onColumnSelectedChanged(columns)}
          SelectionMode={SelectionMode.Single}
        />
      </WizardPanel>
    );
  }

  private onColumnSelectedChanged(columns: IColumn[]) {
    if (columns.length > 0) {
      let distinctColumnsValues: number[] = this.props.Blotter.getColumnValueDisplayValuePairDistinctList(
        columns[0].ColumnId,
        DistinctCriteriaPairValue.RawValue,
        false
      ).map(pair => {
        return pair.RawValue;
      });
      let minValue = Math.min(...distinctColumnsValues);
      let maxValue = Math.max(...distinctColumnsValues);
      this.setState(
        {
          ColumnId: columns[0].ColumnId,
          MinimumValue: minValue,
          MaximumValue: maxValue,
        } as SparklinesSelectColumnWizardState,
        () => this.props.UpdateGoBackState()
      );
    } else {
      this.setState({ ColumnId: '' } as SparklinesSelectColumnWizardState, () =>
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
    this.props.Data.SparklineType = this.state.SparklineType;
    this.props.Data.MinimumValue = this.state.MinimumValue;
    this.props.Data.MaximumValue = this.state.MaximumValue;
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
