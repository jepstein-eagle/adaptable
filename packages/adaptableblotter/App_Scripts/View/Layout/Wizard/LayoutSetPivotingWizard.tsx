import * as React from 'react';

import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import WizardPanel from '../../../components/WizardPanel';
import { Flex } from 'rebass';
import HelpBlock from '../../../components/HelpBlock';
import Checkbox from '../../../components/CheckBox';
import { Layout } from '../../../PredefinedConfig/LayoutState';
import { LayoutHelper } from '../../../Utilities/Helpers/LayoutHelper';
import { ObjectFactory } from '../../../Utilities/ObjectFactory';

export interface LayoutSetPivotingWizardProps extends AdaptableWizardStepProps<Layout> {}
export interface LayoutSetPivotingWizardState {
  IsPivotLayout: boolean;
}

export class LayoutSetPivotingWizard
  extends React.Component<LayoutSetPivotingWizardProps, LayoutSetPivotingWizardState>
  implements AdaptableWizardStep {
  constructor(props: LayoutSetPivotingWizardProps) {
    super(props);
    this.state = {
      IsPivotLayout: LayoutHelper.isPivotedLayout(this.props.Data.PivotDetails),
    };
  }

  render(): any {
    return (
      <WizardPanel>
        <HelpBlock marginBottom={2}>
          Check the box to create a <b>Pivoted Layout</b> (one which uses Aggregation).
        </HelpBlock>
        <Flex flexDirection="row" alignItems="center">
          <Checkbox
            marginLeft={2}
            marginRight={2}
            onChange={(checked: boolean) => this.onCreatePivotLayoutChanged(checked)}
            checked={this.state.IsPivotLayout}
          >
            Create Pivot Layout
          </Checkbox>{' '}
        </Flex>
        {this.state.IsPivotLayout && (
          <HelpBlock marginTop={2}>
            There are 3 sets of columns that make up a Pivot Layout: <br />
            <ul>
              <li>
                <b>Groupable Columns</b>: These are colums which will be grouped in the pivot (on
                the left hand side).
                <br /> <br />
              </li>
              <li>
                <b>Header Columns</b>: These are the colums which will form the pivot header.
                <br /> <br />
              </li>
              <li>
                <b>Aggregateable Columns</b>: These are (typically numeric) colums which will be
                aggregated in the pivot.
                <br /> <br />
              </li>
            </ul>
            These column sets can be created in the next wizard steps.
            <br />
            <br />
            At least one of these column sets must be provided for the Layout to open in Pivot View.
            <br />
          </HelpBlock>
        )}
      </WizardPanel>
    );
  }

  private onCreatePivotLayoutChanged(checked: boolean) {
    this.setState({ IsPivotLayout: checked } as LayoutSetPivotingWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return true;
  }

  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    if (this.state.IsPivotLayout) {
      if (!this.props.Data.PivotDetails) {
        this.props.Data.PivotDetails = ObjectFactory.CreateEmptyPivotDetails();
      }
    } else {
      this.props.Data.PivotDetails = null;
    }
  }

  public Back(): void {
    /* no implementation */
  }
  public GetIndexStepIncrement() {
    return this.state.IsPivotLayout ? 1 : 4;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
