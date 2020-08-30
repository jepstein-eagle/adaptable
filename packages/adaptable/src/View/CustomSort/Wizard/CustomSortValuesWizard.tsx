import * as React from 'react';

import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { CellValueType } from '../../../PredefinedConfig/Common/Enums';

import { DualListBoxEditor, DisplaySize } from '../../Components/ListBox/DualListBoxEditor';
import { CustomSort } from '../../../PredefinedConfig/CustomSortState';
import HelpBlock from '../../../components/HelpBlock';

import WizardPanel from '../../../components/WizardPanel';
import { IAdaptable } from '../../../types';
import ArrayExtensions from '../../../Utilities/Extensions/ArrayExtensions';

export interface CustomSortValuesWizardProps extends AdaptableWizardStepProps<CustomSort> {}
export interface CustomSortValuesWizardState {
  ColumnValues: any[];
  SelectedValues: Array<string>;
  IsEdit: boolean;
}

export class CustomSortValuesWizard
  extends React.Component<CustomSortValuesWizardProps, CustomSortValuesWizardState>
  implements AdaptableWizardStep {
  constructor(props: CustomSortValuesWizardProps) {
    let adaptable: IAdaptable = props.api.internalApi.getAdaptableInstance();
    super(props);
    this.state = {
      ColumnValues: adaptable.api.columnApi.getDistinctDisplayValuesForColumn(
        this.props.data.ColumnId
      ),
      SelectedValues: this.props.data.SortedValues,
      IsEdit: ArrayExtensions.IsNotNullOrEmpty(this.props.data.SortedValues),
    };
  }

  render(): any {
    return (
      <WizardPanel>
        <HelpBlock marginBottom={2}>
          Create a Custom Sort by moving items into the 'Custom Sort Order' listbox. The new sort
          for the column will consist first of the items in the 'Custom Sort Order' listbox; all
          other column values will then sort alphabetically.
        </HelpBlock>
        <DualListBoxEditor
          style={{ flex: 1, overflow: 'hidden' }}
          AvailableValues={this.state.ColumnValues}
          SelectedValues={this.state.SelectedValues}
          HeaderAvailable="Column Values"
          HeaderSelected="Custom Sort Order"
          onChange={SelectedValues => this.OnSelectedValuesChange(SelectedValues)}
          DisplaySize={DisplaySize.Small}
        />
        <HelpBlock marginTop={2}>
          Press ctrl/cmd key while clicking to select multiple items.
        </HelpBlock>
      </WizardPanel>
    );
  }
  OnSelectedValuesChange(newValues: Array<string>) {
    this.setState({ SelectedValues: newValues } as CustomSortValuesWizardState, () =>
      this.props.updateGoBackState()
    );
  }

  public canNext(): boolean {
    return this.state.SelectedValues.length > 0;
  }
  public canBack(): boolean {
    return !this.state.IsEdit;
  }
  public next(): void {
    this.props.data.SortedValues = this.state.SelectedValues;
  }
  public back(): void {
    // todo
  }
  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
    return 1;
  }
}
