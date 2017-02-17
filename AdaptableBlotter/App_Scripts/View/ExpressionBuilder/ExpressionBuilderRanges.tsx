/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { ColumnType } from '../../Core/Enums'
import { IRangeExpression } from '../../Core/Interface/IExpression'
import { LeafExpressionOperator } from '../../Core/Enums'
import { PanelWithButton } from '../PanelWithButton'
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper'
import { DropdownButton, MenuItem, InputGroup, ListGroupItem, ListGroup, Panel, FormControl, Form, Row, Col, Button, FormGroup, OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap';


interface ExpressionBuilderRangesProps extends React.ClassAttributes<ExpressionBuilderRanges> {
    ColumnType: ColumnType
    Ranges: Array<IRangeExpression>
    onRangesChange: (Ranges: Array<IRangeExpression>) => void
}

export class ExpressionBuilderRanges extends React.Component<ExpressionBuilderRangesProps, {}> {
    render() {
        let rangesElement: JSX.Element[] = null
        if (this.props.ColumnType == ColumnType.Number || this.props.ColumnType == ColumnType.Date) {
            rangesElement = this.props.Ranges.map((x, index) => {
                let numericAndDateOption = <DropdownButton style={dropDownNumbDateStyle} title={ExpressionHelper.OperatorToFriendlyString(x.Operator)} id="numericAndDateOption2" componentClass={InputGroup.Button}>
                    <MenuItem onClick={() => this.onLeafExpressionOperatorChange(index, LeafExpressionOperator.Unknown)}>Select operator</MenuItem>
                    <MenuItem onClick={() => this.onLeafExpressionOperatorChange(index, LeafExpressionOperator.GreaterThan)}>{ExpressionHelper.OperatorToFriendlyString(LeafExpressionOperator.GreaterThan)}</MenuItem>
                    <MenuItem onClick={() => this.onLeafExpressionOperatorChange(index, LeafExpressionOperator.GreaterThanOrEqual)}>{ExpressionHelper.OperatorToFriendlyString(LeafExpressionOperator.GreaterThanOrEqual)}</MenuItem>
                    <MenuItem onClick={() => this.onLeafExpressionOperatorChange(index, LeafExpressionOperator.LessThan)}>{ExpressionHelper.OperatorToFriendlyString(LeafExpressionOperator.LessThan)}</MenuItem>
                    <MenuItem onClick={() => this.onLeafExpressionOperatorChange(index, LeafExpressionOperator.LessThanOrEqual)}>{ExpressionHelper.OperatorToFriendlyString(LeafExpressionOperator.LessThanOrEqual)}</MenuItem>
                    <MenuItem onClick={() => this.onLeafExpressionOperatorChange(index, LeafExpressionOperator.Equals)}>{ExpressionHelper.OperatorToFriendlyString(LeafExpressionOperator.Equals)}</MenuItem>
                    <MenuItem onClick={() => this.onLeafExpressionOperatorChange(index, LeafExpressionOperator.NotEquals)}>{ExpressionHelper.OperatorToFriendlyString(LeafExpressionOperator.NotEquals)}</MenuItem>
                    <MenuItem onClick={() => this.onLeafExpressionOperatorChange(index, LeafExpressionOperator.Between)}>{ExpressionHelper.OperatorToFriendlyString(LeafExpressionOperator.Between)}</MenuItem>
                </DropdownButton>
                if (x.Operator == LeafExpressionOperator.Between) {
                    return <Form key={index}>
                        <FormGroup controlId={"Range1" + index}>
                            <InputGroup>
                                {numericAndDateOption}
                                {this.props.ColumnType == ColumnType.Number &&
                                    <FormControl value={String(x.Operand1)} type="number" placeholder="Enter Number" onChange={(e: React.FormEvent) => this.onOperand1Edit(index, e)} />
                                }
                                {this.props.ColumnType == ColumnType.Date &&
                                    <FormControl value={String(x.Operand1)} type="date" placeholder="Enter Date" onChange={(e: React.FormEvent) => this.onOperand1Edit(index, e)} />
                                }
                                <InputGroup.Button>
                                    <OverlayTrigger overlay={<Tooltip id="tooltipDelete">Delete</Tooltip>}>
                                        <Button onClick={() => this.onRangeDelete(index)}><Glyphicon glyph="trash" /></Button>
                                    </OverlayTrigger>
                                </InputGroup.Button>
                            </InputGroup>
                            <InputGroup style={betweenAddOnStyle}>
                                <InputGroup.Addon>And</InputGroup.Addon>
                                {this.props.ColumnType == ColumnType.Number &&
                                    <FormControl value={String(x.Operand2)} type="number" placeholder="Enter Number" onChange={(e: React.FormEvent) => this.onOperand2Edit(index, e)} />
                                }
                                {this.props.ColumnType == ColumnType.Date &&
                                    <FormControl value={String(x.Operand2)} type="date" placeholder="Enter Date" onChange={(e: React.FormEvent) => this.onOperand2Edit(index, e)} />
                                }
                            </InputGroup>
                        </FormGroup>
                    </Form>
                }
                else {
                    return <Form key={index}>
                        <FormGroup controlId={"Range" + index}>
                            <InputGroup>
                                {numericAndDateOption}
                                {this.props.ColumnType == ColumnType.Number &&
                                    <FormControl value={String(x.Operand1)} type="number" placeholder="Number" onChange={(e: React.FormEvent) => this.onOperand1Edit(index, e)} />
                                }
                                {this.props.ColumnType == ColumnType.Date &&
                                    <FormControl value={String(x.Operand1)} type="date" placeholder="Date" onChange={(e: React.FormEvent) => this.onOperand1Edit(index, e)} />
                                }
                                <InputGroup.Button>
                                    <OverlayTrigger overlay={<Tooltip id="tooltipDelete">Delete</Tooltip>}>
                                        <Button onClick={() => this.onRangeDelete(index)}><Glyphicon glyph="trash" /></Button>
                                    </OverlayTrigger>
                                </InputGroup.Button>
                            </InputGroup>
                        </FormGroup>
                    </Form>
                }
            })
        }
        else if (this.props.ColumnType == ColumnType.String) {
            rangesElement = this.props.Ranges.map((x, index) => {
                let stringOption = <DropdownButton style={dropDownStringStyle} title={ExpressionHelper.OperatorToFriendlyString(x.Operator)} id="stringOption2" componentClass={InputGroup.Button}>
                    <MenuItem onClick={() => this.onLeafExpressionOperatorChange(index, LeafExpressionOperator.Unknown)}>Select operator</MenuItem>
                    <MenuItem onClick={() => this.onLeafExpressionOperatorChange(index, LeafExpressionOperator.Contains)}>{ExpressionHelper.OperatorToFriendlyString(LeafExpressionOperator.Contains)}</MenuItem>
                    <MenuItem onClick={() => this.onLeafExpressionOperatorChange(index, LeafExpressionOperator.StartsWith)}>{ExpressionHelper.OperatorToFriendlyString(LeafExpressionOperator.StartsWith)}</MenuItem>
                    <MenuItem onClick={() => this.onLeafExpressionOperatorChange(index, LeafExpressionOperator.EndsWith)}>{ExpressionHelper.OperatorToFriendlyString(LeafExpressionOperator.EndsWith)}</MenuItem>
                    <MenuItem onClick={() => this.onLeafExpressionOperatorChange(index, LeafExpressionOperator.Regex)}>{ExpressionHelper.OperatorToFriendlyString(LeafExpressionOperator.Regex)}</MenuItem>
                </DropdownButton>
                return <Form key={index} >
                    <FormGroup controlId={"Range" + index}>
                        <InputGroup>
                            {stringOption}
                            <FormControl value={String(x.Operand1)} type="string" placeholder="Value" onChange={(e: React.FormEvent) => this.onOperand1Edit(index, e)} />
                            <InputGroup.Button>
                                <OverlayTrigger overlay={<Tooltip id="tooltipDelete">Delete</Tooltip>}>
                                    <Button onClick={() => this.onRangeDelete(index)}><Glyphicon glyph="trash" /></Button>
                                </OverlayTrigger>
                            </InputGroup.Button>
                        </InputGroup>
                    </FormGroup>
                </Form>
            })
        }

        return <PanelWithButton headerText={"Ranges"}  showAddButtonGlyph={false} className="no-padding-panel" bsStyle="info"
            buttonClick={() => this.addRange()}
            buttonContent={"Add Range Entry"}>
            <div style={divStyle}>
                {rangesElement}
            </div>
        </PanelWithButton>
    }

    onRangeDelete(index: number) {
        let newCol = [].concat(this.props.Ranges)
        newCol.splice(index, 1)
        this.props.onRangesChange(newCol)
    }
    private addRange() {
        this.props.onRangesChange([].concat(this.props.Ranges, { Operand1: "", Operand2: "", Operator: LeafExpressionOperator.Unknown }))
    }

    private onLeafExpressionOperatorChange(index: number, x: number) {
        let rangeCol: Array<IRangeExpression> = [].concat(this.props.Ranges)
        let range = this.props.Ranges[index]
        rangeCol[index] = Object.assign({}, range, { Operator: x })
        this.props.onRangesChange(rangeCol)
    }

    private onOperand1Edit(index: number, x: React.FormEvent) {
        let e = x.target as HTMLInputElement;
        let rangeCol: Array<IRangeExpression> = [].concat(this.props.Ranges)
        let range = this.props.Ranges[index]
        rangeCol[index] = Object.assign({}, range, { Operand1: e.value })
        this.props.onRangesChange(rangeCol)
    }

    private onOperand2Edit(index: number, x: React.FormEvent) {
        let e = x.target as HTMLInputElement;
        let rangeCol: Array<IRangeExpression> = [].concat(this.props.Ranges)
        let range = this.props.Ranges[index]
        rangeCol[index] = Object.assign({}, range, { Operand2: e.value })
        this.props.onRangesChange(rangeCol)
    }
}

let divStyle = {
    'overflowY': 'auto',
    'overflowX': 'hidden',
    'height': '370px',
    'marginBottom': '0'
}

let dropDownNumbDateStyle = {
    'width': '92px'
}

let dropDownStringStyle = {
    'width': '102px'
}

let betweenAddOnStyle = { marginLeft: '41px' }