import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { PanelWithInfo } from '../../Components/Panels/PanelWithInfo';
import { DualListBoxEditor, DisplaySize } from '../../Components/ListBox/DualListBoxEditor';
import { Helper } from '../../../Utilities/Helpers/Helper';
import { SHORTCUT_ADD } from '../../../Redux/ActionsReducers/ShortcutRedux';
import { Layout } from '../../../PredefinedConfig/LayoutState';
import { ColumnHelper } from '../../../Utilities/Helpers/ColumnHelper';
import WizardPanel from '../../../components/WizardPanel';
import HelpBlock from '../../../components/HelpBlock';

export interface LayoutColumnWizardProps extends AdaptableWizardStepProps<Layout> {}
export interface LayoutColumnWizardState {
  SelectedColumns: Array<string>;
}

export class LayoutColumnWizard
  extends React.Component<LayoutColumnWizardProps, LayoutColumnWizardState>
  implements AdaptableWizardStep {
  constructor(props: LayoutColumnWizardProps) {
    super(props);
    this.state = {
      SelectedColumns: ColumnHelper.getFriendlyNamesFromColumnIds(
        this.props.Data.Columns,
        this.props.Columns
      ),
    };
  }

  render(): any {
    let infoBody: any[] = [
      'Create a layout.',
      <br />,
      <br />,
      'Use the buttons on the right of the box to order items in the list as required.',
      <br />,
      <br />,
      "The new sort will consist first of the items in the 'Custom Sort Order' listbox; all other column values will then sort alphabetically.",
    ];

    return (
      <WizardPanel>
        <HelpBlock marginBottom={2}>
          Press ctrl/cmd key while clicking to select multiple items.
        </HelpBlock>
        <DualListBoxEditor
          style={{ flex: 1, overflow: 'hidden' }}
          AvailableValues={this.props.Columns.map(x => x.FriendlyName)}
          SelectedValues={this.state.SelectedColumns}
          HeaderAvailable="Available Columns"
          HeaderSelected="Columns in Layout"
          onChange={SelectedValues => this.OnSelectedValuesChange(SelectedValues)}
          DisplaySize={DisplaySize.Small}
        />
      </WizardPanel>
    );
  }
  OnSelectedValuesChange(newValues: Array<string>) {
    this.setState({ SelectedColumns: newValues } as LayoutColumnWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return this.state.SelectedColumns.length > 0;
  }
  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.Columns = ColumnHelper.getColumnIdsFromFriendlyNames(
      this.state.SelectedColumns,
      this.props.Columns
    );
  }
  public Back(): void {
    // todo
  }
  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
