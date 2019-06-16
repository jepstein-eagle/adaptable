import * as React from 'react';
import { Panel } from 'react-bootstrap';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { SelectionMode } from '../../../PredefinedConfig/Common/Enums';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { ColumnSelector } from '../../Components/Selectors/ColumnSelector';
import { ColumnHelper } from '../../../Utilities/Helpers/ColumnHelper';
import { ICustomSort } from '../../../PredefinedConfig/IUserState/CustomSortState';

export interface CustomSortColumnWizardProps extends AdaptableWizardStepProps<ICustomSort> {
  SortedColumns: IColumn[];
}

export interface CustomSortColumnWizardState {
  SelectedColumnId: string;
}

export class CustomSortColumnWizard
  extends React.Component<CustomSortColumnWizardProps, CustomSortColumnWizardState>
  implements AdaptableWizardStep {
  constructor(props: CustomSortColumnWizardProps) {
    super(props);
    this.state = { SelectedColumnId: this.props.Data.ColumnId };
  }
  render(): any {
    let cssClassName: string = this.props.cssClassName + '-column';
    let sortableCols = ColumnHelper.getSortableColumns(this.props.Columns);
    return (
      <div className={cssClassName}>
        <Panel header="Select a Column" bsStyle="primary">
          <ColumnSelector
            cssClassName={cssClassName}
            SelectedColumnIds={[this.state.SelectedColumnId]}
            ColumnList={sortableCols}
            onColumnChange={columns => this.onColumnSelectedChanged(columns)}
            SelectionMode={SelectionMode.Single}
          />
        </Panel>
      </div>
    );
  }

  private onColumnSelectedChanged(columns: IColumn[]) {
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
  // tslint:disable-next-line:no-empty
  public Back(): void {}
  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
