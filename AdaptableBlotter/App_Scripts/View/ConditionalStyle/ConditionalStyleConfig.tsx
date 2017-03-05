/// <reference path="../../../typings/index.d.ts" />
import { IConditionalStyleCondition } from '../../Core/Interface/IConditionalStyleStrategy';
import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as ConditionalStyleRedux from '../../Redux/ActionsReducers/ConditionalStyleRedux'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Button, Form, Col, Panel, Row, Well } from 'react-bootstrap';
import { ConditionalStyleScope } from '../../Core/Enums'
import { ConditionalStyleConfigItem } from './ConditionalStyleConfigItem'
import { AdaptableWizard } from './..//Wizard/AdaptableWizard'
import { ConditionalStyleSettingsWizard } from './ConditionalStyleSettingsWizard'
import { ConditionalStyleColumnWizard } from './ConditionalStyleColumnWizard'
import { ConditionalStyleExpressionWizard } from './ConditionalStyleExpressionWizard'
import { Helper } from '../../Core/Helper';
import { PanelWithButton } from '../PanelWithButton';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { PanelWithRow } from '../PanelWithRow';
import { IUserFilter } from '../../Core/Interface/IExpression'

interface ConditionalStyleConfigProps extends IStrategyViewPopupProps<ConditionalStyleConfigComponent> {
    ConditionalStyleConditions: Array<IConditionalStyleCondition>,
    Columns: IColumn[],
    UserFilters: IUserFilter[],
    onAddEditConditionalStyle: (condiditionalStyleCondition: IConditionalStyleCondition) => ConditionalStyleRedux.ConditionalStyleAddUpdateAction
    onChangeColumnConditionalStyle: (condiditionalStyleCondition: IConditionalStyleCondition, newColumnId: string) => ConditionalStyleRedux.ConditionalStyleEditColumnAction
    onChangeColourConditionalStyle: (condiditionalStyleCondition: IConditionalStyleCondition, backColor: string, foreColor: string) => ConditionalStyleRedux.ConditionalStyleEditColourAction
}

interface ConditionalStyleConfigState {
    EditedConditionalStyleCondition: IConditionalStyleCondition
}

class ConditionalStyleConfigComponent extends React.Component<ConditionalStyleConfigProps, ConditionalStyleConfigState> {

    constructor() {
        super();
        this.state = { EditedConditionalStyleCondition: null }
    }

    render() {

        let cellInfo: [string, number][] = [["Where Applied", 3], ["Back Colour", 2], ["Fore Colour", 2], ["Description", 3], ["", 3]];

        let conditionalStyleConditions = this.props.ConditionalStyleConditions.map((conditionalStyleCondition: IConditionalStyleCondition) => {
            return <ConditionalStyleConfigItem
                ConditionalStyleCondition={conditionalStyleCondition}
                key={conditionalStyleCondition.Uid}
                UserFilters={this.props.UserFilters}
                Columns={this.props.Columns}
                onEdit={(conditionalStyleCondition) => this.onEdit(conditionalStyleCondition)}
                onChangeColumn={(conditionalStyleCondition, newColumnId) => this.props.onChangeColumnConditionalStyle(conditionalStyleCondition, newColumnId)}
                onChangeColour={(conditionalStyleCondition, backColor, foreColor) => this.props.onChangeColourConditionalStyle(conditionalStyleCondition, backColor, foreColor)}
                onDeleteConfirm={ConditionalStyleRedux.ConditionalStyleDelete(conditionalStyleCondition)} >
            </ConditionalStyleConfigItem>
        });

        return <PanelWithButton headerText="Conditional Style"
            buttonContent={"Create Conditional Style"}
            buttonClick={() => this.onAdd()}
            bsStyle="primary" style={panelStyle} glyphicon={"tint"}>

            {this.props.ConditionalStyleConditions.length == 0 ?
                <Well bsSize="small">Click 'Create Conditional Style' to create a new conditional style to be applied at row or column level.</Well>
                : <PanelWithRow CellInfo={cellInfo} bsStyle="info" />
            }

            <ListGroup style={divStyle}>
                {conditionalStyleConditions}
            </ListGroup>

            {this.state.EditedConditionalStyleCondition != null &&
                <AdaptableWizard Steps={
                    [
                        <ConditionalStyleColumnWizard Columns={this.props.Columns} />,
                        <ConditionalStyleSettingsWizard />,
                        <ConditionalStyleExpressionWizard
                            ColumnList={this.props.Columns}
                            UserFilters={this.props.UserFilters}
                            SelectedColumnId={null}
                            getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList} />
                    ]}
                    Data={this.state.EditedConditionalStyleCondition}
                    StepStartIndex={0}
                    onHide={() => this.closeWizard()}
                    onFinish={() => this.WizardFinish()} ></AdaptableWizard>}

        </PanelWithButton>
    }

    onAdd() {
        let _editedConditionalStyle: IConditionalStyleCondition = ObjectFactory.CreateEmptyConditionalStyle();
        this.setState({ EditedConditionalStyleCondition: _editedConditionalStyle });
    }

    onEdit(condition: IConditionalStyleCondition) {
        let clonedObject: IConditionalStyleCondition = Helper.cloneObject(condition);
        this.setState({ EditedConditionalStyleCondition: clonedObject });
    }

    closeWizard() {
        this.setState({ EditedConditionalStyleCondition: null });
    }

    WizardFinish() {
        this.props.onAddEditConditionalStyle(this.state.EditedConditionalStyleCondition);
        this.setState({ EditedConditionalStyleCondition: null });
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        ConditionalStyleConditions: state.ConditionalStyle.ConditionalStyleConditions,
        Columns: state.Grid.Columns,
        UserFilters: state.UserFilter.UserFilters
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddEditConditionalStyle: (conditionalStyleCondition: IConditionalStyleCondition) => dispatch(ConditionalStyleRedux.ConditionalStyleAddUpdate(conditionalStyleCondition)),
        onChangeColumnConditionalStyle: (condiditionalStyleCondition: IConditionalStyleCondition, newColumnId: string) => dispatch(ConditionalStyleRedux.ConditionalStyleEditColumn(condiditionalStyleCondition, newColumnId)),
        onChangeColourConditionalStyle: (condiditionalStyleCondition: IConditionalStyleCondition, backColor: string, foreColor: string) => dispatch(ConditionalStyleRedux.ConditionalStyleEditColour(condiditionalStyleCondition, backColor, foreColor)),
    };
}

export let ConditionalStyleConfig = connect(mapStateToProps, mapDispatchToProps)(ConditionalStyleConfigComponent);

let panelStyle = {
    width: '800px'
}

let divStyle = {
    'overflowY': 'auto',
    'maxHeight': '300px'
}