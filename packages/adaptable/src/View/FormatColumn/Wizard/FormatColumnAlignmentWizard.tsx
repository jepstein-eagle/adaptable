import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { FormatColumn } from '../../../PredefinedConfig/FormatColumnState';
import { Flex } from 'rebass';
import Panel from '../../../components/Panel';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import FormLayout, { FormRow } from '../../../components/FormLayout';
import Dropdown from '../../../components/Dropdown';

export interface FormatColumnAlignmentWizardProps extends AdaptableWizardStepProps<FormatColumn> {}

export interface FormatColumnAlignmentWizardState {
  CellAlignment: 'Left' | 'Right' | 'Center';
}

export class FormatColumnAlignmentWizard
  extends React.Component<FormatColumnAlignmentWizardProps, FormatColumnAlignmentWizardState>
  implements AdaptableWizardStep {
  column: AdaptableColumn;
  constructor(props: FormatColumnAlignmentWizardProps) {
    super(props);
    this.state = { CellAlignment: this.props.Data.CellAlignment };
  }

  render() {
    return (
      <Panel header="Format" margin={2}>
        <Flex flexDirection="row">
          <FormLayout>
            {' '}
            <FormRow label="Cell Alignment">
              <Dropdown
                value={this.state.CellAlignment}
                onChange={cellAlignment => this.onCellAlignmentSelectChanged(cellAlignment)}
                options={[
                  { value: 'Left', label: 'Left' },
                  { value: 'Right', label: 'Right' },
                  { value: 'Center', label: 'Center' },
                ]}
              />
            </FormRow>
          </FormLayout>
        </Flex>
      </Panel>
    );
  }

  private onCellAlignmentSelectChanged(cellAlignment?: 'Left' | 'Right' | 'Center') {
    this.setState({ CellAlignment: cellAlignment } as FormatColumnAlignmentWizardState, () =>
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
    this.props.Data.CellAlignment = this.state.CellAlignment;
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
