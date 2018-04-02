import * as React from "react";
import { DataType, SelectionMode, RangeOperandType } from '../../Core/Enums'
import { IRange } from '../../Core/Interface/IRange'
import { LeafExpressionOperator } from '../../Core/Enums'
import { PanelWithButton } from '../Components/Panels/PanelWithButton'
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper'
import { DropdownButton, MenuItem, InputGroup, FormControl, Button, FormGroup, OverlayTrigger, Tooltip, Glyphicon, Panel, Checkbox, Radio } from 'react-bootstrap';
import { IColumn } from "../../Core/Interface/IColumn";
import { UIHelper } from "../UIHelper";
import { ColumnSelector } from "../Components/Selectors/ColumnSelector";
import { AdaptableBlotterForm } from "../Components/Forms/AdaptableBlotterForm";
import { EnumExtensions } from "../../Core/Extensions/EnumExtensions";
import { ObjectFactory } from '../../Core/ObjectFactory'

export interface ExpressionBuilderRangesProps extends React.ClassAttributes<ExpressionBuilderRanges> {
    SelectedColumn: IColumn
    Ranges: Array<IRange>
    Columns: Array<IColumn>
    onRangesChange: (Ranges: Array<IRange>) => void
}

export class ExpressionBuilderRanges extends React.Component<ExpressionBuilderRangesProps, {}> {

    render() {

        let selectedColumnDataType = this.props.SelectedColumn.DataType
        let rangesElement: JSX.Element[] = null
        if (selectedColumnDataType == DataType.Number || selectedColumnDataType == DataType.Date) {
            rangesElement = this.props.Ranges.map((range, index) => {
                let numericAndDateOption = <DropdownButton bsSize="small" style={leafOperatorStyle} title={ExpressionHelper.OperatorToLongFriendlyString(range.Operator, selectedColumnDataType)} id="numericAndDateOption2" componentClass={InputGroup.Button}>
                    <MenuItem onClick={() => this.onLeafExpressionOperatorChanged(index, LeafExpressionOperator.Unknown)}>{ExpressionHelper.OperatorToLongFriendlyString(LeafExpressionOperator.Unknown, selectedColumnDataType)}</MenuItem>
                    <MenuItem onClick={() => this.onLeafExpressionOperatorChanged(index, LeafExpressionOperator.GreaterThan)}>{ExpressionHelper.OperatorToLongFriendlyString(LeafExpressionOperator.GreaterThan, selectedColumnDataType)}</MenuItem>
                    <MenuItem onClick={() => this.onLeafExpressionOperatorChanged(index, LeafExpressionOperator.GreaterThanOrEqual)}>{ExpressionHelper.OperatorToLongFriendlyString(LeafExpressionOperator.GreaterThanOrEqual, selectedColumnDataType)}</MenuItem>
                    <MenuItem onClick={() => this.onLeafExpressionOperatorChanged(index, LeafExpressionOperator.LessThan)}>{ExpressionHelper.OperatorToLongFriendlyString(LeafExpressionOperator.LessThan, selectedColumnDataType)}</MenuItem>
                    <MenuItem onClick={() => this.onLeafExpressionOperatorChanged(index, LeafExpressionOperator.LessThanOrEqual)}>{ExpressionHelper.OperatorToLongFriendlyString(LeafExpressionOperator.LessThanOrEqual, selectedColumnDataType)}</MenuItem>
                    <MenuItem onClick={() => this.onLeafExpressionOperatorChanged(index, LeafExpressionOperator.Equals)}>{ExpressionHelper.OperatorToLongFriendlyString(LeafExpressionOperator.Equals, selectedColumnDataType)}</MenuItem>
                    <MenuItem onClick={() => this.onLeafExpressionOperatorChanged(index, LeafExpressionOperator.NotEquals)}>{ExpressionHelper.OperatorToLongFriendlyString(LeafExpressionOperator.NotEquals, selectedColumnDataType)}</MenuItem>
                    <MenuItem onClick={() => this.onLeafExpressionOperatorChanged(index, LeafExpressionOperator.Between)}>{ExpressionHelper.OperatorToLongFriendlyString(LeafExpressionOperator.Between, selectedColumnDataType)}</MenuItem>
                </DropdownButton>


let optionRangeTypes = EnumExtensions.getNames(RangeOperandType).map((rangeOperandType: RangeOperandType) => {
    return <MenuItem key={index+rangeOperandType} eventKey="index" onClick={() => this.onRangeTypeChanged(index, rangeOperandType)}>{rangeOperandType as RangeOperandType}</MenuItem>
})

                return <Panel key={index} bsStyle="primary" className="small-padding-panel">
                    <div className="no_padding_medium_margin_style">
                        <AdaptableBlotterForm horizontal key={index}>
                            <FormGroup controlId={"Range" + index}>

                                <InputGroup>
                                    {numericAndDateOption}
                                    <InputGroup.Button>
                                        <OverlayTrigger overlay={<Tooltip id="tooltipDelete">Delete</Tooltip>}>
                                            <Button style={deleteButtonStyle} bsSize="small" onClick={() => this.onRangeDelete(index)}><Glyphicon glyph="trash" /></Button>
                                        </OverlayTrigger>
                                    </InputGroup.Button>
                                </InputGroup>


                                <FormGroup controlId="formInlineName">
                                    <InputGroup>
                                        <DropdownButton style={rangeOperatorStyle} bsSize="small"  title={range.Operand1Type} id="range_operand1Type" componentClass={InputGroup.Button}  >
                                            {optionRangeTypes}
                                        </DropdownButton>

                                        {range.Operand1Type == RangeOperandType.Column ?
                                            <ColumnSelector SelectedColumnIds={[range.Operand1]}
                                                ColumnList={this.props.Columns.filter(c => c.DataType == selectedColumnDataType && c.ColumnId != this.props.SelectedColumn.ColumnId)}
                                                onColumnChange={columns => this.onColumnOperand1SelectedChanged(index, columns)}
                                                SelectionMode={SelectionMode.Single} />
                                            :
                                            this.getOperand1FormControl(index, range)
                                        }
                                    </InputGroup>
                                </FormGroup>
                                {range.Operator == LeafExpressionOperator.Between &&
                                    <div style={betweenDivStyle}>
                                        {range.Operand2Type == RangeOperandType.Column ?
                                            <div style={textBoxStyle}>
                                                <ColumnSelector SelectedColumnIds={[range.Operand2]}
                                                    ColumnList={this.props.Columns.filter(c => c.DataType == selectedColumnDataType && c.ColumnId != this.props.SelectedColumn.ColumnId)}
                                                    onColumnChange={columns => this.onColumnOperand2SelectedChanged(index, columns)}
                                                    SelectionMode={SelectionMode.Single} />
                                            </div> :
                                            <div>
                                                {this.getOperand2FormControl(index, range)}
                                            </div>
                                        }
                                    </div>
                                }

                            </FormGroup>
                        </AdaptableBlotterForm>
                    </div>
                </Panel>

            })
        }
        else if (selectedColumnDataType == DataType.String) {
            rangesElement = this.props.Ranges.map((range, index) => {
                let stringOption = <DropdownButton bsSize="small" style={leafOperatorStyle} title={ExpressionHelper.OperatorToShortFriendlyString(range.Operator)} id="stringOption2" componentClass={InputGroup.Button}>
                    <MenuItem onClick={() => this.onLeafExpressionOperatorChanged(index, LeafExpressionOperator.Unknown)}>{ExpressionHelper.OperatorToShortFriendlyString(LeafExpressionOperator.Unknown)}</MenuItem>
                    <MenuItem onClick={() => this.onLeafExpressionOperatorChanged(index, LeafExpressionOperator.Contains)}>{ExpressionHelper.OperatorToShortFriendlyString(LeafExpressionOperator.Contains)}</MenuItem>
                    <MenuItem onClick={() => this.onLeafExpressionOperatorChanged(index, LeafExpressionOperator.NotContains)}>{ExpressionHelper.OperatorToShortFriendlyString(LeafExpressionOperator.NotContains)}</MenuItem>
                    <MenuItem onClick={() => this.onLeafExpressionOperatorChanged(index, LeafExpressionOperator.StartsWith)}>{ExpressionHelper.OperatorToShortFriendlyString(LeafExpressionOperator.StartsWith)}</MenuItem>
                    <MenuItem onClick={() => this.onLeafExpressionOperatorChanged(index, LeafExpressionOperator.EndsWith)}>{ExpressionHelper.OperatorToShortFriendlyString(LeafExpressionOperator.EndsWith)}</MenuItem>
                    <MenuItem onClick={() => this.onLeafExpressionOperatorChanged(index, LeafExpressionOperator.Regex)}>{ExpressionHelper.OperatorToShortFriendlyString(LeafExpressionOperator.Regex)}</MenuItem>
                </DropdownButton>
                return <AdaptableBlotterForm key={index} >
                    <FormGroup controlId={"Range" + index}>
                        <InputGroup>
                            {stringOption}
                            <InputGroup.Button>
                                <OverlayTrigger overlay={<Tooltip id="tooltipDelete">Delete</Tooltip>}>
                                    <Button style={deleteButtonStyle} bsSize="small" onClick={() => this.onRangeDelete(index)}><Glyphicon glyph="trash" /></Button>
                                </OverlayTrigger>
                            </InputGroup.Button>
                        </InputGroup>
                        {range.Operand1Type == RangeOperandType.Column ?
                            <div style={textBoxStyle}>
                                <ColumnSelector SelectedColumnIds={[range.Operand1]}
                                    ColumnList={this.props.Columns.filter(c => c.DataType == selectedColumnDataType && c.ColumnId != this.props.SelectedColumn.ColumnId)}
                                    onColumnChange={columns => this.onColumnOperand1SelectedChanged(index, columns)}
                                    SelectionMode={SelectionMode.Single} />
                            </div> :
                            <div>
                                {this.getOperand1FormControl(index, range)}
                            </div>
                        }
                    </FormGroup>
                </AdaptableBlotterForm>
            })
        }

        return <PanelWithButton headerText={"Ranges"} className="no-padding-panel" bsStyle="info" style={divStyle}
            buttonClick={() => this.addRange()}
            buttonContent={"Add Range"}>
            {rangesElement}
        </PanelWithButton>
    }


    getOperand1FormControl(index: number, range: IRange): any {
        return <FormControl bsSize={"small"} style={textBoxStyle} value={String(range.Operand1)} type={UIHelper.getDescriptionForDataType(this.props.SelectedColumn.DataType)} placeholder={UIHelper.getPlaceHolderforDataType(this.props.SelectedColumn.DataType)} onChange={(e) => this.onOperand1Edit(index, e)} />
    }

    getOperand2FormControl(index: number, range: IRange): any {
        return <FormControl style={textBoxStyle} value={String(range.Operand2)} type={UIHelper.getDescriptionForDataType(this.props.SelectedColumn.DataType)} placeholder={UIHelper.getPlaceHolderforDataType(this.props.SelectedColumn.DataType)} onChange={(e) => this.onOperand2Edit(index, e)} />
    }

    onRangeDelete(index: number) {
        let newCol = [].concat(this.props.Ranges)
        newCol.splice(index, 1)
        this.props.onRangesChange(newCol)
    }

    private addRange() {
        this.props.onRangesChange([].concat(this.props.Ranges, ObjectFactory.CreateEmptyRange()))
    }

    private onLeafExpressionOperatorChanged(index: number, x: LeafExpressionOperator) {
        let rangeCol: Array<IRange> = [].concat(this.props.Ranges)
        let range = this.props.Ranges[index]
        rangeCol[index] = Object.assign({}, range, { Operator: x })
        this.props.onRangesChange(rangeCol)
    }

    private onRangeTypeChanged(index: number, rangeOperandType: RangeOperandType): any {
       let rangeCol: Array<IRange> = [].concat(this.props.Ranges)
        let range = this.props.Ranges[index]
        rangeCol[index] = Object.assign({}, range, { Operand1Type: rangeOperandType})
        this.props.onRangesChange(rangeCol)
    }

    private onOperand1Edit(index: number, x: React.FormEvent<any>) {
        let e = x.target as HTMLInputElement;
        let rangeCol: Array<IRange> = [].concat(this.props.Ranges)
        let range = this.props.Ranges[index]
        rangeCol[index] = Object.assign({}, range, { Operand1: e.value })
        this.props.onRangesChange(rangeCol)
    }

    private onOperand2Edit(index: number, x: React.FormEvent<any>) {
        let e = x.target as HTMLInputElement;
        let rangeCol: Array<IRange> = [].concat(this.props.Ranges)
        let range = this.props.Ranges[index]
        rangeCol[index] = Object.assign({}, range, { Operand2: e.value })
        this.props.onRangesChange(rangeCol)
    }

   
    private onColumnOperand1SelectedChanged(index: number, columns: IColumn[]) {
        let rangeCol: Array<IRange> = [].concat(this.props.Ranges)
        let range = this.props.Ranges[index]
        let selectedColumn: string = columns.length > 0 ? columns[0].ColumnId : ""
        rangeCol[index] = Object.assign({}, range, { Operand1: selectedColumn })
        this.props.onRangesChange(rangeCol)
    }

    private onColumnOperand2SelectedChanged(index: number, columns: IColumn[]) {
        let rangeCol: Array<IRange> = [].concat(this.props.Ranges)
        let range = this.props.Ranges[index]
        let selectedColumn: string = columns.length > 0 ? columns[0].ColumnId : ""
        rangeCol[index] = Object.assign({}, range, { Operand2: selectedColumn })
        this.props.onRangesChange(rangeCol)
    }
}

let divStyle: React.CSSProperties = {
    'overflowY': 'auto',
    'overflowX': 'hidden',
    'height': '475px',
    'maxHeight': '475px',
    'marginBottom': '0'
}

let betweenDivStyle: React.CSSProperties = {
    'marginTop': '10'
}



let leafOperatorStyle = {
    'width': '185px',
    'marginLeft': '10px',
    'marginTop': '10px',
}

let deleteButtonStyle = {
    'marginTop': '10px',
    'marginRight': '20px'
}

let rangeOperatorStyle = {
    'width': '80px',
    'marginLeft': '10px',
}



let textBoxStyle = {
    'width': '150px',
    'marginLeft': '4px',
    'marginTop': '0px'
}




let betweenAddOnStyle = { marginLeft: '41px' }