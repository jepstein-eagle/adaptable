import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { IConditionalStyle } from '../../../Strategy/Interface/IConditionalStyleStrategy';
import { IStyle } from '../../../Core/Interface/IStyle';
import { FontWeight, FontStyle, FontSize } from '../../../Core/Enums';
import { StyleComponent } from '../../Components/StyleComponent';
import { Checkbox } from "react-bootstrap";
import { StringExtensions } from "../../../Core/Extensions/StringExtensions";


export interface ConditionalStyleStyleWizardProps extends AdaptableWizardStepProps<IConditionalStyle> {
    ColorPalette: string[]
    StyleClassNames: string[]
}

export interface ConditionalStyleStyleWizardState {
    Style: IStyle,
}

export class ConditionalStyleStyleWizard extends React.Component<ConditionalStyleStyleWizardProps, ConditionalStyleStyleWizardState> implements AdaptableWizardStep {

    constructor(props: ConditionalStyleStyleWizardProps) {
        super(props)
        this.state = { Style: this.props.Data.Style }
    }

    render() {
        let cssClassName: string = this.props.cssClassName + "__style"
       
        let canUseClassName = true; // get from somewhere...
        return <div className={cssClassName}>
       
            <StyleComponent
                 cssClassName={cssClassName}
                 ColorPalette={this.props.ColorPalette}
                StyleClassNames={this.props.StyleClassNames}
                Style={this.props.Data.Style}
                UpdateStyle={(style: IStyle) => this.onUpdateStyle(style)}
                CanUseClassName={canUseClassName}
            />

        </div>
    }

    private onUpdateStyle(style: IStyle) {
        this.setState({ Style: style } as ConditionalStyleStyleWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean {
        return this.state.Style.BackColor != null || this.state.Style.ForeColor != null || this.state.Style.FontWeight != FontWeight.Normal || this.state.Style.FontStyle != FontStyle.Normal || this.state.Style.FontSize != null || StringExtensions.IsNotNullOrEmpty(this.state.Style.ClassName)
    }
    public canBack(): boolean { return true; }
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
    public StepName = this.props.StepName
}


