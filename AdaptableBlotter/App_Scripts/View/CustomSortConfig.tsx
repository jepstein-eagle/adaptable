import {ICustomSort} from '../Core/Interface/ICustomSortStrategy';
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import {ControlLabel, FormGroup, Button, Form, Col, Panel, ListGroup, Row, Modal, MenuItem, SplitButton, ButtonGroup, Jumbotron, ListGroupItem} from 'react-bootstrap';

import {AdaptableBlotterState} from '../Redux/Store/Interface/IAdaptableStore'
import * as CustomSortRedux from '../Redux/ActionsReducers/CustomSortRedux'
import {CustomSortEditor} from './CustomSortEditor'
import {IStrategyViewPopupProps} from '../Core/Interface/IStrategyView'
import {IColumn, IAdaptableBlotter} from '../Core/Interface/IAdaptableBlotter';
import {AdaptableWizard, AdaptableWizardStepProps, AdaptableWizardStep} from './Wizard/AdaptableWizard'
import {DualListBoxEditor} from './DualListBoxEditor'


interface CustomSortConfigProps extends IStrategyViewPopupProps<CustomSortConfigComponent> {
    onAddCustomSort: (customSort: ICustomSort) => CustomSortRedux.CustomSortAddAction
    onDeleteCustomSort: (customSort: ICustomSort) => CustomSortRedux.CustomSortDeleteAction
    onEditCustomSort: (customSort: ICustomSort) => CustomSortRedux.CustomSortEditAction
    CustomSorts: Array<ICustomSort>
    Columns: Array<IColumn>
}

interface CustomSortConfigInternalState {
    isEditing: boolean
    WizardStartIndex: number
}

class CustomSortConfigComponent extends React.Component<CustomSortConfigProps, CustomSortConfigInternalState> {
    constructor() {
        super();
        this.state = { isEditing: false, WizardStartIndex: 0 }

    }
    render() {
        let customSorts = this.props.CustomSorts.map((customSort: ICustomSort) => {
            let column = this.props.Columns.find(x => x.ColumnId == customSort.ColumnId);
            if (column == null) return;
            return <CustomSortConfigItem CustomSort={customSort} key={customSort.ColumnId}
                onEdit={(customSort) => this.onEditCustomSort(customSort) }
                onDelete={(customSort) => this.props.onDeleteCustomSort(customSort) }
                ColumnLabel={column.ColumnFriendlyName}></CustomSortConfigItem>
        });
        let header = <Form horizontal>
            <Row>
                <Col xs={7}>Custom Sorts</Col>
                <Col xs={5}>
                    <Button onClick={() => this.CreateCustomSort() }>
                        Create Custom Sort
                    </Button>
                </Col>
            </Row>
        </Form>;
        return <Panel header={header} bsStyle="primary">
            {this.props.CustomSorts.length == 0 ? <Jumbotron>
                <p>Click 'Add' to create a new bespoke sort for a column of your choosing.</p>
            </Jumbotron> : null}
            <ListGroup>
                {customSorts}
            </ListGroup>
            {this.state.isEditing ?
                <AdaptableWizard Steps={[<CustomSortColumnWizard Columns={this.props.Columns.filter(x => !this.props.CustomSorts.find(y => y.ColumnId == x.ColumnId)) } />,
                    <CustomSortValuesWizard Blotter={this.props.AdaptableBlotter} />]}
                    Data={this._editedCustomSort}
                    StepStartIndex={this.state.WizardStartIndex}
                    onHide={() => this.closeWizard() }
                    onFinish={() => this.WizardFinish() } ></AdaptableWizard> : null}
        </Panel>
    }
    private _columnValues: any[];
    private _editedCustomSort: ICustomSort;
    private wizardSteps: JSX.Element[]

    closeWizard() {
        this.setState({ isEditing: false, WizardStartIndex: 0 });
    }
    WizardFinish() {
        if (this.props.CustomSorts.find(x => x.ColumnId == this._editedCustomSort.ColumnId)) {
            this.props.onEditCustomSort(this._editedCustomSort)
        }
        else {
            this.props.onAddCustomSort(this._editedCustomSort)
        }


        this.setState({ isEditing: false, WizardStartIndex: 0 }, () => { this._editedCustomSort = null; this._columnValues = []; });
    }

    private onEditCustomSort(customSort: ICustomSort) {
        this._editedCustomSort = customSort;
        this.setState({ isEditing: true, WizardStartIndex: 1 });
    }

    CreateCustomSort() {
        this._editedCustomSort = { ColumnId: "", CustomSortItems: [] };
        this.setState({ isEditing: true, WizardStartIndex: 0 });
    }

    onCustomSortChange(selectedValues: Array<string>) {
        this._editedCustomSort.CustomSortItems = selectedValues;
        //we don't update store at this time since it will update the sort in the grid and it takes a bit of time as we need to reinint the fucking grid......
    }
}

interface CustomSortConfigItemProps extends React.ClassAttributes<CustomSortConfigItem> {
    CustomSort: ICustomSort
    ColumnLabel: string
    onEdit: (CustomSort: ICustomSort) => void;
    onDelete: (CustomSort: ICustomSort) => void;
}

class CustomSortConfigItem extends React.Component<CustomSortConfigItemProps, {}> {
    render(): any {
        return <li
            className="list-group-item"
            onClick={() => { } }>
            <Row>
                <Col xs={2}>{this.props.ColumnLabel}</Col>
                <Col xs={6} style={divStyle}>
                    {this.props.CustomSort.CustomSortItems.join() }
                </Col>
                <Col xs={4}>
                    <ButtonGroup>
                        <Button onClick={() => this.props.onEdit(this.props.CustomSort) }>Edit</Button>
                        <Button onClick={() => this.props.onDelete(this.props.CustomSort) }>Delete</Button>
                    </ButtonGroup>
                </Col>
            </Row>
        </li>
    }
}

interface CustomSortColumnWizardProps extends AdaptableWizardStepProps<ICustomSort> {
    Columns: Array<IColumn>

}
interface CustomSortColumnWizardState {
    SelectedColumn: IColumn
}

class CustomSortColumnWizard extends React.Component<CustomSortColumnWizardProps, CustomSortColumnWizardState> implements AdaptableWizardStep {
    constructor(props: CustomSortColumnWizardProps) {
        super(props);
        if (this.props.Data.ColumnId != "") {
            this.state = { SelectedColumn: this.props.Columns.find(x => x.ColumnId == this.props.Data.ColumnId) }
        }
        else {
            this.state = { SelectedColumn: null }
        }
    }
    render(): any {
        var columnsItems = this.props.Columns.map((Column: IColumn) => {
            return <ListGroupItem key={Column.ColumnId}
                onClick={() => this.onClickColum(Column) }
                active={this.state.SelectedColumn == null ? false : Column.ColumnId == this.state.SelectedColumn.ColumnId}>{Column.ColumnFriendlyName}</ListGroupItem>
        })
        return <ListGroup>
            {columnsItems}
        </ListGroup>
    }
    onClickColum(column: IColumn) {
        this.setState({ SelectedColumn: column })

    }
    public canNext(): boolean { return true; }
    public canBack(): boolean { return true; }
    public Next(): void { this.props.Data.ColumnId = this.state.SelectedColumn.ColumnId }
    public Back(): void { }
    public StepName = "Column Select"
}

interface CustomSortValuesWizardProps extends AdaptableWizardStepProps<ICustomSort> {
    Blotter: IAdaptableBlotter

}
interface CustomSortValuesWizardState {
    ColumnValues: any[]
}

class CustomSortValuesWizard extends React.Component<CustomSortValuesWizardProps, CustomSortValuesWizardState> implements AdaptableWizardStep {
    private internalSelectedValues: Array<string>
    constructor(props: CustomSortValuesWizardProps) {
        super(props)
        this.state = { ColumnValues: Array.from(new Set(this.props.Blotter.getColumnValueString(this.props.Data.ColumnId))) }
    }
    render(): any {
        return <DualListBoxEditor AvailableValues={this.state.ColumnValues}
            SelectedValues={this.props.Data.CustomSortItems}
            HeaderAvailable="Column Values"
            HeaderSelected="Custom Sort Values"
            onChange={(SelectedValues) => this.OnSelectedValuesChange(SelectedValues) }></DualListBoxEditor>
    }
    OnSelectedValuesChange(SelectedValues: Array<string>) {
        this.internalSelectedValues = SelectedValues;
    }

    public canNext(): boolean { return true; }
    public canBack(): boolean { return true; }
    public Next(): void { this.props.Data.CustomSortItems = this.internalSelectedValues }
    public Back(): void { }
    public StepName = "Column Select"
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        CustomSorts: state.CustomSort.CustomSorts,
        AdaptableBlotter: ownProps.AdaptableBlotter,
        Columns: state.Grid.Columns
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddCustomSort: (customSort: ICustomSort) => dispatch(CustomSortRedux.AddCustomSort(customSort)),
        onDeleteCustomSort: (customSort: ICustomSort) => dispatch(CustomSortRedux.DeleteCustomSort(customSort)),
        onEditCustomSort: (customSort: ICustomSort) => dispatch(CustomSortRedux.EditCustomSort(customSort))
    };
}

export let CustomSortConfig = connect(mapStateToProps, mapDispatchToProps)(CustomSortConfigComponent);

var divStyle = {
    wordWrap: 'break-word'
};