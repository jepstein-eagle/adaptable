import * as React from 'react';
import { Panel } from 'react-bootstrap';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { ReportColumnScope } from '../../../PredefinedConfig/Common/Enums';
import { DualListBoxEditor, DisplaySize } from '../../Components/ListBox/DualListBoxEditor';
import ColumnHelper from '../../../Utilities/Helpers/ColumnHelper';
import { Report } from '../../../PredefinedConfig/RunTimeState/ExportState';

export interface ReportColumnChooserWizardProps extends AdaptableWizardStepProps<Report> {}
export interface ReportColumnsWizardState {
  AllColumnValues: string[];
  SelectedColumnValues: string[];
}

export class ReportColumnChooserWizard
  extends React.Component<ReportColumnChooserWizardProps, ReportColumnsWizardState>
  implements AdaptableWizardStep {
  constructor(props: ReportColumnChooserWizardProps) {
    super(props);
    this.state = {
      AllColumnValues: this.props.Columns.map(c => c.FriendlyName),
      SelectedColumnValues: ColumnHelper.getFriendlyNamesFromColumnIds(
        this.props.Data.ColumnIds,
        this.props.Columns
      ),
    };
  }
  render() {
    let cssClassName: string = this.props.cssClassName + '-choosecolumns';

    return (
      <div className={cssClassName}>
        {this.props.Data.ReportColumnScope == ReportColumnScope.BespokeColumns && (
          <Panel>
            <DualListBoxEditor
              AvailableValues={this.state.AllColumnValues}
              cssClassName={cssClassName}
              SelectedValues={this.state.SelectedColumnValues}
              HeaderAvailable="Columns"
              HeaderSelected="Columns in Report"
              onChange={SelectedValues => this.OnSelectedValuesChange(SelectedValues)}
              DisplaySize={DisplaySize.Small}
            />
          </Panel>
        )}
      </div>
    );
  }

  OnSelectedValuesChange(newValues: Array<string>) {
    this.setState({ SelectedColumnValues: newValues } as ReportColumnsWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return this.state.SelectedColumnValues.length > 0;
  }
  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.ColumnIds = this.state.SelectedColumnValues.map(
      c => this.props.Columns.find(col => col.FriendlyName == c).ColumnId
    );
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
