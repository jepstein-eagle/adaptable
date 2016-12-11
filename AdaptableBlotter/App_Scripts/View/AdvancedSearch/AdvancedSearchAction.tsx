/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Accordion, FormControl, ControlLabel, Panel, Form, FormGroup, Button, OverlayTrigger, Tooltip, Row, Col, Checkbox } from 'react-bootstrap';
import { PanelWithButton } from '../PanelWithButton';
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { LeafExpressionOperator } from '../../Core/Enums'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as AdvancedSearchRedux from '../../Redux/ActionsReducers/AdvancedSearchRedux'
import { EnumExtensions } from '../../Core/Extensions';
import { IAdvancedSearch } from '../../Core/Interface/IAdvancedSearchStrategy';
import { AdaptableWizard } from './..//Wizard/AdaptableWizard'
import { AdvancedSearchExpressionWizard } from './AdvancedSearchExpressionWizard'
import { AdvancedSearchSettingsWizard } from './AdvancedSearchSettingsWizard'
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { Helper } from '../../Core/Helper';
import { AdvancedSearchPreview } from './AdvancedSearchPreview'
import { ExpressionBuilderPreview } from '../ExpressionBuilder/ExpressionBuilderPreview'

import { Expression } from '../../Core/Expression/Expression';


interface AdvancedSearchActionProps extends React.ClassAttributes<AdvancedSearchActionComponent> {
    AdvancedSearches: IAdvancedSearch[];
    Columns: IColumn[];
    AdaptableBlotter: IAdaptableBlotter;
    onAddAdvancedSearch: (AdvancedSearch: IAdvancedSearch) => AdvancedSearchRedux.AdvancedSearchAddAction,
}

interface AdvancedSearchActionInternalState {
    NewAdvancedSearch: IAdvancedSearch
    SelectedAdvancedSearch: IAdvancedSearch
    SelectedColumnId: string
}

class AdvancedSearchActionComponent extends React.Component<AdvancedSearchActionProps, AdvancedSearchActionInternalState> {
  private IsDeleting: boolean = false;

    constructor() {
        super();
        this.state = { NewAdvancedSearch: null, SelectedAdvancedSearch: null, SelectedColumnId: ""}
    }


    render() {
      
        //   alert(this.state.SelectedColumnId);
       this.IsDeleting = false;
        var blotter = this.props.AdaptableBlotter;

        let advancedSearches = this.props.AdvancedSearches.map(x => {
            return <option value={x.AdvancedSearchName} key={x.AdvancedSearchName}>{x.AdvancedSearchName}</option>
        })

        let currentAdvancedSearch: string = this.state.SelectedAdvancedSearch != null ? this.state.SelectedAdvancedSearch.AdvancedSearchName : "";

        //   let currentAdvancedSearch: string = this.state.SelectedAdvancedSearch != null ? this.state.SelectedAdvancedSearch.AdvancedSearchName : "";

        return (
            <div >
                <Panel bsStyle="primary" style={panelStyle} header="Advanced Search">

                    <Form inline>
                        <div style={divStyle}>
                            <PanelWithButton headerText="Select Search"
                                buttonContent={"New Search"}
                                buttonClick={() => this.onNewAdvancedSearch()}>
                                <FormControl componentClass="select" placeholder="select"
                                    value={currentAdvancedSearch}
                                    onChange={(x) => this.onSelectedSearchChanged(x)} >
                                    <option value="select" key="select">Select a Search</option>
                                    {advancedSearches}
                                </FormControl>
                            </PanelWithButton>

                            {this.state.SelectedAdvancedSearch != null &&
                                <Form inline>
                                    <PanelWithButton headerText="Search Details"
                                        buttonContent={"Edit Search"}
                                        buttonClick={() => this.onEditAdvancedSearch()}>

                                        <ExpressionBuilderPreview Expression={this.state.SelectedAdvancedSearch.Expression}
                                            onSelectedColumnChange={(columnName) => this.onSelectedColumnChange(columnName)}
                                            SelectedColumnId={this.state.SelectedColumnId}
                                            ColumnsList={this.props.Columns}
                                            DeleteColumnValue={(columnId: string, value: any) => this.DeleteColumnValue(columnId, value)}
                                            DeleteRange={(columnId: string, index: number) => this.DeleteRange(columnId, index)}>
                                        </ExpressionBuilderPreview>
                                    </PanelWithButton>
                                </Form>
                            }
                        </div>
                    </Form>

                    {this.state.NewAdvancedSearch != null &&
                        <AdaptableWizard Steps={
                            [
                                <AdvancedSearchExpressionWizard
                                    ColumnList={this.props.Columns}
                                    Blotter={this.props.AdaptableBlotter}
                                    SelectedColumnId={this.state.SelectedColumnId} />,
                                <AdvancedSearchSettingsWizard
                                    Columns={this.props.Columns}
                                    Blotter={this.props.AdaptableBlotter} />
                            ]}
                            Data={this.state.NewAdvancedSearch}
                            StepStartIndex={0}
                            onHide={() => this.onCloseWizard()}
                            onFinish={() => this.onFinishWizard()} >
                        </AdaptableWizard>}

                </Panel>
            </div>
        );
    }

    onNewAdvancedSearch() {
        let _newAdvancedSearch: IAdvancedSearch = {
            AdvancedSearchName: "",
            Expression: ExpressionHelper.CreateEmptyExpression()
        }
        this.setState({ NewAdvancedSearch: _newAdvancedSearch, SelectedColumnId: "select" } as AdvancedSearchActionInternalState)
    }

    DeleteColumnValue(columnId: string, value: any) {
        let columnValues = this.state.SelectedAdvancedSearch.Expression.ColumnValuesExpression.find(x => x.ColumnName == columnId)
        let index = columnValues.Values.indexOf(value)
        columnValues.Values.splice(index, 1)
        if (columnValues.Values.length == 0) {
            let columnValuesIndex = this.state.SelectedAdvancedSearch.Expression.ColumnValuesExpression.findIndex(x => x.ColumnName == columnId)
            this.state.SelectedAdvancedSearch.Expression.ColumnValuesExpression.splice(columnValuesIndex, 1)
        }
       this.onDeleteItem();
    }

    DeleteRange(columnId: string, index: number) {
        let columnRanges = this.state.SelectedAdvancedSearch.Expression.RangeExpression.find(x => x.ColumnName == columnId)
        columnRanges.Ranges.splice(index, 1)
        if (columnRanges.Ranges.length == 0) {
            let columnRangesIndex = this.state.SelectedAdvancedSearch.Expression.RangeExpression.findIndex(x => x.ColumnName == columnId)
            this.state.SelectedAdvancedSearch.Expression.RangeExpression.splice(columnRangesIndex, 1)
        }
        this.onDeleteItem();
    }

    onDeleteItem():void{
     this.IsDeleting = true;
          this.setState({ NewAdvancedSearch: null } as AdvancedSearchActionInternalState)
       this.props.onAddAdvancedSearch(this.state.SelectedAdvancedSearch); 

    }

    onSelectedColumnChange(columnName: string) {
        // not sure we can do anything here?  
        // perhaps we can change the ExpressionBuilder to take a columnID as a prop variable and then it can update state with it?
        if (!this.IsDeleting) {
            this.setState({ SelectedColumnId: columnName, NewAdvancedSearch: this.state.SelectedAdvancedSearch } as AdvancedSearchActionInternalState)
        }
    }

    onEditAdvancedSearch() {
        this.setState({ NewAdvancedSearch: this.state.SelectedAdvancedSearch } as AdvancedSearchActionInternalState)
    }

    onCloseWizard() {
        this.setState({ NewAdvancedSearch: null } as AdvancedSearchActionInternalState)
    }

    onFinishWizard() {
        let completedSearch: IAdvancedSearch = Helper.cloneObject(this.state.NewAdvancedSearch);
        this.props.onAddAdvancedSearch(completedSearch);
        this.setState({ SelectedAdvancedSearch: completedSearch } as AdvancedSearchActionInternalState)
    }

    onSelectedSearchChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        let selectedAdvancedSearch: IAdvancedSearch = this.props.AdvancedSearches.find(a => a.AdvancedSearchName == e.value);
        this.setState({ NewAdvancedSearch: null, SelectedAdvancedSearch: selectedAdvancedSearch, SelectedColumnId: "" });
    }

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        AdaptableBlotter: ownProps.AdaptableBlotter,
        AdvancedSearches: state.AdvancedSearch.AdvancedSearches,
        Columns: state.Grid.Columns
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddAdvancedSearch: (advancedSearch: IAdvancedSearch) => dispatch(AdvancedSearchRedux.AdvancedSearchAdd(advancedSearch)),
    };
}

export let AdvancedSearchAction = connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchActionComponent);

var divStyle = {
    overflowY: 'auto',
    maxHeight: '400px',
    margin: '10px'
};

var headerStyle: React.CSSProperties = {
    wordWrap: 'break-word',
    fontWeight: 'bolder',
    fontSize: '16px'
};

var inputStyle: React.CSSProperties = {
    wordWrap: 'break-word',
    fontWeight: 'normal',
    textAlign: 'left',
};

let panelStyle = {
    width: '800px'
}
