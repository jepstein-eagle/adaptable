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
      <WizardPanel>
        <FormLayout columns={['label', 'children']} mb={2} width="30rem">
          <FormRow label="Layout Name">
            <Input
              value={this.state.layoutName}
              width="100%"
              autoFocus
              placeholder="Type a name"
              onChange={this.onLayoutNameChange}
            ></Input>{' '}
          </FormRow>

          {this.state.ErrorMessage ? (
            <FormRow label="">
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
    const Name = (event.target as HTMLInputElement).value;

    const ErrorMessage = this.getErrorMessage({ ...this.state, layoutName: Name });

    this.updateLayout({ Name });
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

  getErrorMessage = ({ layout, layoutName }: { layout: Layout; layoutName: string }): string => {
    const Exists = this.props.Layouts.find(l => l.Name === layoutName && l.Uuid !== layout.Uuid);

    let ErrorMessage = Exists
      ? 'A Layout already exists with that name'
      : !layoutName
      ? 'Layout name cannot be blank'
      : null;

    // if (!ErrorMessage && !layout.Columns.length) {
    //   ErrorMessage = 'A Layout must have at least one visible column';
    // }

    return ErrorMessage;
  };

  updateLayout = (layout: Partial<Layout>) => {
    const updatedLayout = { ...this.state.layout, ...layout } as Layout;

    Object.assign(this.props.Data, updatedLayout);
    this.setState({
      layout: updatedLayout,
    });
  };

  onLayoutChange = (layout: Layout) => {
    this.updateLayout(layout);

    this.setState(
      { layout, ErrorMessage: this.getErrorMessage({ layout, layoutName: this.state.layoutName }) },
      () => {
        this.props.UpdateGoBackState();
      }
    );
  };

  getLayout = () => {
    return { ...this.state.layout, Name: this.state.layoutName };
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

    const layout = this.getLayout();

    Object.assign(this.props.Data, layout);
  }
  public Back(): void {}
  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
