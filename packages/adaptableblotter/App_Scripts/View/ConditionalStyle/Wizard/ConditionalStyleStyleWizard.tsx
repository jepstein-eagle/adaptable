import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { FontWeight, FontStyle, FontSize } from '../../../Utilities/Enums';
import { StyleComponent } from '../../Components/StyleComponent';
import { Checkbox } from "react-bootstrap";
import { StringExtensions } from "../../../Utilities/Extensions/StringExtensions";
import { UIHelper } from "../../UIHelper";
import { IConditionalStyle, IStyle } from "../../../api/Interface/IAdaptableBlotterObjects";


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
        let cssClassName: string = this.props.cssClassName + "-style"

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
        return UIHelper.IsNotEmptyStyle(this.state.Style);
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


