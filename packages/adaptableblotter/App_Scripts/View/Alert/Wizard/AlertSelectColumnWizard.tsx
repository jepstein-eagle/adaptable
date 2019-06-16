import * as React from 'react';
import { Panel } from 'react-bootstrap';
import { IColumn } from '../../../Utilities/Interface/IColumn';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { SelectionMode } from '../../../PredefinedConfig/Common/Enums';
import { ColumnSelector } from '../../Components/Selectors/ColumnSelector';
import { PRIMARY_BSSTYLE } from '../../../Utilities/Constants/StyleConstants';
import { IAlertDefinition } from '../../../PredefinedConfig/IUserState/AlertState';

export interface AlertSelectColumnWizardProps extends AdaptableWizardStepProps<IAlertDefinition> {}
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
    let cssClassName: string = this.props.cssClassName + '-selectcolumn';

    return (
      <div className={cssClassName}>
        <Panel header="Select a Column" bsStyle={PRIMARY_BSSTYLE}>
          <ColumnSelector
            cssClassName={cssClassName}
            SelectedColumnIds={[this.state.ColumnId]}
            ColumnList={this.props.Columns}
            onColumnChange={columns => this.onColumnSelectedChanged(columns)}
            SelectionMode={SelectionMode.Single}
          />
        </Panel>
      </div>
    );
  }

  private onColumnSelectedChanged(columns: IColumn[]) {
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
