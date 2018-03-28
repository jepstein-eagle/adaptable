import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../../Wizard/Interface/IAdaptableWizard'
import { IFormatColumn } from '../../../Strategy/Interface/IFormatColumnStrategy';
import { FontWeight, FontStyle, FontSize } from '../../../Core/Enums';
import { StyleComponent } from '../../Components/StyleComponent';
import { IStyle } from '../../../Core/Interface/IStyle';


export interface FormatColumnStyleWizardProps extends AdaptableWizardStepProps<IFormatColumn> {
    ColorPalette: string[]
}

export interface FormatColumnStyleWizardState {
    BackColor: string,
    ForeColor: string,
    FontWeight: FontWeight,
    FontStyle: FontStyle,
    FontSize: FontSize,
}

export class FormatColumnStyleWizard extends React.Component<FormatColumnStyleWizardProps, FormatColumnStyleWizardState> implements AdaptableWizardStep {


    constructor(props: FormatColumnStyleWizardProps) {
        super(props)
        this.mapStyle(this.props.Data.Style)
    }

    render() {
        return <div className="adaptable_blotter_style_wizard_formatcolumn_style">
            <StyleComponent
                ColorPalette={this.props.ColorPalette}
                Style={this.props.Data.Style}
                UpdateStyle={(style: IStyle) => this.onUpdateStyle(style)}
            />
        </div>
    }


    public canNext(): boolean {
        return this.state.BackColor != null || this.state.ForeColor != null || this.state.FontWeight != FontWeight.Normal || this.state.FontStyle != FontStyle.Normal || this.state.FontSize != null;
    }
    public canBack(): boolean { return true; }
    public Next(): void {
        this.props.Data.Style.BackColor = this.state.BackColor;
        this.props.Data.Style.ForeColor = this.state.ForeColor;
        this.props.Data.Style.FontWeight = this.state.FontWeight;
        this.props.Data.Style.FontStyle = this.state.FontStyle;
        this.props.Data.Style.FontSize = this.state.FontSize;
    }
    public Back(): void { }

    public GetIndexStepIncrement(){
        return 1;
    }
    public GetIndexStepDecrement(){
        return 1;
    }

    private onUpdateStyle(style: IStyle) {
        this.mapStyle(style);
        this.props.UpdateGoBackState();
    }

    private mapStyle(style: IStyle): void {
        this.state = {
            BackColor: style.BackColor,
            ForeColor: style.ForeColor,
            FontWeight: style.FontWeight,
            FontStyle: style.FontStyle,
            FontSize: style.FontSize,
        }
    }

    public StepName = this.props.StepName

}


