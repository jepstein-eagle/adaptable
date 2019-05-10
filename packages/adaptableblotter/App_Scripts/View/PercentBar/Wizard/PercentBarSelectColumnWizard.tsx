import * as React from 'react';
import { Panel } from 'react-bootstrap';
import { IColumn } from '../../../Utilities/Interface/IColumn';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { SelectionMode, DistinctCriteriaPairValue } from '../../../Utilities/Enums';
import { ColumnSelector } from '../../Components/Selectors/ColumnSelector';
import { IPercentBar } from '../../../Utilities/Interface/BlotterObjects/IPercentBar';
import { ColumnHelper } from '../../../Utilities/Helpers/ColumnHelper';

export interface PercentBarSelectColumnWizardProps extends AdaptableWizardStepProps<IPercentBar> {}
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
    let cssClassName: string = this.props.cssClassName + '-selectcolumn';

    return (
      <div className={cssClassName}>
        <Panel header="Select a Column" bsStyle="primary">
          <ColumnSelector
            cssClassName={cssClassName}
            SelectedColumnIds={[this.state.ColumnId]}
            ColumnList={ColumnHelper.getNumericColumns(this.props.Columns)}
            onColumnChange={columns => this.onColumnSelectedChanged(columns)}
            SelectionMode={SelectionMode.Single}
          />
        </Panel>
      </div>
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
