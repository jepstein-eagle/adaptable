import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { FontWeight, FontStyle, FontSize } from '../../../PredefinedConfig/Common/Enums';
import { StyleComponent } from '../../Components/StyleComponent';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { UIHelper } from '../../UIHelper';
import { AdaptableStyle } from '../../../PredefinedConfig/Common/AdaptableStyle';
import { FormatColumn } from '../../../PredefinedConfig/FormatColumnState';

export interface FormatColumnStyleWizardProps extends AdaptableWizardStepProps<FormatColumn> {
  ColorPalette: string[];
  StyleClassNames: string[];
}

export interface FormatColumnStyleWizardState {
  Style: AdaptableStyle;
}

export class FormatColumnStyleWizard
  extends React.Component<FormatColumnStyleWizardProps, FormatColumnStyleWizardState>
  implements AdaptableWizardStep {
  constructor(props: FormatColumnStyleWizardProps) {
    super(props);
    this.state = { Style: this.props.Data.Style };
  }

  render() {
    let canUseClassName = true; // get from somewhere...

    return (
      <div>
        <StyleComponent
          ColorPalette={this.props.ColorPalette}
          StyleClassNames={this.props.StyleClassNames}
          Style={this.props.Data.Style}
          UpdateStyle={(style: AdaptableStyle) => this.onUpdateStyle(style)}
          CanUseClassName={canUseClassName}
        />
      </div>
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
    // todo
  }

  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }

  private onUpdateStyle(style: AdaptableStyle) {
    this.setState({ Style: style } as FormatColumnStyleWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }
}
