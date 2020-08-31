import * as React from 'react';

import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { SelectionMode } from '../../../PredefinedConfig/Common/Enums';
import { ColumnSelector } from '../../Components/Selectors/ColumnSelector';
import WizardPanel from '../../../components/WizardPanel';
import HelpBlock from '../../../components/HelpBlock';
import { UserFilter } from '../../../PredefinedConfig/FilterState';

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
      ColumnId: '', //props.Data.Scope.ColumnIds[0],
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
          ColumnList={this.props.api.columnApi.getColumns()}
          onColumnChange={columns => this.onColumnSelectedChanged(columns)}
          SelectionMode={SelectionMode.Single}
        />
      </WizardPanel>
    );
  }

  private onColumnSelectedChanged(columns: AdaptableColumn[]) {
    this.setState(
      {
        ColumnId: columns.length > 0 ? columns[0].ColumnId : '',
      } as UserFilterSelectColumnWizardState,
      () => this.props.updateGoBackState()
    );
  }

  public canNext(): boolean {
    return StringExtensions.IsNotNullOrEmpty(this.state.ColumnId);
  }

  public canBack(): boolean {
    return true;
  }
  public next(): void {}

  public back(): void {
    //
  }
  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
    return 1;
  }
}
