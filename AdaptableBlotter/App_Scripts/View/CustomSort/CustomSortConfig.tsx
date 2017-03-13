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
import { Helper } from '../../Core/Helper';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { AdaptableWizard } from './../Wizard/AdaptableWizard'
import { CustomSortConfigItem } from './CustomSortConfigItem'
import { CustomSortColumnWizard } from './CustomSortColumnWizard'
import { CustomSortValuesWizard } from './CustomSortValuesWizard'
import { PanelWithButton } from '../PanelWithButton';
import { PanelWithRow } from '../PanelWithRow';
import { ButtonNew } from '../Components/Buttons/ButtonNew';

interface CustomSortConfigProps extends IStrategyViewPopupProps<CustomSortConfigComponent> {
    onAddCustomSort: (customSort: ICustomSort) => CustomSortRedux.CustomSortAddAction
    onEditCustomSort: (customSort: ICustomSort) => CustomSortRedux.CustomSortEditAction
    CustomSorts: Array<ICustomSort>
    Columns: Array<IColumn>
}

interface CustomSortConfigInternalState {
    EditedCustomSort: ICustomSort
    WizardStartIndex: number
}

class CustomSortConfigComponent extends React.Component<CustomSortConfigProps, CustomSortConfigInternalState> {
    constructor() {
        super();
        this.state = { EditedCustomSort: null, WizardStartIndex: 0 }

    }
    render() {
        let customSorts = this.props.CustomSorts.map((customSort: ICustomSort) => {
            let column = this.props.Columns.find(x => x.ColumnId == customSort.ColumnId);
            if (column == null) return;
            return <CustomSortConfigItem CustomSort={customSort} key={customSort.ColumnId}
                onEdit={(customSort) => this.onEditCustomSort(customSort)}
                onDeleteConfirm={CustomSortRedux.CustomSortDelete(customSort)}
                ColumnLabel={column.FriendlyName}></CustomSortConfigItem>
        });

        let cellInfo: [string, number][] = [["Column", 3], ["Sort Order", 6], ["", 3]];
        let newButton = <ButtonNew onClick={() => this.CreateCustomSort()}
            overrideTooltip="Create Custom Sort"
            DisplayMode="Glyph+Text" />

        return <PanelWithButton headerText="Custom Sort" style={panelStyle}
            button={newButton} bsStyle="primary"  glyphicon={"sort-by-attributes"}>
            {this.props.CustomSorts.length == 0 ?
                <Well bsSize="small">Click 'New' to create a bespoke sort order for a selected column.</Well>
                : <PanelWithRow CellInfo={cellInfo} bsStyle="info" />
            }

            <ListGroup style={divStyle}>
                {customSorts}
            </ListGroup>
            {this.state.EditedCustomSort &&
                <AdaptableWizard Steps={[<CustomSortColumnWizard Columns={this.props.Columns.filter(x => !this.props.CustomSorts.find(y => y.ColumnId == x.ColumnId))} />,
                <CustomSortValuesWizard Columns={this.props.Columns} getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList} />]}
                    Data={this.state.EditedCustomSort}
                    StepStartIndex={this.state.WizardStartIndex}
                    onHide={() => this.closeWizard()}
                    onFinish={() => this.WizardFinish()} ></AdaptableWizard>
            }
        </PanelWithButton>
    }
    private wizardSteps: JSX.Element[]

    closeWizard() {
        this.setState({ EditedCustomSort: null, WizardStartIndex: 0 });
    }
    WizardFinish() {
        if (this.props.CustomSorts.find(x => x.ColumnId == this.state.EditedCustomSort.ColumnId)) {
            this.props.onEditCustomSort(this.state.EditedCustomSort)
        }
        else {
            this.props.onAddCustomSort(this.state.EditedCustomSort)
        }


        this.setState({ EditedCustomSort: null, WizardStartIndex: 0 });
    }

    private onEditCustomSort(customSort: ICustomSort) {
        //so we dont mutate original object
        this.setState({ EditedCustomSort: Helper.cloneObject(customSort), WizardStartIndex: 1 });
    }

    CreateCustomSort() {
        this.setState({ EditedCustomSort: ObjectFactory.CreateEmptyCustomSort(), WizardStartIndex: 0 });
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        CustomSorts: state.CustomSort.CustomSorts,
        Columns: state.Grid.Columns
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddCustomSort: (customSort: ICustomSort) => dispatch(CustomSortRedux.CustomSortAdd(customSort)),
        onEditCustomSort: (customSort: ICustomSort) => dispatch(CustomSortRedux.CustomSortEdit(customSort))
    };
}

export let CustomSortConfig = connect(mapStateToProps, mapDispatchToProps)(CustomSortConfigComponent);

let divStyle = {
    'overflowY': 'auto',
    'maxHeight': '300px'
}

let panelStyle = {
    width: '800px'
}