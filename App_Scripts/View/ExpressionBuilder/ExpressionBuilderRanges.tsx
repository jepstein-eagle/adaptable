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

export interface ExpressionBuilderRangesPropsExpressionBuilderRangesNew extends React.ClassAttributes<ExpressionBuilderRangesNew> {
    SelectedColumn: IColumn
    Ranges: Array<IRange>
    Columns: Array<IColumn>
    onRangesChange: (Ranges: Array<IRange>) => void
}

export class ExpressionBuilderRangesNew extends React.Component<ExpressionBuilderRangesPropsExpressionBuilderRangesNew, {}> {

    render() {

        let selectedColumnDataType = this.props.SelectedColumn.DataType
        let rangesElement: JSX.Element[] = this.props.Ranges.map((range, index) => {

            let optionLeafOperators = ExpressionHelper.GetOperatorsForDataType(selectedColumnDataType).map((operator: LeafExpressionOperator) => {
                return <option key={operator} value={operator}>{ExpressionHelper.OperatorToLongFriendlyString(operator, selectedColumnDataType)}</option>
            })

            let optionRangeTypes = EnumExtensions.getNames(RangeOperandType).map((rangeOperandType: RangeOperandType) => {
                return <option key={index + rangeOperandType} value={rangeOperandType}>{rangeOperandType as RangeOperandType}</option>
            })

            let operationMenuItems = EnumExtensions.getNames(RangeOperandType).map((rangeOperand: RangeOperandType) => {
                return <MenuItem key={index + rangeOperand} eventKey={index + rangeOperand} onClick={() => this.onRangeTypeChangedOld(index, rangeOperand)}>{rangeOperand as RangeOperandType}</MenuItem>
            })

            let deleteButton = <Button bsSize={"small"} bsStyle={"default"} style={deleteButtonStyle} onClick={() => this.onRangeDelete(index)}><Glyphicon glyph="trash" /></Button>

            return <div className="no_padding_medium_margin_style" style={betweenDivStyle}>
                <AdaptableBlotterForm horizontal key={index}>
                    <FormGroup controlId={"Range" + index}>

                        <InputGroup>
                            <FormControl style={dropDownStyle} componentClass="select" placeholder="select" value={range.Operator} onChange={(x) => this.onLeafExpressionOperatorChanged(index, x)} >
                                {optionLeafOperators}
                            </FormControl>
                            <InputGroup.Button>
                                <OverlayTrigger overlay={<Tooltip id="tooltipDelete">Delete</Tooltip>}>
                                    <Button style={deleteButtonStyle} onClick={() => this.onRangeDelete(index)}><Glyphicon glyph="trash" /></Button>
                                </OverlayTrigger>
                            </InputGroup.Button>
                        </InputGroup>


                        <InputGroup>
                            <DropdownButton style={rangeOperatorStyle} title={range.Operand1Type} id="range_operand" componentClass={InputGroup.Button}>
                                {operationMenuItems}
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

                        {range.Operator == LeafExpressionOperator.Between &&
                            <InputGroup>
                                <DropdownButton style={rangeOperatorStyle} title={range.Operand1Type} id="range_operand" componentClass={InputGroup.Button}>
                                    {operationMenuItems}
                                </DropdownButton>

                                {range.Operand1Type == RangeOperandType.Column ?
                                    <ColumnSelector SelectedColumnIds={[range.Operand2]}
                                        ColumnList={this.props.Columns.filter(c => c.DataType == selectedColumnDataType && c.ColumnId != this.props.SelectedColumn.ColumnId)}
                                        onColumnChange={columns => this.onColumnOperand2SelectedChanged(index, columns)}
                                        SelectionMode={SelectionMode.Single} />
                                    :
                                    this.getOperand2FormControl(index, range)
                                }
                            </InputGroup>
                        }

                    </FormGroup>
                </AdaptableBlotterForm>
            </div>
        })

        return <PanelWithButton headerText={"Ranges"} className="no-padding-panel" bsStyle="info" style={divStyle}
            buttonClick={() => this.addRange()}
            buttonContent={"Add Range"}>
            {rangesElement}
        </PanelWithButton>

    }

    getOperand1FormControl(index: number, range: IRange): any {
        return <FormControl style={operandStyle} value={String(range.Operand1)} type={UIHelper.getDescriptionForDataType(this.props.SelectedColumn.DataType)} placeholder={UIHelper.getPlaceHolderforDataType(this.props.SelectedColumn.DataType)} onChange={(e) => this.onOperand1Edit(index, e)} />
    }

    getOperand2FormControl(index: number, range: IRange): any {
        return <FormControl style={operandStyle} value={String(range.Operand2)} type={UIHelper.getDescriptionForDataType(this.props.SelectedColumn.DataType)} placeholder={UIHelper.getPlaceHolderforDataType(this.props.SelectedColumn.DataType)} onChange={(e) => this.onOperand2Edit(index, e)} />
    }

    onRangeDelete(index: number) {
        let newCol = [].concat(this.props.Ranges)
        newCol.splice(index, 1)
        this.props.onRangesChange(newCol)
    }

    private addRange() {
        this.props.onRangesChange([].concat(this.props.Ranges, ObjectFactory.CreateEmptyRange()))
    }

    private onLeafExpressionOperatorChangedOld(index: number, x: LeafExpressionOperator) {
        let rangeCol: Array<IRange> = [].concat(this.props.Ranges)
        let range = this.props.Ranges[index]
        rangeCol[index] = Object.assign({}, range, { Operator: x })
        this.props.onRangesChange(rangeCol)
    }

    private onLeafExpressionOperatorChanged(index: number, event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;

        let rangeCol: Array<IRange> = [].concat(this.props.Ranges)
        let range = this.props.Ranges[index]
        rangeCol[index] = Object.assign({}, range, { Operator: e.value })
        this.props.onRangesChange(rangeCol)
    }

    private onRangeTypeChanged(index: number, event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let rangeCol: Array<IRange> = [].concat(this.props.Ranges)
        let range = this.props.Ranges[index]
        rangeCol[index] = Object.assign({}, range, { Operand1Type: e.value })
        this.props.onRangesChange(rangeCol)
    }

    private onRangeTypeChangedOld(index: number, rangeOperandType: RangeOperandType): any {
        let rangeCol: Array<IRange> = [].concat(this.props.Ranges)
        let range = this.props.Ranges[index]
        rangeCol[index] = Object.assign({}, range, { Operand1Type: rangeOperandType })
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
    'marginBottom': '20px'
}

let deleteButtonStyle = {
    'marginRight': '10px'
}

let dropDownStyle = {
    'width': '195px',
    'marginLeft': '10px',
    'marginRight': '0px',
    'marginTop': '0px'
}

let operandStyle = {
    'width': '170px',
    'marginLeft': '0px',
    'marginRight': '2px',
    'marginTop': '0px'
}

let rangeOperatorStyle = {
    'width': '70px',
    'marginLeft': '10px',
    'marginRight': '0px',
    'marginTop': '0px'
}
let rangePanelStyle = {
    'margin': '0px',
    'padding': '0px'
}
