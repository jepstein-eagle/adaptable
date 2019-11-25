import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';

import { LayoutSource } from '../../../PredefinedConfig/Common/Enums';

import { AdaptablePopover } from '../../AdaptablePopover';
import { Layout, ColumnSort } from '../../../PredefinedConfig/LayoutState';

import WizardPanel from '../../../components/WizardPanel';
import HelpBlock from '../../../components/HelpBlock';
import { Flex } from 'rebass';
import Radio from '../../../components/Radio';

export interface LayoutSelectionWizardProps extends AdaptableWizardStepProps<Layout> {
  Layouts: Array<Layout>;
  ColumnSorts: ColumnSort[];
}

export interface LayoutSelectionWizardState {
  LayoutSource: LayoutSource;
}

export class LayoutSelectionWizard
  extends React.Component<LayoutSelectionWizardProps, LayoutSelectionWizardState>
  implements AdaptableWizardStep {
  constructor(props: LayoutSelectionWizardProps) {
    super(props);
    this.state = {
      LayoutSource: LayoutSource.Existing,
    };
  }

  render(): any {
    return (
      <WizardPanel>
        <HelpBlock>
          Create a new layout using the Grid's current Columns and Sort Order (but not any Grouping
          or Pivoting details).
        </HelpBlock>

        <Flex alignItems="center" marginLeft={2} marginTop={2}>
          <Radio
            value="Existing"
            marginRight={2}
            checked={this.state.LayoutSource == LayoutSource.Existing}
            onChange={(_: boolean, e: any) => this.onScopeSelectChanged(e)}
          >
            Copy current Grid setup
          </Radio>
        </Flex>

        <HelpBlock marginTop={2}>
          Build a new layout from scratch. You will select the Columns, Sort Order, Grouping and
          Pivoting in the following steps.
        </HelpBlock>

        <Flex alignItems="center" marginLeft={2} marginTop={2}>
          <Radio
            value="New"
            marginRight={2}
            checked={this.state.LayoutSource == LayoutSource.New}
            onChange={(_, e) => this.onScopeSelectChanged(e)}
          >
            Create a new Layout
          </Radio>
        </Flex>
      </WizardPanel>
    );
  }

  private onScopeSelectChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    if (e.value == 'Existing') {
      this.setState({ LayoutSource: LayoutSource.Existing } as LayoutSelectionWizardState, () =>
        this.props.UpdateGoBackState()
      );
    } else {
      this.setState(
        { LayoutSource: LayoutSource.New, ColumnId: '' } as LayoutSelectionWizardState,
        () => this.props.UpdateGoBackState()
      );
    }
  }

  public canNext(): boolean {
    return true;
  }
  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    if (this.state.LayoutSource == LayoutSource.Existing) {
      // need to popuplate the layout
      let visibleColumns = this.props.Columns.filter(c => c.Visible).map(c => c.ColumnId);
      this.props.Data.Columns = visibleColumns;
      this.props.Data.ColumnSorts = this.props.ColumnSorts;
    }
  }
  public Back(): void {
    // todo
  }
  public GetIndexStepIncrement() {
    return this.state.LayoutSource == LayoutSource.Existing ? 8 : 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
