import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';

import { Layout } from '../../../PredefinedConfig/LayoutState';
import { ArrayExtensions } from '../../../Utilities/Extensions/ArrayExtensions';
import WizardPanel from '../../../components/WizardPanel';
import { Flex, Text } from 'rebass';
import Input from '../../../components/Input';

import ErrorBox from '../../../components/ErrorBox';
import LayoutHelper from '../../../Utilities/Helpers/LayoutHelper';
import HelpBlock from '../../../components/HelpBlock';

export interface LayoutSettingsWizardProps extends AdaptableWizardStepProps<Layout> {
  Layouts: Layout[];
}

export interface LayoutSettingsWizardState {
  LayoutName: string;
  ErrorMessage: string;
}

export class LayoutSettingsWizard
  extends React.Component<LayoutSettingsWizardProps, LayoutSettingsWizardState>
  implements AdaptableWizardStep {
  constructor(props: LayoutSettingsWizardProps) {
    super(props);
    this.state = {
      LayoutName: props.Data.Name,
      ErrorMessage: null,
    };
  }
  render(): any {
    return (
      <WizardPanel>
        <HelpBlock marginBottom={2}>
          Choose a <b>Name</b> for the Layout. This is what will appear in the dropdown in the
          Layout toolbar.
        </HelpBlock>
        <Flex alignItems="center">
          <Text marginRight={2}>Layout Name: </Text>

          <Input
            style={{ flex: 1 }}
            value={this.state.LayoutName}
            type="string"
            placeholder="Enter layout name"
            onChange={(e: any) => this.onLayoutNameChange(e)}
          />
        </Flex>
        {this.state.ErrorMessage ? (
          <ErrorBox marginTop={2}>{this.state.ErrorMessage}</ErrorBox>
        ) : null}
      </WizardPanel>
    );
  }

  onLayoutNameChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState(
      {
        LayoutName: e.value,
        ErrorMessage: ArrayExtensions.ContainsItem(this.props.Layouts.map(l => l.Name), e.value)
          ? 'A Layout already exists with that name'
          : null,
      } as LayoutSettingsWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return (
      StringExtensions.IsNotEmpty(this.state.LayoutName) &&
      StringExtensions.IsNullOrEmpty(this.state.ErrorMessage)
    );
  }

  public canBack(): boolean {
    return true;
  }

  public Next(): void {
    this.props.Data.Name = this.state.LayoutName;
  }
  public Back(): void {
    // todo
  }

  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    // this is wrong as its only decrementing on pivot - but we need someway to know whether its ne or existing
    return LayoutHelper.isPivotedLayout(this.props.Data.PivotDetails) ? 1 : 3;
  }
}
