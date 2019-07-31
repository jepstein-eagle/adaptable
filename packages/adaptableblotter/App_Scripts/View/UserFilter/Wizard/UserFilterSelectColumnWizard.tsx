import * as React from 'react';

import { IColumn } from '../../../Utilities/Interface/IColumn';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { SelectionMode } from '../../../PredefinedConfig/Common/Enums';
import { ExpressionHelper } from '../../../Utilities/Helpers/ExpressionHelper';
import { ColumnSelector } from '../../Components/Selectors/ColumnSelector';
import { UserFilter } from '../../../PredefinedConfig/RunTimeState/UserFilterState';
import WizardPanel from '../../../components/WizardPanel';
import HelpBlock from '../../../components/HelpBlock';

export interface UserFilterSelectColumnWizardProps extends AdaptableWizardStepProps<UserFilter> {}
export interface UserFilterSelectColumnWizardState {
  ColumnId: string;
}

export class UserFilterSelectColumnWizard
  extends React.Component<UserFilterSelectColumnWizardProps, UserFilterSelectColumnWizardState>
  implements AdaptableWizardStep {
  constructor(props: UserFilterSelectColumnWizardProps) {
    super(props);
    this.state = {
      ColumnId: props.Data.ColumnId,
    };
  }

  render(): any {
    return (
      <WizardPanel>
        <HelpBlock marginBottom={2}>
          {'Choose which column the User Filter will apply to.'}
        </HelpBlock>
        <ColumnSelector
          SelectedColumnIds={[this.state.ColumnId]}
          ColumnList={this.props.Columns}
          onColumnChange={columns => this.onColumnSelectedChanged(columns)}
          SelectionMode={SelectionMode.Single}
        />
      </WizardPanel>
    );
  }

  private onColumnSelectedChanged(columns: IColumn[]) {
    this.setState(
      {
        ColumnId: columns.length > 0 ? columns[0].ColumnId : '',
      } as UserFilterSelectColumnWizardState,
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
    if (this.props.Data.ColumnId != this.state.ColumnId) {
      this.props.Data.Expression = ExpressionHelper.CreateEmptyExpression();
    }
    this.props.Data.ColumnId = this.state.ColumnId;
  }

  public Back(): void {
    //
  }
  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
