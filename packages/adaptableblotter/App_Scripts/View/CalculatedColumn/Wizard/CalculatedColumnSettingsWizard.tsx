import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { ArrayExtensions } from '../../../Utilities/Extensions/ArrayExtensions';
import { PRIMARY_BSSTYLE } from '../../../Utilities/Constants/StyleConstants';
import { CalculatedColumn } from '../../../PredefinedConfig/RunTimeState/CalculatedColumnState';
import { Flex, Box, Text } from 'rebass';
import Input from '../../../components/Input';
import HelpBlock from '../../../components/HelpBlock';
import Panel from '../../../components/Panel';

export interface CalculatedColumnSettingsWizardProps
  extends AdaptableWizardStepProps<CalculatedColumn> {}
export interface CalculatedColumnSettingsWizardState {
  ColumnId: string;
  ErrorMessage: string;
}

export class CalculatedColumnSettingsWizard
  extends React.Component<CalculatedColumnSettingsWizardProps, CalculatedColumnSettingsWizardState>
  implements AdaptableWizardStep {
  constructor(props: CalculatedColumnSettingsWizardProps) {
    super(props);
    this.state = { ColumnId: this.props.Data.ColumnId, ErrorMessage: null };
  }
  render(): any {
    let cssClassName: string = this.props.cssClassName + '-settings';

    let validationState: 'error' | null = StringExtensions.IsNullOrEmpty(this.state.ErrorMessage)
      ? null
      : 'error';
    return (
      <div className={cssClassName}>
        <Panel header="Calculated Column Settings" border="none" borderRadius="none">
          <Flex flexDirection="row" alignItems="center">
            <Text>Column Name</Text>

            <Box style={{ flex: 1 }} marginLeft={2} marginRight={2}>
              <Input
                style={{ width: '100%' }}
                value={this.state.ColumnId}
                autoFocus
                type="text"
                placeholder="Enter a name"
                onChange={(e: React.SyntheticEvent) => this.handleColumnNameChange(e)}
              />

              {validationState ? <HelpBlock>{this.state.ErrorMessage}</HelpBlock> : null}
            </Box>
          </Flex>
        </Panel>
      </div>
    );
  }

  handleColumnNameChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState(
      {
        ColumnId: e.value,
        ErrorMessage: ArrayExtensions.ContainsItem(this.props.Columns, e.value)
          ? 'A Column already exists with that name'
          : null,
      },
      () => this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return (
      StringExtensions.IsNotNullOrEmpty(this.state.ColumnId) &&
      StringExtensions.IsNullOrEmpty(this.state.ErrorMessage)
    );
  }
  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.ColumnId = this.state.ColumnId;
  }
  public Back(): void {
    //
  }
  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
