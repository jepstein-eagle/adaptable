import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { ReportColumnScope } from '../../../PredefinedConfig/Common/Enums';
import { DualListBoxEditor, DisplaySize } from '../../Components/ListBox/DualListBoxEditor';
import ColumnHelper from '../../../Utilities/Helpers/ColumnHelper';
import { Report } from '../../../PredefinedConfig/ExportState';
import WizardPanel from '../../../components/WizardPanel';
import HelpBlock from '../../../components/HelpBlock';

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
    return this.props.Data.ReportColumnScope == ReportColumnScope.BespokeColumns ? (
      <WizardPanel
        bodyProps={{ style: { border: 'none' } }}
        headerProps={{ style: { border: 'none' } }}
      >
        <HelpBlock marginBottom={2}>
          Press ctrl/cmd key while clicking to select multiple items.
        </HelpBlock>

        <DualListBoxEditor
          style={{ flex: 1, overflow: 'hidden' }}
          AvailableValues={this.state.AllColumnValues}
          SelectedValues={this.state.SelectedColumnValues}
          HeaderAvailable="Columns"
          HeaderSelected="Columns in Report"
          onChange={SelectedValues => this.OnSelectedValuesChange(SelectedValues)}
          DisplaySize={DisplaySize.Small}
        />
      </WizardPanel>
    ) : null;
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
