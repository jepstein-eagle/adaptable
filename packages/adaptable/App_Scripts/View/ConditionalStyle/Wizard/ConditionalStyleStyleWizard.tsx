import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StyleComponent } from '../../Components/StyleComponent';
import { UIHelper } from '../../UIHelper';
import { AdaptableStyle } from '../../../PredefinedConfig/Common/AdaptableStyle';
import { ConditionalStyle } from '../../../PredefinedConfig/ConditionalStyleState';

export interface ConditionalStyleStyleWizardProps
  extends AdaptableWizardStepProps<ConditionalStyle> {
  ColorPalette: string[];
  StyleClassNames: string[];
}

export interface ConditionalStyleStyleWizardState {
  Style: AdaptableStyle;
}

export class ConditionalStyleStyleWizard
  extends React.Component<ConditionalStyleStyleWizardProps, ConditionalStyleStyleWizardState>
  implements AdaptableWizardStep {
  constructor(props: ConditionalStyleStyleWizardProps) {
    super(props);
    this.state = { Style: this.props.Data.Style };
  }

  render() {
    let canUseClassName = true; // get from somewhere...
    return (
      <div style={{ height: '100%' }}>
        <StyleComponent
          style={{ height: '100%' }}
          ColorPalette={this.props.ColorPalette}
          StyleClassNames={this.props.StyleClassNames}
          Style={this.props.Data.Style}
          UpdateStyle={(style: AdaptableStyle) => this.onUpdateStyle(style)}
          CanUseClassName={canUseClassName}
        />
      </div>
    );
  }

  private onUpdateStyle(style: AdaptableStyle) {
    this.setState({ Style: style } as ConditionalStyleStyleWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return UIHelper.IsNotEmptyStyle(this.state.Style);
  }
  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.Style = this.state.Style;
  }
  public Back(): void {
    // todod
  }
  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
