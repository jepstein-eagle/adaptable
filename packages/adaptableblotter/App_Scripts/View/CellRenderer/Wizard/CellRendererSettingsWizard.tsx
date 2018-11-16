import * as React from "react";
import { Radio, FormGroup, FormControl, Col, Panel, HelpBlock, ControlLabel } from 'react-bootstrap';
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { DataType, LeafExpressionOperator, MessageType, RangeOperandType } from '../../../Core/Enums';
import { StringExtensions } from '../../../Core/Extensions/StringExtensions';
import { AdaptablePopover } from '../../AdaptablePopover';
import { ExpressionHelper } from "../../../Core/Helpers/ExpressionHelper";
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { ICellRenderer, IRange, IPercentCellRenderer } from "../../../Core/Api/Interface/IAdaptableBlotterObjects";
import { ColumnHelper } from "../../../Core/Helpers/ColumnHelper";

export interface CellRenderersWizardProps extends AdaptableWizardStepProps<IPercentCellRenderer> {
    Columns: Array<IColumn>
}
export interface CellRendererSettingsWizardState {
    MinValue: number;
    MaxValue: number;
    PositiveColor: string;
    NegativeColor: string;
}

export class CellRendererSettingsWizard extends React.Component<CellRenderersWizardProps, CellRendererSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: CellRenderersWizardProps) {
        super(props)
        this.state = {
            MinValue: this.props.Data.MinValue,
            MaxValue: this.props.Data.MaxValue,
            PositiveColor: this.props.Data.PositiveColor,
            NegativeColor: this.props.Data.NegativeColor,
          }
    }

    render(): any {

           let cssClassName: string = this.props.cssClassName + "-s"

        return <div className={cssClassName}>
            <Panel header={"hello"} bsStyle="primary">

                <AdaptableBlotterForm >
                   
                <FormGroup controlId="formInlineNumberResult">
                                <Col xs={3}>
                                    <ControlLabel>Value:</ControlLabel>
                                </Col>
                                <Col xs={6}>
                                    <FormControl
                                        type="number"
                                        placeholder="Enter Number"
                                      //  onChange={this.minValueChanged}
                                        value={this.state.MinValue}
                                    />
                                </Col>
                                <Col xs={1}><AdaptablePopover  cssClassName={cssClassName} headerText={"Minimum Value"}
                                    bodyText={["To do"]} MessageType={MessageType.Info} />
                                </Col>
                            </FormGroup>
                   
                </AdaptableBlotterForm>

            

            </Panel>
        </div>



    }

    minValueChanged = (e: any) => {
        this.setState({ MinValue: e.target.value } as CellRendererSettingsWizardState, () => this.props.UpdateGoBackState())
    }


    public canNext(): boolean {
       
        return true;// StringExtensions.IsNotNullOrEmpty(this.state.PositiveColor);
    }

    public canBack(): boolean { return true; }
    public Next(): void {
        
        this.props.Data.MinValue = this.state.MinValue;
        this.props.Data.MaxValue = this.state.MaxValue;
        this.props.Data.PositiveColor = this.state.PositiveColor;
        this.props.Data.NegativeColor = this.state.NegativeColor;
  
    }

    public Back(): void {
        //todo
    }

    public GetIndexStepIncrement() {
        return 1;
    }
    public GetIndexStepDecrement() {
        return 1;
    }
    public StepName = this.props.StepName
}

