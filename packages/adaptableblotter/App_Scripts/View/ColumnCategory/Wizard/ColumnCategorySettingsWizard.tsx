import * as React from 'react';
import { ControlLabel, FormGroup, FormControl, Col, Panel, HelpBlock } from 'react-bootstrap';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { AdaptableBlotterForm } from '../../Components/Forms/AdaptableBlotterForm';
import { ArrayExtensions } from '../../../Utilities/Extensions/ArrayExtensions';
import { PRIMARY_BSSTYLE } from '../../../Utilities/Constants/StyleConstants';
import { ColumnCategory } from '../../../PredefinedConfig/IUserState/ColumnCategoryState';

export interface ColumnCategorySettingsWizardProps
  extends AdaptableWizardStepProps<ColumnCategory> {
  ColumnCategorys: ColumnCategory[];
}

export interface ColumnCategorySettingsWizardState {
  ColumnCategoryId: string;
  ErrorMessage: string;
}

export class ColumnCategorySettingsWizard
  extends React.Component<ColumnCategorySettingsWizardProps, ColumnCategorySettingsWizardState>
  implements AdaptableWizardStep {
  constructor(props: ColumnCategorySettingsWizardProps) {
    super(props);
    this.state = {
      ColumnCategoryId: props.Data.ColumnCategoryId,
      ErrorMessage: null,
    };
  }
  render(): any {
    let cssClassName: string = this.props.cssClassName + '-settings';

    let validationState: 'error' | null = StringExtensions.IsNullOrEmpty(this.state.ErrorMessage)
      ? null
      : 'error';

    return (
      <div className={cssClassName}>
        <Panel header="Column Category Settings" bsStyle={PRIMARY_BSSTYLE}>
          <AdaptableBlotterForm horizontal>
            <FormGroup controlId="ColumnCategoryName">
              <Col xs={3} componentClass={ControlLabel}>
                {' '}
                Name:{' '}
              </Col>
              <Col xs={7}>
                <FormGroup controlId="formInlineName" validationState={validationState}>
                  <FormControl
                    value={this.state.ColumnCategoryId}
                    type="string"
                    placeholder="Enter name for Column Category"
                    onChange={e => this.onColumnCategoryNameChange(e)}
                  />
                  <FormControl.Feedback />
                  <HelpBlock>{this.state.ErrorMessage}</HelpBlock>
                </FormGroup>
              </Col>
            </FormGroup>
            <Col xs={1}> </Col>
          </AdaptableBlotterForm>
        </Panel>
      </div>
    );
  }

  onColumnCategoryNameChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState(
      {
        ColumnCategoryId: e.value,
        ErrorMessage: ArrayExtensions.ContainsItem(
          this.props.ColumnCategorys.map(s => s.ColumnCategoryId),
          e.value
        )
          ? 'A Column Category already exists with that name'
          : null,
      } as ColumnCategorySettingsWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return (
      StringExtensions.IsNotEmpty(this.state.ColumnCategoryId) &&
      StringExtensions.IsNullOrEmpty(this.state.ErrorMessage)
    );
  }

  public canBack(): boolean {
    return true;
  }

  public Next(): void {
    this.props.Data.ColumnCategoryId = this.state.ColumnCategoryId;
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
