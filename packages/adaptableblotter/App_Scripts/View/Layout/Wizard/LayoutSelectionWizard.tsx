import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';

import { LayoutSource } from '../../../PredefinedConfig/Common/Enums';

import { AdaptablePopover } from '../../AdaptablePopover';
import { Layout, ColumnSort } from '../../../PredefinedConfig/RunTimeState/LayoutState';

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
    let cssClassName: string = this.props.cssClassName + '-selection';

    return (
      <WizardPanel header="Select Source for Layout">
        <HelpBlock>
          <p>
            Choose whether to create a new layout using the Grid's current columns and sort order.
          </p>
          <p>Alternatively, choose to build a new layout from scratch.</p>
        </HelpBlock>

        <Flex alignItems="center" marginLeft={2} marginTop={2}>
          <Radio
            value="Existing"
            marginRight={2}
            checked={this.state.LayoutSource == LayoutSource.Existing}
            onChange={(_: boolean, e: any) => this.onScopeSelectChanged(e)}
          >
            Copy current Grid setup
          </Radio>{' '}
          <AdaptablePopover
            cssClassName={cssClassName}
            headerText={'Layout:  Current Grid'}
            bodyText={[
              'The new layout will contain the current column order and sort order in the grid.',
            ]}
          />
        </Flex>
        <Flex alignItems="center" marginLeft={2} marginTop={2}>
          <Radio
            value="New"
            marginRight={2}
            checked={this.state.LayoutSource == LayoutSource.New}
            onChange={(_, e) => this.onScopeSelectChanged(e)}
          >
            Create a new Layout
          </Radio>{' '}
          <AdaptablePopover
            cssClassName={cssClassName}
            headerText={'Layout: New'}
            bodyText={[
              'Build the layout yourself by selecting columns and sort order (in following steps).',
            ]}
          />
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
    return this.state.LayoutSource == LayoutSource.Existing ? 3 : 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
