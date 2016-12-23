import { ICustomSort } from '../../Core/Interface/ICustomSortStrategy';
/// <reference path="../../../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Button, Form, Col, Panel, ListGroup, Row, Well } from 'react-bootstrap';

import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as CustomSortRedux from '../../Redux/ActionsReducers/CustomSortRedux'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizard } from './../Wizard/AdaptableWizard'
import { CustomSortConfigItem } from './CustomSortConfigItem'
import { CustomSortConfigHeader } from './CustomSortConfigItem'
import { CustomSortColumnWizard } from './CustomSortColumnWizard'
import { CustomSortValuesWizard } from './CustomSortValuesWizard'
import { PanelWithButton } from '../PanelWithButton';


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
                onEdit={(customSort) => this.onEditCustomSort(customSort)}
                onDelete={(customSort) => this.props.onDeleteCustomSort(customSort)}
                ColumnLabel={column.ColumnFriendlyName}></CustomSortConfigItem>
        });

        return <PanelWithButton headerText="Custom Sorts"
            buttonClick={() => this.CreateCustomSort()}
            buttonContent="Create Custom Sort" bsStyle="primary">
            {this.props.CustomSorts.length == 0 ?
                <Well bsSize="small">Click 'Create Custom Sort' to create a new bespoke sort order for a column of your choosing.</Well>
                : <CustomSortConfigHeader />
            }

            <ListGroup style={divStyle}>
                {customSorts}
            </ListGroup>
            {this.state.isEditing ?
                <AdaptableWizard Steps={[<CustomSortColumnWizard Columns={this.props.Columns.filter(x => !this.props.CustomSorts.find(y => y.ColumnId == x.ColumnId))} />,
                <CustomSortValuesWizard Blotter={this.props.AdaptableBlotter} Columns={this.props.Columns} />]}
                    Data={this._editedCustomSort}
                    StepStartIndex={this.state.WizardStartIndex}
                    onHide={() => this.closeWizard()}
                    onFinish={() => this.WizardFinish()} ></AdaptableWizard> : null}
        </PanelWithButton>
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

let divStyle = {
    'overflowY': 'auto',
    'maxHeight': '300px'
}