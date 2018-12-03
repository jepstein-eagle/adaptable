import * as React from "react";
import { DataType, SelectionMode, RangeOperandType } from '../../Utilities/Enums'
import { LeafExpressionOperator } from '../../Utilities/Enums'
import { PanelWithButton } from '../Components/Panels/PanelWithButton'
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper'
import { DropdownButton, MenuItem, InputGroup, FormControl, Button, FormGroup, OverlayTrigger, Tooltip, Glyphicon, Panel, Checkbox, Radio } from 'react-bootstrap';
import { IColumn } from "../../api/Interface/IColumn";
import { UIHelper } from "../UIHelper";
import { ColumnSelector } from "../Components/Selectors/ColumnSelector";
import { AdaptableBlotterForm } from "../Components/Forms/AdaptableBlotterForm";
import { EnumExtensions } from "../../Utilities/Extensions/EnumExtensions";
import { ObjectFactory } from '../../Utilities/ObjectFactory'
import { IRange } from "../../api/Interface/IAdaptableBlotterObjects";

export interface ExpressionBuilderRangesPropsExpressionBuilderRanges extends React.ClassAttributes<ExpressionBuilderRanges> {
    SelectedColumn: IColumn
    Ranges: Array<IRange>
    Columns: Array<IColumn>
    onRangesChange: (Ranges: Array<IRange>) => void
    cssClassName: string

}

export class ExpressionBuilderRanges extends React.Component<ExpressionBuilderRangesPropsExpressionBuilderRanges, {}> {

    render() {
        let cssClassName: string = this.props.cssClassName + "__queryranges"

        let selectedColumnDataType = this.props.SelectedColumn.DataType
        let addButton = <Button bsSize={"small"} bsStyle={"default"} onClick={() => this.addRange()}><Glyphicon glyph="plus" /> Add Range</Button>

        let rangesElement: JSX.Element[] = this.props.Ranges.map((range, index) => {

            let optionLeafOperators = ExpressionHelper.GetOperatorsForDataType(selectedColumnDataType).map((operator: LeafExpressionOperator) => {
                return <option key={operator} value={operator}>{ExpressionHelper.OperatorToLongFriendlyString(operator, selectedColumnDataType)}</option>
            })

            let rangeMenuItemsOperand1 = EnumExtensions.getNames(RangeOperandType).map((rangeOperand: RangeOperandType) => {
                return <MenuItem key={index + rangeOperand} eventKey={index + rangeOperand} onClick={() => this.onRangeTypeChangedOperand1(index, rangeOperand)}>{rangeOperand}</MenuItem>
            })

            let rangeMenuItemsOperand2 = EnumExtensions.getNames(RangeOperandType).map((rangeOperand: RangeOperandType) => {
                return <MenuItem key={index + rangeOperand} eventKey={index + rangeOperand} onClick={() => this.onRangeTypeChangedOperand2(index, rangeOperand)}>{rangeOperand}</MenuItem>
            })

            let deleteButton = <Button bsSize={"small"} bsStyle={"default"} style={deleteButtonStyle} onClick={() => this.onRangeDelete(index)}><Glyphicon glyph="trash" /></Button>

            return <div className="ab_no_padding_medium_margin" style={betweenDivStyle} key={index}>
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
                            <DropdownButton style={rangeOperatorStyle} title={range.Operand1Type} id="range_operand_1" componentClass={InputGroup.Button}>
                                {rangeMenuItemsOperand1}
                            </DropdownButton>

                            {range.Operand1Type == RangeOperandType.Column ?
                                <ColumnSelector cssClassName={cssClassName} SelectedColumnIds={[range.Operand1]}
                                    ColumnList={this.props.Columns.filter(c => c.DataType == selectedColumnDataType && c.ColumnId != this.props.SelectedColumn.ColumnId)}
                                    onColumnChange={columns => this.onColumnOperand1SelectedChanged(index, columns)}
                                    SelectionMode={SelectionMode.Single} />
                                :
                                this.getOperand1FormControl(index, range)
                            }
                        </InputGroup>

                        {range.Operator == LeafExpressionOperator.Between &&
                            <InputGroup>
                                <DropdownButton style={rangeOperatorStyle} title={range.Operand2Type} id="range_operand_2" componentClass={InputGroup.Button}>
                                    {rangeMenuItemsOperand2}
                                </DropdownButton>

                                {range.Operand2Type == RangeOperandType.Column ?
                                    <ColumnSelector cssClassName={cssClassName} SelectedColumnIds={[range.Operand2]}
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

        return <div className={cssClassName}>
            <Panel className="ab_no-padding-anywhere-panel" style={divStyle}>
                {addButton}
                {rangesElement}
            </Panel>
        </div>
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


    private onLeafExpressionOperatorChanged(index: number, event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;

        let rangeCol: Array<IRange> = [].concat(this.props.Ranges)
        let range = this.props.Ranges[index]
        rangeCol[index] = Object.assign({}, range, { Operator: e.value })
        this.props.onRangesChange(rangeCol)
    }

    private onRangeTypeChangedOperand1(index: number, rangeOperandType: RangeOperandType): any {
        let rangeCol: Array<IRange> = [].concat(this.props.Ranges)
        let range = this.props.Ranges[index]
        rangeCol[index] = Object.assign({}, range, { Operand1Type: rangeOperandType })
        this.props.onRangesChange(rangeCol)
    }

    private onRangeTypeChangedOperand2(index: number, rangeOperandType: RangeOperandType): any {
        let rangeCol: Array<IRange> = [].concat(this.props.Ranges)
        let range = this.props.Ranges[index]
        rangeCol[index] = Object.assign({}, range, { Operand2Type: rangeOperandType })
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
    'height': '350px',
}

let betweenDivStyle: React.CSSProperties = {
    'marginBottom': '20px'
}

let deleteButtonStyle = {
    'marginRight': '10px'
}

let dropDownStyle = {
    'width': '250px',
    'marginLeft': '10px',
    'marginRight': '0px',
    'marginTop': '0px'
}

let operandStyle = {
    'width': '190px',
    'marginLeft': '0px',
    'marginRight': '2px',
    'marginTop': '0px'
}

let rangeOperatorStyle = {
    'width': '100px',
    'marginLeft': '10px',
    'marginRight': '0px',
    'marginTop': '0px'
}
let rangePanelStyle = {
    'margin': '0px',
    'padding': '0px'
}
