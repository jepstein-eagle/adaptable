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
import ObjectFactory from '../../../Utilities/ObjectFactory';

export interface FormatColumnStyleWizardProps extends AdaptableWizardStepProps<FormatColumn> {
  StyleClassNames: string[];
}

export interface FormatColumnStyleWizardState {
  Style: AdaptableStyle | undefined;
}

export class FormatColumnStyleWizard
  extends React.Component<FormatColumnStyleWizardProps, FormatColumnStyleWizardState>
  implements AdaptableWizardStep {
  constructor(props: FormatColumnStyleWizardProps) {
    super(props);
    this.state = {
      Style:
        this.props.data.Style == null || this.props.data.Style == undefined
          ? ObjectFactory.CreateEmptyStyle()
          : this.props.data.Style,
    };
  }

  render() {
    let canUseClassName = true; // get from somewhere...

    return (
      <div>
        <StyleComponent
          api={this.props.api}
          StyleClassNames={this.props.StyleClassNames}
          Style={this.state.Style}
          UpdateStyle={(style: AdaptableStyle) => this.onUpdateStyle(style)}
          CanUseClassName={canUseClassName}
        />
      </div>
    );
  }

  public canNext(): boolean {
    //  if (this.state.Style == undefined) {
    //    return true;
    //  }
    //  return UIHelper.IsNotEmptyStyle(this.state.Style);
    // now getting to make this optional
    return true;
  }
  public canBack(): boolean {
    return true;
  }
  public next(): void {
    this.props.data.Style = this.state.Style;
  }
  public back(): void {
    // todo
  }

  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
    return 1;
  }

  private onUpdateStyle(style: AdaptableStyle) {
    this.setState({ Style: style } as FormatColumnStyleWizardState, () =>
      this.props.updateGoBackState()
    );
  }
}
