import * as React from "react";
import { DistinctCriteriaPairValue, LeafExpressionOperator, DataType, RangeOperandType, SelectionMode } from '../../../Core/Enums'
import { MenuItem, DropdownButton, ListGroupItem, FormControl, ListGroup, ListGroupProps, FormGroup, InputGroup } from 'react-bootstrap';
import { StringExtensions } from '../../../Core/Extensions/StringExtensions';
import { ExpressionHelper } from '../../../Core/Helpers/ExpressionHelper'
import * as CalendarConstants from '../../../Core/Constants/CalendarConstants';
import { IRawValueDisplayValuePair } from "../../UIInterfaces";
import { AdaptableBlotterFormControlTextClear } from "../Forms/AdaptableBlotterFormControlTextClear";
import { AdaptableBlotterForm } from "../Forms/AdaptableBlotterForm";
import { UIHelper } from "../../UIHelper";
import { EnumExtensions } from "../../../Core/Extensions/EnumExtensions";
import { ColumnSelector } from "../Selectors/ColumnSelector";
import { IColumn } from "../../../Core/Interface/IColumn";
import * as StyleConstants from '../../../Core/Constants/StyleConstants';
import { IRange } from "../../../Core/Api/AdaptableBlotterObjects";


export interface ListBoxFilterFormProps extends ListGroupProps {
    CurrentColumn: IColumn;
    Columns: IColumn[],
    ColumnValues: Array<IRawValueDisplayValuePair>
    UserFilters: Array<IRawValueDisplayValuePair>
    UiSelectedColumnValues: Array<string>
    UiSelectedUserFilters: Array<string>
    UiSelectedRange: IRange
    onColumnValueSelectedChange: (SelectedValues: Array<any>) => void
    onUserFilterSelectedChange: (SelectedValues: Array<any>) => void
    onCustomRangeExpressionChange: (rangeExpression: IRange) => void
    ColumnValueType: DistinctCriteriaPairValue
    Operators: Array<LeafExpressionOperator>
    DataType: DataType
    cssClassName: string   
 }

export interface ListBoxFilterFormState extends React.ClassAttributes<ListBoxFilterForm> {
    UiSelectedColumnValues: Array<string>
    UiSelectedUserFilters: Array<string>
    UiSelectedRange: IRange
    FilterValue: string
}

export class ListBoxFilterForm extends React.Component<ListBoxFilterFormProps, ListBoxFilterFormState> {
    constructor(props: ListBoxFilterFormProps) {
        super(props);

        this.state = {
            UiSelectedColumnValues: this.props.UiSelectedColumnValues,
            UiSelectedUserFilters: this.props.UiSelectedUserFilters,
            UiSelectedRange: this.props.UiSelectedRange,
            FilterValue: "",
        };
    }
    componentWillReceiveProps(nextProps: ListBoxFilterFormProps, nextContext: any) {
        this.setState({
            UiSelectedColumnValues: nextProps.UiSelectedColumnValues,
            UiSelectedUserFilters: nextProps.UiSelectedUserFilters,
            UiSelectedRange: nextProps.UiSelectedRange,
            FilterValue: this.state.FilterValue,
        });
    }

    render() {

         let userFiltersItemsElements = this.props.UserFilters.map((x, y) => {
            let isActive: boolean
            isActive = this.state.UiSelectedUserFilters.indexOf(x.RawValue) >= 0;
            let display: string = x.DisplayValue;
            let value = x.RawValue;
            if (StringExtensions.IsNotEmpty(this.state.FilterValue) && display.toLocaleLowerCase().indexOf(this.state.FilterValue.toLocaleLowerCase()) < 0) {
                return null;
            }
            else {
                return <ListGroupItem key={"userFilter" + y} style={userFilterItemStyle}
                    onClick={() => this.onClickItemUserFilter(x)}
                    active={isActive}
                    value={value} >{display}</ListGroupItem>
            }
        })

        let columnValuesItemsElements = this.props.ColumnValues.map((x, y) => {
            let isActive: boolean
            let value: any
            if (this.props.ColumnValueType == DistinctCriteriaPairValue.RawValue) {
                isActive = this.state.UiSelectedColumnValues.indexOf(x.RawValue) >= 0;
                value = x.RawValue;
            }
            else if (this.props.ColumnValueType == DistinctCriteriaPairValue.DisplayValue) {
                isActive = this.state.UiSelectedColumnValues.indexOf(x.DisplayValue) >= 0;
                value = x.DisplayValue;
            }

            let display: string = x.DisplayValue;
            if (StringExtensions.IsNotEmpty(this.state.FilterValue) && display.toLocaleLowerCase().indexOf(this.state.FilterValue.toLocaleLowerCase()) < 0) {
                return null;
            }
            else {
                return <ListGroupItem key={"columnValue" + y} style={columnVItemStyle}
                    onClick={() => this.onClickItemColumnValue(x)}
                    active={isActive}
                    value={value} >{display}</ListGroupItem>
            }
        })

        let textClear = <AdaptableBlotterFormControlTextClear
            autoFocus={true}
            style={searchFilterStyle}
            type="text"
            placeholder="Search Filters"
            value={this.state.FilterValue}
            bsSize={"small"}
            OnTextChange={(x) => this.onUpdateFilterSearch(x)} />

        let rangeMenuItemsOperand1 = EnumExtensions.getNames(RangeOperandType).map((rangeOperand: RangeOperandType, index: number) => {
            return <MenuItem key={index + rangeOperand} eventKey={index + rangeOperand} onClick={() => this.onRangeTypeChangedOperand1(index, rangeOperand)}>{rangeOperand as RangeOperandType}</MenuItem>
        })

        let rangeMenuItemsOperand2 = EnumExtensions.getNames(RangeOperandType).map((rangeOperand: RangeOperandType, index: number) => {
            return <MenuItem key={index + rangeOperand} eventKey={index + rangeOperand} onClick={() => this.onRangeTypeChangedOperand2(index, rangeOperand)}>{rangeOperand as RangeOperandType}</MenuItem>
        })



        let rangeForm =
            <AdaptableBlotterForm horizontal>
                <FormGroup controlId={"advancedForm"}>
                    <FormControl bsSize={"small"} style={rangeOperatorStyle} componentClass="select" placeholder="select" value={this.state.UiSelectedRange.Operator} onChange={(x) => this.onLeafExpressionOperatorChange(x)} >
                        {this.props.Operators.map((operator: LeafExpressionOperator) => {
                            return <option key={operator} value={operator.toString()}>{ExpressionHelper.OperatorToLongFriendlyString(operator, this.props.DataType)}</option>
                        })}
                    </FormControl>

                    {this.state.UiSelectedRange.Operator != LeafExpressionOperator.Unknown &&
                        <InputGroup>
                            <DropdownButton bsSize={"small"} style={rangeTypeStyle} title={this.state.UiSelectedRange.Operand1Type} id="range_operand_1" componentClass={InputGroup.Button}>
                                {rangeMenuItemsOperand1}
                            </DropdownButton>

                            {this.getOperand1FormControl()}
                        </InputGroup>
                    }
                    {this.state.UiSelectedRange.Operator == LeafExpressionOperator.Between &&
                       <InputGroup>
                       <DropdownButton bsSize={"small"} style={rangeTypeStyle} title={this.state.UiSelectedRange.Operand2Type} id="range_operand_2" componentClass={InputGroup.Button}>
                           {rangeMenuItemsOperand2}
                       </DropdownButton>

                       {this.getOperand2FormControl()}
                   </InputGroup>
                    }

                    <div style={separatorStyle}>{"- - - - - - - - - - - - - - - -"}</div>
                </FormGroup>
            </AdaptableBlotterForm>


        return <div>
            {rangeForm}

            {textClear}
            <ListGroup fill style={divStyle} >
                {userFiltersItemsElements}
                {columnValuesItemsElements}
            </ListGroup>
        </div>;
    }

    // Methods for getting the range
    private onLeafExpressionOperatorChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let editedRange: IRange = { Operand1Type: this.state.UiSelectedRange.Operand1Type, Operand2Type: this.state.UiSelectedRange.Operand2Type, Operator: e.value as LeafExpressionOperator, Operand1: this.state.UiSelectedRange.Operand1, Operand2: this.state.UiSelectedRange.Operand2 }
        this.setState({ UiSelectedRange: editedRange } as ListBoxFilterFormState, () => this.raiseOnChangeCustomExpression())
    }

    private onRangeTypeChangedOperand1(index: number, rangeOperandType: RangeOperandType): any {
        let editedRange: IRange = { Operand1Type: rangeOperandType, Operand2Type: this.state.UiSelectedRange.Operand2Type, Operator: this.state.UiSelectedRange.Operator, Operand1: "", Operand2: this.state.UiSelectedRange.Operand2 }
        this.setState({ UiSelectedRange: editedRange } as ListBoxFilterFormState, () => this.raiseOnChangeCustomExpression())
    }

    private onRangeTypeChangedOperand2(index: number, rangeOperandType: RangeOperandType): any {
        let editedRange: IRange = { Operand1Type: this.state.UiSelectedRange.Operand1Type, Operand2Type: rangeOperandType, Operator: this.state.UiSelectedRange.Operator, Operand1:this.state.UiSelectedRange.Operand1, Operand2: "" }
        this.setState({ UiSelectedRange: editedRange } as ListBoxFilterFormState, () => this.raiseOnChangeCustomExpression())
    }

    private getOperand1FormControl(): any {
        if (this.state.UiSelectedRange.Operand1Type == RangeOperandType.Column) {
            return <ColumnSelector  cssClassName={this.props.cssClassName} SelectedColumnIds={[this.state.UiSelectedRange.Operand1]} bsSize={"small"} className={"ab_filterFormColumnSelector"}
                ColumnList={this.props.Columns.filter(c => c.DataType == this.props.DataType && c.ColumnId != this.props.CurrentColumn.ColumnId)}
                onColumnChange={columns => this.onColumnOperand1SelectedChanged(columns)}
                SelectionMode={SelectionMode.Single} />
        }
        else {
            return <FormControl value={String(this.state.UiSelectedRange.Operand1)} bsSize={"small"} style={rangeOperandStyle} type={UIHelper.getDescriptionForDataType(this.props.DataType)} placeholder={UIHelper.getPlaceHolderforDataType(this.props.DataType)} onChange={(e) => this.onOperand1Edit(e)} />
        }
    }

    private getOperand2FormControl(): any {
        if (this.state.UiSelectedRange.Operand2Type == RangeOperandType.Column) {
            return <ColumnSelector  cssClassName={this.props.cssClassName} SelectedColumnIds={[this.state.UiSelectedRange.Operand2]} bsSize={"small"} className={"ab_filterFormColumnSelector"}
                ColumnList={this.props.Columns.filter(c => c.DataType == this.props.DataType && c.ColumnId != this.props.CurrentColumn.ColumnId)}
                onColumnChange={columns => this.onColumnOperand2SelectedChanged(columns)}
                SelectionMode={SelectionMode.Single} />
        }
        else {
            return <FormControl value={String(this.state.UiSelectedRange.Operand2)} bsSize={"small"} style={rangeOperandStyle} type={UIHelper.getDescriptionForDataType(this.props.DataType)} placeholder={UIHelper.getPlaceHolderforDataType(this.props.DataType)} onChange={(e) => this.onOperand2Edit(e)} />
        }
    }


    private onOperand1Edit(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let newRange: IRange = { Operand1Type: this.state.UiSelectedRange.Operand1Type, Operand2Type: this.state.UiSelectedRange.Operand2Type, Operator: this.state.UiSelectedRange.Operator, Operand1: e.value, Operand2: this.state.UiSelectedRange.Operand2 }
        this.setState({ UiSelectedRange: newRange } as ListBoxFilterFormState, () => this.raiseOnChangeCustomExpression())
    }

    private onOperand2Edit(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let newRange: IRange = { Operand1Type: this.state.UiSelectedRange.Operand1Type, Operand2Type: this.state.UiSelectedRange.Operand2Type, Operator: this.state.UiSelectedRange.Operator, Operand1: this.state.UiSelectedRange.Operand1, Operand2: e.value }
        this.setState({ UiSelectedRange: newRange } as ListBoxFilterFormState, () => this.raiseOnChangeCustomExpression())
    }

    private onColumnOperand1SelectedChanged(columns: IColumn[]) {
        let selectedColumn: string = columns.length > 0 ? columns[0].ColumnId : ""
        let editedRange: IRange = { Operand1Type: this.state.UiSelectedRange.Operand1Type, Operand2Type: this.state.UiSelectedRange.Operand2Type, Operator: this.state.UiSelectedRange.Operator, Operand1: selectedColumn, Operand2: this.state.UiSelectedRange.Operand2 }
        this.setState({ UiSelectedRange: editedRange } as ListBoxFilterFormState, () => this.raiseOnChangeCustomExpression())
    }

    private onColumnOperand2SelectedChanged(columns: IColumn[]) {
        let selectedColumn: string = columns.length > 0 ? columns[0].ColumnId : ""
        let editedRange: IRange = { Operand1Type: this.state.UiSelectedRange.Operand1Type, Operand2Type: this.state.UiSelectedRange.Operand2Type, Operator: this.state.UiSelectedRange.Operator, Operand1: this.state.UiSelectedRange.Operand1, Operand2:selectedColumn }
        this.setState({ UiSelectedRange: editedRange } as ListBoxFilterFormState, () => this.raiseOnChangeCustomExpression())
    }

    // Methods for getting column values or filters
    onUpdateFilterSearch(filterSearch: string) {
        this.setState({ FilterValue: filterSearch } as ListBoxFilterFormState);
    }

    raiseOnChangeColumnValues() {
        this.props.onColumnValueSelectedChange(this.state.UiSelectedColumnValues);
    }

    raiseOnChangeUserFilter() {
        this.props.onUserFilterSelectedChange(this.state.UiSelectedUserFilters);
    }

    raiseOnChangeCustomExpression() {
        let isValidRange: boolean = false;
        if (this.state.UiSelectedRange.Operator != LeafExpressionOperator.Unknown) {
            if (this.state.UiSelectedRange.Operator != LeafExpressionOperator.Between) {
                isValidRange = (StringExtensions.IsNotNullOrEmpty(this.state.UiSelectedRange.Operand1));
            } else {
                isValidRange = (StringExtensions.IsNotNullOrEmpty(this.state.UiSelectedRange.Operand1) && StringExtensions.IsNotNullOrEmpty(this.state.UiSelectedRange.Operand2));
            }
        }
        if (isValidRange) {
            this.props.onCustomRangeExpressionChange(this.state.UiSelectedRange);
        }
    }

    onClickItemColumnValue(item: IRawValueDisplayValuePair) {
        let index: number
        if (this.props.ColumnValueType == DistinctCriteriaPairValue.RawValue) {
            index = this.state.UiSelectedColumnValues.indexOf(item.RawValue);
        }
        else if (this.props.ColumnValueType == DistinctCriteriaPairValue.DisplayValue) {
            index = this.state.UiSelectedColumnValues.indexOf(item.DisplayValue);
        }

        if (index >= 0) {
            let newArray = [...this.state.UiSelectedColumnValues];
            newArray.splice(index, 1);
            this.setState({ UiSelectedColumnValues: newArray } as ListBoxFilterFormState, () => this.raiseOnChangeColumnValues())
        }
        else {
            let newArray = [...this.state.UiSelectedColumnValues];
            if (this.props.ColumnValueType == DistinctCriteriaPairValue.RawValue) {
                newArray.push(item.RawValue)
            }
            else if (this.props.ColumnValueType == DistinctCriteriaPairValue.DisplayValue) {
                newArray.push(item.DisplayValue)
            }
            this.setState({ UiSelectedColumnValues: newArray } as ListBoxFilterFormState, () => this.raiseOnChangeColumnValues())
        }
    }

    onClickItemUserFilter(item: IRawValueDisplayValuePair) {
        let index = this.state.UiSelectedUserFilters.indexOf(item.RawValue);
        if (index >= 0) {
            let newArray = [...this.state.UiSelectedUserFilters];
            newArray.splice(index, 1);
            this.setState({ UiSelectedUserFilters: newArray } as ListBoxFilterFormState, () => this.raiseOnChangeUserFilter())
        }
        else {
            let newArray = [...this.state.UiSelectedUserFilters];
            newArray.push(item.RawValue)
            this.setState({ UiSelectedUserFilters: newArray } as ListBoxFilterFormState, () => this.raiseOnChangeUserFilter())
        }
    }






}

let divStyle: React.CSSProperties = {
    'overflowY': 'auto',
    'overflowX': 'hidden',
    'height': '335px',
    'marginBottom': '0'
}

let userFilterItemStyle: React.CSSProperties = {
    //'width': '87%',export 
    'fontStyle': 'italic',
    'fontSize': 'small',
    'padding': '5px',
    'margin': 0
}

let columnVItemStyle = {
    //'width': '87%',
    'fontSize': 'small',
    'padding': '5px',
    'margin': 0
}

let dropDownNumbDateStyle = {
    'width': '92px'
}

let radioButtonStyle: React.CSSProperties = {
    //'width': '87%',export 
    'fontSize': 'small',
    'padding': '0px',
    'marginLeft': '2px'
}

let rangeOperatorStyle = {
    'marginTop': '0px',
    'marginLeft': '15px',
    'width': '222px'
}
let rangeOperandStyle = {
    'marginTop': '0px',
    'marginLeft': '0px',
    'width': '150px'
}

let rangeTypeStyle = {
    'marginTop': '0px',
    'marginLeft': '15px',
    'width': '72px'
}
let searchFilterStyle = {
    'marginTop': '0px',
    'marginLeft': '0px',
    'width': '222px'
}

let separatorStyle = {
    'marginTop': '10px',
    'marginBottom': '0px',
    'marginLeft': '15px',
    'width': '222px',
    'textAlign': 'center'
}

