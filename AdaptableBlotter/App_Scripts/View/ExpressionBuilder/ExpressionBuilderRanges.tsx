/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { ColumnType } from '../../Core/Enums'
import { IExpressionRange } from '../../Core/Interface/IExpression'
import { LeafExpressionOperator } from '../../Core/Enums'
import { SingleListBox } from '../SingleListBox'
import { PanelWithButton } from '../PanelWithButton'
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper'
import { ListGroupItem, ListGroup, Panel, FormControl, Form, Row, Col, Button, FormGroup, OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap';


interface ExpressionBuilderRangesProps extends React.ClassAttributes<ExpressionBuilderRanges> {
    ColumnType: ColumnType
    Ranges: Array<IExpressionRange>
    onRangesChange: (Ranges: Array<IExpressionRange>) => void
}

export class ExpressionBuilderRanges extends React.Component<ExpressionBuilderRangesProps, {}> {
    render() {
        let rangesElement: JSX.Element[] = null
        if (this.props.ColumnType == ColumnType.Number || this.props.ColumnType == ColumnType.Date) {
            rangesElement = this.props.Ranges.map((x, index) => {
                let numericAndDateOption = <FormControl componentClass="select" placeholder={LeafExpressionOperator[LeafExpressionOperator.Unknown]} value={x.Operator.toString()} onChange={(x) => this.onLeafExpressionOperatorChange(index, x)} >
                    <option value={LeafExpressionOperator.Unknown.toString()}>Select an operator</option>
                    <option value={LeafExpressionOperator.GreaterThan.toString()}>{ExpressionHelper.OperatorToFriendlyString(LeafExpressionOperator.GreaterThan)}</option>
                    <option value={LeafExpressionOperator.GreaterThanOrEqual.toString()}>{ExpressionHelper.OperatorToFriendlyString(LeafExpressionOperator.GreaterThanOrEqual)}</option>
                    <option value={LeafExpressionOperator.LessThan.toString()}>{ExpressionHelper.OperatorToFriendlyString(LeafExpressionOperator.LessThan)}</option>
                    <option value={LeafExpressionOperator.LessThanOrEqual.toString()}>{ExpressionHelper.OperatorToFriendlyString(LeafExpressionOperator.LessThanOrEqual)}</option>
                    <option value={LeafExpressionOperator.Equals.toString()}>{ExpressionHelper.OperatorToFriendlyString(LeafExpressionOperator.Equals)}</option>
                    <option value={LeafExpressionOperator.NotEquals.toString()}>{ExpressionHelper.OperatorToFriendlyString(LeafExpressionOperator.NotEquals)}</option>
                    <option value={LeafExpressionOperator.Between.toString()}>{ExpressionHelper.OperatorToFriendlyString(LeafExpressionOperator.Between)}</option>
                </FormControl>
                if (x.Operator == LeafExpressionOperator.Between) {
                    return <Form horizontal key={index}>
                        <FormGroup controlId={"Range1" + index}>
                            <Col xs={4}>
                                {numericAndDateOption}
                            </Col>
                            <Col xs={6}>
                                {this.props.ColumnType == ColumnType.Number &&
                                    <FormControl value={String(x.Operand1)} type="number" placeholder="Enter a Number" onChange={(e: React.FormEvent) => this.onOperand1Edit(index, e)} />
                                }
                                {this.props.ColumnType == ColumnType.Date &&
                                    <FormControl value={String(x.Operand1)} type="date" placeholder="Enter a Date" onChange={(e: React.FormEvent) => this.onOperand1Edit(index, e)} />
                                }
                            </Col>
                            <Col xs={2}>
                                <OverlayTrigger overlay={<Tooltip id="tooltipDelete">Delete</Tooltip>}>
                                    <Button onClick={() => this.onRangeDelete(index)}><Glyphicon glyph="trash" /></Button>
                                </OverlayTrigger>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId={"Range2" + index}>
                            <Col xs={2} xsOffset={2}>
                                And
                            </Col>
                            <Col xs={6}>
                                {this.props.ColumnType == ColumnType.Number &&
                                    <FormControl value={String(x.Operand2)} type="number" placeholder="Enter a Number" onChange={(e: React.FormEvent) => this.onOperand2Edit(index, e)} />
                                }
                                {this.props.ColumnType == ColumnType.Date &&
                                    <FormControl value={String(x.Operand2)} type="date" placeholder="Enter a Date" onChange={(e: React.FormEvent) => this.onOperand2Edit(index, e)} />
                                }
                            </Col>
                        </FormGroup>
                    </Form>
                }
                else {
                    return <Form horizontal key={index}>
                        <FormGroup controlId={"Range" + index}>
                            <Col xs={5}>
                                {numericAndDateOption}
                            </Col>
                            <Col xs={5}>
                                {this.props.ColumnType == ColumnType.Number &&
                                    <FormControl value={String(x.Operand1)} type="number" placeholder="Enter a Number" onChange={(e: React.FormEvent) => this.onOperand1Edit(index, e)} />
                                }
                                {this.props.ColumnType == ColumnType.Date &&
                                    <FormControl value={String(x.Operand1)} type="date" placeholder="Enter a Date" onChange={(e: React.FormEvent) => this.onOperand1Edit(index, e)} />
                                }
                            </Col>
                            <Col xs={2}>
                                <OverlayTrigger overlay={<Tooltip id="tooltipDelete">Delete</Tooltip>}>
                                    <Button onClick={() => this.onRangeDelete(index)}><Glyphicon glyph="trash" /></Button>
                                </OverlayTrigger>
                            </Col>
                        </FormGroup>
                    </Form>
                }
            })
        }
        else if (this.props.ColumnType == ColumnType.String) {
            rangesElement = this.props.Ranges.map((x, index) => {
                let numericOption = <FormControl componentClass="select" placeholder={LeafExpressionOperator[LeafExpressionOperator.Unknown]} value={x.Operator.toString()} onChange={(x) => this.onLeafExpressionOperatorChange(index, x)} >
                    <option value={LeafExpressionOperator.Unknown.toString()}>Select an operator</option>
                    <option value={LeafExpressionOperator.Contains.toString()}>{ExpressionHelper.OperatorToFriendlyString(LeafExpressionOperator.Contains)}</option>
                    <option value={LeafExpressionOperator.StartsWith.toString()}>{ExpressionHelper.OperatorToFriendlyString(LeafExpressionOperator.StartsWith)}</option>
                    <option value={LeafExpressionOperator.EndsWith.toString()}>{ExpressionHelper.OperatorToFriendlyString(LeafExpressionOperator.EndsWith)}</option>
                    <option value={LeafExpressionOperator.MatchesRegex.toString()}>{ExpressionHelper.OperatorToFriendlyString(LeafExpressionOperator.MatchesRegex)}</option>
                </FormControl>
                return <Form horizontal key={index}>
                    <FormGroup controlId={"Range" + index}>
                        <Col xs={5}>
                            {numericOption}
                        </Col>
                        <Col xs={5}>
                            <FormControl value={String(x.Operand1)} type="string" placeholder="Enter a string" onChange={(e: React.FormEvent) => this.onOperand1Edit(index, e)} />
                        </Col>
                        <Col xs={2}>
                            <OverlayTrigger overlay={<Tooltip id="tooltipDelete">Delete</Tooltip>}>
                                <Button onClick={() => this.onRangeDelete(index)}><Glyphicon glyph="trash" /></Button>
                            </OverlayTrigger>
                        </Col>
                    </FormGroup>
                </Form>
            })
        }
        let header = <Form horizontal>
            <Row style={{ display: "flex", alignItems: "center" }}>
                <Col xs={8}>{ColumnType[this.props.ColumnType] + " Entry"}</Col>
                <Col xs={4}>
                    <Button bsSize='small' onClick={() => this.addRange()} style={{ float: 'right' }}>
                        Add a range entry
                    </Button>
                </Col>
            </Row>
        </Form>;
        return <PanelWithButton headerText={ColumnType[this.props.ColumnType] + " Entry"}
            buttonClick={() => this.addRange()}
            buttonContent={"Add a range entry"}>
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

    private onLeafExpressionOperatorChange(index: number, x: React.FormEvent) {
        let e = x.target as HTMLInputElement;
        let rangeCol: Array<IExpressionRange> = [].concat(this.props.Ranges)
        let range = this.props.Ranges[index]
        rangeCol[index] = Object.assign({}, range, { Operator: Number.parseInt(e.value) })
        this.props.onRangesChange(rangeCol)
    }

    private onOperand1Edit(index: number, x: React.FormEvent) {
        let e = x.target as HTMLInputElement;
        let rangeCol: Array<IExpressionRange> = [].concat(this.props.Ranges)
        let range = this.props.Ranges[index]
        rangeCol[index] = Object.assign({}, range, { Operand1: e.value })
        this.props.onRangesChange(rangeCol)
    }

    private onOperand2Edit(index: number, x: React.FormEvent) {
        let e = x.target as HTMLInputElement;
        let rangeCol: Array<IExpressionRange> = [].concat(this.props.Ranges)
        let range = this.props.Ranges[index]
        rangeCol[index] = Object.assign({}, range, { Operand2: e.value })
        this.props.onRangesChange(rangeCol)
    }
}

let divStyle = {
    'overflowY': 'auto',
    'overflowX': 'hidden',
    'height': '305px', 
    'marginBottom': '0'
}