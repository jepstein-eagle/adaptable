import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';

import { Layout } from '../../../PredefinedConfig/LayoutState';
import WizardPanel from '../../../components/WizardPanel';
import FormLayout, { FormRow } from '../../../components/FormLayout';
import Input from '../../../components/Input';
import { LayoutEditor } from './LayoutEditor';
import { ArrayExtensions } from '../../../Utilities/Extensions/ArrayExtensions';
import ErrorBox from '../../../components/ErrorBox';

export interface LayoutEditorWizardProps extends AdaptableWizardStepProps<Layout> {
  Layouts: Layout[];
}

export interface LayoutEditorWizardState {
  layoutName: string;
  layout: Layout;
  ErrorMessage: string;
}

export class LayoutEditorWizard
  extends React.Component<LayoutEditorWizardProps, LayoutEditorWizardState>
  implements AdaptableWizardStep {
  constructor(props: LayoutEditorWizardProps) {
    super(props);
    this.state = {
      layout: props.Data,
      layoutName: props.Data.Name,
      ErrorMessage: null,
    };
  }

  render(): any {
    return (
      <WizardPanel pb={2}>
        <FormLayout columns={[1]} mb={2}>
          <FormRow>
            <Input
              value={this.state.layoutName}
              width="100%"
              style={{ maxWidth: '20rem' }}
              placeholder="Layout Name"
              onChange={this.onLayoutNameChange}
            ></Input>{' '}
          </FormRow>

          {this.state.ErrorMessage ? (
            <FormRow>
              <ErrorBox>{this.state.ErrorMessage}</ErrorBox>
            </FormRow>
          ) : null}
        </FormLayout>

        <LayoutEditor
          api={this.props.Api}
          layout={this.state.layout}
          onLayoutChange={this.onLayoutChange}
        />
      </WizardPanel>
    );
  }

  onLayoutNameChange = (event: React.FormEvent<any>) => {
    //TODO continue here when Radu returns
    // Jonny uncommented return so could do initial testing
    // return;
    const Name = (event.target as HTMLInputElement).value;
    const Exists = ArrayExtensions.ContainsItem(
      this.props.Layouts.map(l => l.Name),
      Name
    );

    const ErrorMessage = Exists
      ? 'A Layout already exists with that name'
      : !Name
      ? 'Layout name cannot be blank'
      : null;

    this.setState(
      {
        layoutName: Name,
        ErrorMessage: ErrorMessage || null,
      },
      () => {
        this.props.UpdateGoBackState();
      }
    );
  };

  onLayoutChange = (layout: Layout) => {
    this.setState({ layout }, () => {
      this.props.UpdateGoBackState();
    });
  };

  public canNext(): boolean {
    return !!this.state.layoutName && !this.state.ErrorMessage;
  }
  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    Object.keys(this.props.Data).forEach(key => {
      delete (this.props.Data as any)[key];
    });
    // TODO: Radu to fix properly but Jonny added this temporarily so could create new layouts and edit for testing!
    this.state.layout.Name = this.state.layoutName;

    Object.assign(this.props.Data, this.state.layout);
  }
  public Back(): void {}
  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
