import * as React from "react";
import { DistinctCriteriaPairValue, FilterFormMode, LeafExpressionOperator, DataType } from '../Core/Enums'
import { MenuItem, Checkbox, DropdownButton, ListGroupItem, FormControl, ListGroup, ListGroupProps, FormGroup, InputGroup } from 'react-bootstrap';
import { StringExtensions } from '../Core/Extensions/StringExtensions';
import { AdaptableBlotterFormControlTextClear } from './Components/Forms/AdaptableBlotterFormControlTextClear';
import { ExpressionHelper } from '../Core/Helpers/ExpressionHelper'
import { AdaptableBlotterForm } from './AdaptableBlotterForm'
import { IRangeExpression } from '../Core/Interface/IExpression'
import { IRawValueDisplayValuePair } from "./Interfaces";
import * as CalendarConstants from '../Core/Constants/CalendarConstants';


export interface ListBoxFilterFormProps extends ListGroupProps {
    ColumnValues: Array<IRawValueDisplayValuePair>
    UserFilters: Array<IRawValueDisplayValuePair>
    UiSelectedColumnValues: Array<String>
    UiSelectedUserFilters: Array<String>
    onColumnValueSelectedChange: (SelectedValues: Array<any>) => void
    onUserFilterSelectedChange: (SelectedValues: Array<any>) => void
    ColumnValueType: DistinctCriteriaPairValue
    Operators: Array<LeafExpressionOperator>
}

export interface ListBoxFilterFormState extends React.ClassAttributes<ListBoxFilterForm> {
    FilterFormMode: FilterFormMode
    UiSelectedColumnValues: Array<String>
    UiSelectedUserFilters: Array<String>
    FilterValue: string
    LeafExpressionOperator: LeafExpressionOperator
    IRangeExpression: IRangeExpression
}

export class ListBoxFilterForm extends React.Component<ListBoxFilterFormProps, ListBoxFilterFormState> {
    constructor(props: ListBoxFilterFormProps) {
        super(props);
        this.state = {
            UiSelectedColumnValues: this.props.UiSelectedColumnValues,
            UiSelectedUserFilters: this.props.UiSelectedUserFilters,
            FilterValue: "",
            LeafExpressionOperator: LeafExpressionOperator.Unknown,
            FilterFormMode: FilterFormMode.Basic,
            IRangeExpression: null
        };
    }
    componentWillReceiveProps(nextProps: ListBoxFilterFormProps, nextContext: any) {
        this.setState({
            UiSelectedColumnValues: nextProps.UiSelectedColumnValues,
            UiSelectedUserFilters: nextProps.UiSelectedUserFilters,
            FilterValue: this.state.FilterValue
        });
    }

    render() {

        let showAllElement: boolean = this.state.UiSelectedUserFilters.length == 0 && this.state.UiSelectedColumnValues.length == 0;

        let allElement = <ListGroupItem key={"all"} style={userFilterItemStyle}
            onClick={() => this.onClickAllItem()}
            active={showAllElement}
            value={"all"} >{"(All)"}</ListGroupItem>

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

        let header = <AdaptableBlotterFormControlTextClear
            autoFocus={true}
            type="text"
            placeholder="Search Filters"
            value={this.state.FilterValue}
            OnTextChange={(x) => this.onUpdateFilterSearch(x)} />

        // Getting operators for the Advanced Menu
           let operatorTypes = this.props.Operators.map((operator: LeafExpressionOperator) => {
            return <option key={operator} value={operator.toString()}>{ExpressionHelper.OperatorToShortFriendlyString(operator)}</option>
        })

        let currentOperator: LeafExpressionOperator = this.state.IRangeExpression != null ? this.state.IRangeExpression.Operator : LeafExpressionOperator.Unknown;
       let currentOperand1: string = this.state.IRangeExpression != null ? this.state.IRangeExpression.Operand1 : "";
       let currentOperand2: string = this.state.IRangeExpression != null ? this.state.IRangeExpression.Operand2 : "";
       
       let operators =  <FormControl bsSize={"small"} componentClass="select" placeholder="select" value={currentOperator} onChange={(x) => this.onLeafExpressionOperatorChange(x)} >
                {operatorTypes}
            </FormControl>
      
         let filterFormModeCheckbox = <div>
            <Checkbox style={radioButtonStyle} onChange={(e) => this.onFilterFormModeChanged(e)} checked={this.state.FilterFormMode == FilterFormMode.Dynamic}>Use Advanced</Checkbox>

        </div>

        return <div>
            {} {/* put filterFormModeCheckbox here when wanting to show advanced screen */}

            {this.state.FilterFormMode == FilterFormMode.Dynamic &&
               <AdaptableBlotterForm inline>
               <FormGroup controlId={"Range"}>
                   {operators}
                   <FormControl value={currentOperand1} style={{ width: "50px" }} type="number" placeholder="Number" onChange={(e) => this.onOperand1Edit(e)} />
   
               </FormGroup>
           </AdaptableBlotterForm>
            }
            {this.state.FilterFormMode == FilterFormMode.Basic &&
                <div>
                    {header}
                    <ListGroup fill style={divStyle} >
                        {allElement}
                        {userFiltersItemsElements}
                        {columnValuesItemsElements}
                    </ListGroup>
                </div>
            }
        </div>;
    }

    onUpdateFilterSearch(filterSearch: string) {
        this.setState({ FilterValue: filterSearch } as ListBoxFilterFormState);
    }

    clearFilter() {
        this.setState({
            FilterValue: ""
        } as ListBoxFilterFormState);
    }



    raiseOnChangeColumnValues() {
        this.props.onColumnValueSelectedChange(this.state.UiSelectedColumnValues);
    }

    raiseOnChangeUserFilter() {
        this.props.onUserFilterSelectedChange(this.state.UiSelectedUserFilters);
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

    onClickAllItem() {
        // just set it to nothing...
        let allArray: string[] = ["All"];
        this.setState({ UiSelectedUserFilters: allArray, UiSelectedColumnValues: this.state.UiSelectedUserFilters, FilterValue: this.state.FilterValue, LeafExpressionOperator: LeafExpressionOperator.Unknown, FilterFormMode: FilterFormMode.Basic, IRangeExpression: null } as ListBoxFilterFormState, () => this.raiseOnChangeUserFilter())
    }

    private onLeafExpressionOperatorChange(event: React.FormEvent<any>) {
        //  let rangeCol: Array<IRangeExpression> = [].concat(this.props.Ranges)
        //  let range = this.props.Ranges[index]
        //  rangeCol[index] = Object.assign({}, range, { Operator: x })
        let e = event.target as HTMLInputElement;
        this.setState({ LeafExpressionOperator: e.value } as ListBoxFilterFormState, () => this.raiseOnChangeUserFilter())

    }

    private onOperand1Edit(x: React.FormEvent<any>) {
        //  let e = x.target as HTMLInputElement;
        //  let rangeCol: Array<IRangeExpression> = [].concat(this.props.Ranges)
        //  let range = this.props.Ranges[index]
        //  rangeCol[index] = Object.assign({}, range, { Operand1: e.value })
        //  this.props.onRangesChange(rangeCol)
    }

    private onFilterFormModeChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let filterFormMode: FilterFormMode = (e.checked) ? FilterFormMode.Dynamic : FilterFormMode.Basic;
        this.setState({ FilterFormMode: filterFormMode } as ListBoxFilterFormState, () => this.raiseOnChangeUserFilter())
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
